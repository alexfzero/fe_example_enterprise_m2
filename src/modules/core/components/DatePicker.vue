<template>
  <div>
    <v-menu
        ref="menu_flag"
        v-model="open"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
        :left="windowLeft"
        :right="windowRight"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            v-if="!hideTextField"
            ref="text_value"
            v-model="text_value"
            :rules="getFormatRules()"
            :hint="description || hint"
            :persistent-hint="!!description || !!hint"
            :error="error"
            :error-messages="errorMessages"
            :loading="loading"
            :readonly="readonly || readonlyTextField"
            v-bind="openOnFocus ? attrs: {}"
            v-on="openOnFocus ? on: {}"
            @focus="$emit('focus', $event)"
            :hide-details="hideDetails"
            :placeholder="placeholder"
            :clearable="clearable"
            @click:clear="clear"
        >
          <template v-slot:prepend-inner v-if="!prependOuterIcon">
            <v-icon v-bind="attrs" v-on="on">{{icon}}</v-icon>
          </template>
          <template v-slot:prepend v-else>
            <v-icon v-bind="attrs" v-on="on" >{{icon}}</v-icon>
          </template>
          <template v-slot:label v-if="!disableLabel">
            <slot name="label">
              {{label}} <span v-if="required" class="red--text">*</span>:
            </slot>
          </template>
          <!--          <template v-slot:append v-if="clearable">-->
          <!--            <v-btn icon x-small class="mt-1" @click="clear()">-->
          <!--              <v-icon>close</v-icon>-->
          <!--            </v-btn>-->
          <!--          </template>-->
        </v-text-field>
        <v-btn v-else v-bind="attrs" v-on="on" icon><v-icon>{{icon}}</v-icon></v-btn>
      </template>
      <v-card>
        <v-toolbar height="50" class="h6" color="subprimary">{{label}}</v-toolbar>
        <v-divider></v-divider>
        <v-date-picker
            v-model="inside_value"
            no-title
            scrollable
            :first-day-of-week="1"
            locale="ru-ru"
            @change="open = false"
            :max="getUpperBound()"
            :min="getLowerBound()"
            :readonly="readonly"
        >
          <template v-if='!closeOnContentClick'>
            <v-btn
                :icon="$vuetify.breakpoint.smAndDown"
                :text="$vuetify.breakpoint.mdAndUp"
                color="primary"
                @click="open = false"
            >
              <v-icon>highlight_off</v-icon>
              <span v-if="$vuetify.breakpoint.mdAndUp">Отмена</span>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                :icon="$vuetify.breakpoint.smAndDown"
                :text="$vuetify.breakpoint.mdAndUp"
                color="primary"
                @click="$refs.menu_flag.save(inside_value)"
            >
              <span v-if="$vuetify.breakpoint.mdAndUp">Ок</span>
              <v-icon>check_circle</v-icon>
            </v-btn>
          </template>
        </v-date-picker>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "DatePicker",
  props: {
    'value': {
      required: true
    },
    label: {
      required: false
    },
    disableLabel: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    description: {
      required: false
    },
    hint: {
      required: false
    },
    rules: {
      type: Array,
      required: false,
      default: () => []
    },
    required: {
      required: false,
      default: false,
      type: Boolean
    },
    error: {
      type: Boolean,
      required: false,
      default: false,
    },
    errorMessages: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    openOnFocus: {
      type: Boolean,
      default: false,
    },
    closeOnContentClick: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: 'edit',
    },
    prependOuterIcon:{
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
    hideTextField: {
      type: Boolean,
      default: false,
    },
    windowLeft: {
      type: Boolean,
      default: false,
    },
    windowRight: {
      type: Boolean,
      default: false,
    },
    readonlyTextField: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    dateDynamicValueType: [String, Function],
    dateDynamicUpper: [Number, Function],
    dateDynamicLower: [Number, Function],
    dateStaticUpper: [String, Function],
    dateStaticLower: [String, Function],
  },
  data(){
    return {
      date_regex: /[0-9][0-9].[0-9][0-9].[0-9]{1,4}/,
      format: 'DD.MM.YYYY',
      iso_format: '',
      open: false,
      inside_value: this.value,
      text_value: this.value !== undefined ? this.dateToFormant(this.value) : '',
    }
  },
  watch: {
    value(nV, oV){
      if(nV !== oV)
        this.inside_value = this.value
    },
    inside_value(){
      this.text_value = this.inside_value ? this.dateToFormant(this.inside_value): ''
      this.$emit('input', this.inside_value)
      this.$emit('focus', this.inside_value)
    },
    text_value(){
      this.inside_value = this.dateFromFormat(this.text_value)
      this.$emit('input', this.inside_value)
      this.$emit('focus', this.inside_value)
    },
    open(){
      let value = this.dateFromFormat(this.text_value);
      if (this.open && value !== '') {
        this.inside_value = value;
      } else if (this.open) {
        this.text_value = '';
      }
    }
  },
  computed: {
    date_dynamic_value_type(){
      return this.getFormParameter(this.dateDynamicValueType)
    },
    date_dynamic_upper(){
      return this.getFormParameter(this.dateDynamicUpper)
    },
    date_dynamic_lower(){
      return this.getFormParameter(this.dateDynamicLower)
    },
    date_static_upper(){
      return this.getFormParameter(this.dateStaticUpper)
    },
    date_static_lower(){
      return this.getFormParameter(this.dateStaticLower)
    },
  },
  methods: {
    getFormParameter(parameter){
      if (typeof parameter === 'function')
        return parameter()
      return parameter
    },
    getUpperBound(shift=0) {
      if (this.date_dynamic_value_type) {
        return moment().add(this.date_dynamic_upper + shift, this.date_dynamic_value_type).toISOString();
      } else {
        return this.date_static_upper
      }
    },
    getLowerBound(shift=0) {
      if (this.date_dynamic_value_type) {
        return moment().subtract(this.date_dynamic_lower + shift, this.date_dynamic_value_type).toISOString();
      } else {
        return this.date_static_lower
      }
    },
    dateToFormant(value){
      return moment(value).format('DD.MM.YYYY')
    },
    dateFromFormat(value){
      if (value === undefined || value === null || value === '')
        return ''
      if (this.date_regex.test(value)){
        return moment(value, 'DD.MM.YYYY').format('YYYY-MM-DD')
      }
      return ''
    },
    getFormatRules(){
      let rules = [
        ...this.rules,
        v => (this.date_regex.test(v) || v === '' || v === null) || 'Строка даты не соответсвует формату',
      ]
      if (this.required) {
        rules.push(v => (!!v) || 'Поле обязательно к заполнению')
      }
      if (this.getUpperBound()) {
        rules.push(
            v => (!v || moment(v, 'DD.MM.YYYY').isBefore(this.getUpperBound(0))) || `Дата не может быть позже ${moment(this.getUpperBound(0)).format('DD.MM.YYYY')}`,
            v => (!v || moment(v, 'DD.MM.YYYY').isAfter(this.getLowerBound(0))) || `Дата не может быть раньше ${moment(this.getLowerBound(0)).format('DD.MM.YYYY')}`
        )
      }
      return rules
    },
    validate(show_messages=true) {
      return this.$refs['text_value'].validate(show_messages)
    },
    clear() {
      this.inside_value = null;
      this.text_value = null;
      this.$emit('clear');
    },
  },
  created() {}
}
</script>

<style scoped>

</style>