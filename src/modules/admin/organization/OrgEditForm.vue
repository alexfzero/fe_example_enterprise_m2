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
        v-model="org.full_name"
        label="Полное название"
        :error="hasError('full_name')"
        :errorMessages="getError('full_name')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="org.short_name"
        label="Короктое название"
        :error="hasError('short_name')"
        :errorMessages="getError('short_name')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="org.bank_number"
        label="Номер банка"
        :error="hasError('bank_number')"
        :errorMessages="getError('bank_number')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="org.bank_name"
        label="Название банка"
        :error="hasError('bank_name')"
        :errorMessages="getError('bank_name')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="org.corres_number"
        label="Корреспондентский счет"
        :error="hasError('corres_number')"
        :errorMessages="getError('corres_number')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="org.bic"
        label="БИК"
        :error="hasError('bic')"
        :errorMessages="getError('bic')"
        class="mb-n2"
    ></v-text-field>
    <v-autocomplete
        class="mt-4"
        v-model="org.contact_person"
        :items="users"
        item-value="value"
        item-text="text"
        label="Контактное лицо"
        :error="hasError('contact_person')"
        :errorMessages="getError('contact_person')"
    ></v-autocomplete>
    <v-text-field
        v-model="org.legal_address"
        label="Юр. адрес"
        :error="hasError('legal_address')"
        :errorMessages="getError('legal_address')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="org.mail_address"
        label="Почтовый адрес"
        :error="hasError('mail_address')"
        :errorMessages="getError('mail_address')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="org.inn"
        label="ИНН"
        :error="hasError('inn')"
        :errorMessages="getError('inn')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="org.kpp"
        label="КПП"
        :error="hasError('kpp')"
        :errorMessages="getError('kpp')"
        class="mb-n2"
    ></v-text-field>
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
  name: "OrgEditForm",
  components: {ScrollCenterDialog},
  mixins: [FormErrorsMixin],
  props: {
    opened: Boolean,
    edit: Boolean,
    orgData: Object,
  },
  data() {
    return {
      URL_USR: selectors.API + selectors.CONTACTS.USER,
      URL_ORG: models.API + roles.SUPER_ADMIN + models.CONTACTS.NAME + models.CONTACTS.PATH.ORGANIZATIONS,
      loading: false,
      org: {
        bank_name: undefined,
        bank_number: undefined,
        bic: undefined,
        contact_person: undefined,
        corres_number: undefined,
        full_name: undefined,
        id: undefined,
        inn: undefined,
        kpp: undefined,
        legal_address:  undefined,
        mail_address: undefined,
        short_name: undefined,
      },
      users: undefined,
      save_loading:false,
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    save() {
      let data = {}
      for (let key in this.org) {
        data[key] = this.org[key]
      }

      if (this.edit) {
        let id = this.orgData.id
        this.changeOrg(data, id)
      } else {
        this.createOrg(data)
      }
    },
    getUsers() {
      makeGetRequest(this.URL_USR)
          .then(resp => resp.json())
          .then(data => {
            this.users = data
          })
    },
    createOrg(data) {
      makePostRequest(this.URL_ORG, data)
      setTimeout(() => {
        this.save_loading = false
        this.$emit('close', this.org)
      }, 800)
    },
    changeOrg(data, id) {
      let url_id = id + '/'
      makeUpdateRequest(this.URL_ORG + url_id, data)
      setTimeout(() => {
        this.save_loading = false
        this.$emit('close', this.org)
      }, 800)
    },
    load_edit_item() {
      if (this.orgData) {
        for (let key in this.orgData) {
          if (key in this.org) {
            if (typeof this.orgData[key] === "object") {
              this.org[key] = this.orgData[key].value
              continue
            }
            this.org[key] = this.orgData[key]
          }
        }
      }
    },
  },

  created() {
    this.getUsers()
    this.load_edit_item()
  },
  computed: {
    form_title() {
      return this.edit === false ? 'Добавить организацию' : 'Редактировать организацию'
    },
  }
}
</script>

<style scoped>

</style>