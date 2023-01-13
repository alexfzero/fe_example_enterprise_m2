<template>
  <scroll-center-dialog
      v-model="
      /* eslint-disable-next-line vue/no-mutating-props */
      opened"
      :loading="save_loading"
      width="600"
      @close="close"
      @apply="save"
      :title="form_title"
      :scrolled="false"
  >
    <v-text-field
        v-model="user.last_name"
        label="Фамилия"
        :error="hasError('last_name')"
        :errorMessages="getError('last_name')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="user.first_name"
        label="Имя"
        :error="hasError('first_name')"
        :errorMessages="getError('first_name')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="user.middle_name"
        label="Отчество"
        :error="hasError('mid_name')"
        :errorMessages="getError('mid_name')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="user.username"
        label="Логин"
        :error="hasError('username')"
        :errorMessages="getError('username')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-if="!this.edit"
        v-model="user.password"
        label="Пароль"
        :error="hasError('password')"
        :errorMessages="getError('password')"
        class="mb-n2"
    ></v-text-field>
    <v-autocomplete
        v-model="user.sex"
        :items="sex"

        label="Пол"
        :error="hasError('sex')"
        :errorMessages="getError('sex')"
    ></v-autocomplete>
    <date-picker
        key="birthday"
        v-model="user.birthday"
        label="День рождения"
        :description="'День рождения'"
    >
    </date-picker>
    <v-text-field
        v-model="user.number"
        label="Телефон"
        :rules="rules"
        counter="11"
        :error="hasError('number')"
        :errorMessages="getError('number')"
        class="mb-n2 mt-4"
    ></v-text-field>
    <v-autocomplete
        class="mt-4"
        v-model="pos_field"
        :items="positions"
        item-value="value"
        item-text="text"
        label="Должность"
        :error="hasError('pos_field')"
        :errorMessages="getError('pos_field')"
    ></v-autocomplete>
    <v-checkbox
        v-model="is_admin"
        :label="`Админ: ${is_admin.toString()}`"
    ></v-checkbox>
    <v-checkbox
        v-model="is_staff"
        :label="`Сотрудник: ${is_staff.toString()}`"
    ></v-checkbox>
    <v-checkbox
        v-model="is_booker"
        :label="`Бухгалтер: ${is_booker.toString()}`"
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
import DatePicker from "@/modules/core/components/DatePicker.vue";

export default {
  name: "UserEditForm",
  components: {DatePicker, ScrollCenterDialog},
  mixins: [FormErrorsMixin],
  props: {
    opened: Boolean,
    edit: Boolean,
    userData: Object,
  },
  data() {
    return {
      URL_POS: selectors.API + selectors.TEMPS.POSITIONS,
      URL_USR: models.API + roles.SUPER_ADMIN + models.CONTACTS.NAME + models.CONTACTS.PATH.USER,
      loading: false,
      is_admin: false,
      is_staff: false,
      is_booker: false,
      user: {
        birthday: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, 10),
        number: '8',
      },
      rules: [v => v.length <= 11 || 'Max 11 characters'],
      sex: ['М', 'Ж'],
      positions: undefined,
      pos_field: undefined,
      save_loading: false,
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    save() {
      let data = {
        position: this.pos_field,
        is_admin: this.is_admin,
        is_staff: this.is_staff,
        is_booker: this.is_booker,
      }

      for (let key in this.user) {
        data[key] = this.user[key]
      }

      if (this.edit) {
        let id = this.userData.id
        this.changeUser(data, id)
      } else {
        this.createUser(data)
      }
    },
    getPositions() {
      makeGetRequest(this.URL_POS)
          .then(resp => resp.json())
          .then(data => {
            this.positions = data
          })
    },
    createUser(data) {
      makePostRequest(this.URL_USR, data)
      setTimeout(()=>{
        this.save_loading = false
        this.$emit('close', this.user)
      }, 800)
    },
    changeUser(data, id) {
      let url_id = id + '/'
      makeUpdateRequest(this.URL_USR + url_id, data)
      setTimeout(()=>{
        this.save_loading = false
        this.$emit('close', this.user)
      }, 800)
    },
    load_edit_item() {
      if (this.userData) {
        let {birthday, number, sex, username, is_admin, is_staff, is_booker} = this.userData
        let [last_name, first_name, middle_name] = this.userData.fio.split(' ')
        this.pos_field = this.userData.position.value
        this.user.last_name = last_name
        this.user.first_name = first_name
        this.user.middle_name = middle_name
        this.user.birthday = birthday
        this.user.number = number
        if (sex in this.sex) this.user.sex = sex
        else this.user.sex = this.sex[0]
        this.user.username = username
        this.is_admin = is_admin
        this.is_staff = is_staff
        this.is_booker = is_booker
      }
    },
  },

  created() {
    this.getPositions()
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