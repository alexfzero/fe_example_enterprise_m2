<template>
  <scroll-center-dialog
      v-model="
      /* eslint-disable-next-line vue/no-mutating-props */
      opened"
      :loading="save_loading"
      width="500"
      @close="close"
      @apply="save"
      :title="form_title"
      :scrolled="false"
  >
    <v-text-field
        v-model="position"
        label="Должность"
        :error="hasError('position')"
        :errorMessages="getError('position')"
        class="mb-n2"
    ></v-text-field>
    <v-autocomplete
        v-model="dep_field"
        :items="departments"
        item-value="value"
        item-text="text"
        label="Департамент"
        :error="hasError('dep_field')"
        :errorMessages="getError('dep_field')"
    ></v-autocomplete>
    <v-checkbox
        v-model="is_head"
        :label="`Начальник: ${is_head.toString()}`"
    ></v-checkbox>
  </scroll-center-dialog>
</template>

<script>
import FormErrorsMixin from "@/mixins/FormErrorsMixin"
import {makeGetRequest, makePostRequest, makeUpdateRequest} from "@/helper";
import models from "@/urls/models";
import roles from "@/urls/roles";
import selectors from "@/urls/selectors";
import ScrollCenterDialog from "@/modules/templates/ScrollCenterDialog.vue";

export default {
  name: "PosEditForm",
  components: {ScrollCenterDialog},
  mixins: [FormErrorsMixin],
  props: {
    opened: Boolean,
    edit: Boolean,
    userData: Object,
  },
  data() {
    return {
      default_data: {
        position: undefined,
        dep_field: undefined,
        is_head: false
      },
      URL_DEP: selectors.API + selectors.TEMPS.DEPARTMENTS,
      URL_POS: models.API + roles.SUPER_ADMIN + models.TEMPS.NAME + models.TEMPS.PATH.POSITIONS,
      loading: false,
      is_head: false,
      position: undefined,
      departments: undefined,
      dep_field: undefined,
      save_loading: false,
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    save() {
      let data = {
        name: this.position,
        department: this.dep_field,
        is_head: this.is_head
      }

      if (this.edit) {
        let id = this.userData.id
        data.department = data.department.value
        this.changePos(data, id)
      } else {
        this.createPos(data)
      }
    },
    getDepartments() {
      makeGetRequest(this.URL_DEP)
          .then(resp => resp.json())
          .then(data => {
            this.departments = data
          })
    },
    createPos(data) {
      makePostRequest(this.URL_POS, data)
      setTimeout(()=>{
        this.save_loading = false
        this.$emit('close', this.position)
      }, 300)
    },
    changePos(data, id) {
      let url_id = id + '/'
      makeUpdateRequest(this.URL_POS + url_id, data)
      setTimeout(()=>{
        this.save_loading = false
        this.$emit('close', this.position)
      }, 300)
    },
    load_edit_item() {
      if (this.userData) {
        this.position = this.userData.name
        this.dep_field = this.userData.department
        // this.dep_field = {value: this.posData.department.value, text: this.posData.department.text}
        this.is_head = this.userData.is_head
      }
    },
  },

  created() {
    this.getDepartments()
    this.load_edit_item()
  },
  computed: {
    form_title() {
      return this.edit === false ? 'Добавить должность' : 'Редактировать должность'
    }
    ,
  }
}
</script>

<style scoped>

</style>