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
        v-model="contract.number"
        label="Номер"
        :error="hasError('number')"
        :errorMessages="getError('number')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="contract.Document"
        label="Название документ"
        :error="hasError('Document')"
        :errorMessages="getError('Document')"
        class="mb-n2"
    ></v-text-field>
    <v-autocomplete
        class="mt-4"
        v-model="contract.client"
        :items="organizations"
        item-value="value"
        item-text="text"
        label="Клиент"
        :error="hasError('client')"
        :errorMessages="getError('client')"
    ></v-autocomplete>
    <v-autocomplete
        class="mt-4"
        v-model="contract.status"
        :items="statuses"
        item-value="value"
        item-text="text"
        label="Статус"
        :error="hasError('status')"
        :errorMessages="getError('status')"
    ></v-autocomplete>
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
  name: "ContractEditForm",
  components: {ScrollCenterDialog},
  mixins: [FormErrorsMixin],
  props: {
    opened: Boolean,
    edit: Boolean,
    ctrData: Object,
  },
  data() {
    return {
      URL_STAT: selectors.API + selectors.TEMPS.STATUSES,
      URL_ORG: selectors.API + selectors.CONTACTS.ORGANIZATIONS,
      URL_CONT: models.API + roles.SUPER_ADMIN + models.REFERENCES.NAME + models.REFERENCES.PATH.CONTRACTS,
      loading: false,
      contract: {
        number: undefined,
        Document: undefined,
        client: undefined,
        status: undefined,
      },
      statuses: undefined,
      organizations: undefined,
      save_loading:false,
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    save() {
      let data = {}
      for (let key in this.contract) {
        data[key] = this.contract[key]
      }

      if (this.edit) {
        let id = this.ctrData.id
        this.changeCtr(data, id)
      } else {
        this.createCtr(data)
      }
    },
    getStatus() {
      makeGetRequest(this.URL_STAT)
          .then(resp => resp.json())
          .then(data => {
            this.statuses = data
          })
    },
    getOrganizations() {
      makeGetRequest(this.URL_ORG)
          .then(resp => resp.json())
          .then(data => {
            this.organizations = data
          })
    },
    createCtr(data) {
      makePostRequest(this.URL_CONT, data)
      setTimeout(() => {
        this.save_loading = false
        this.$emit('close', this.contract)
      }, 800)
    },
    changeCtr(data, id) {
      let url_id = id + '/'
      makeUpdateRequest(this.URL_CONT + url_id, data)
      setTimeout(() => {
        this.save_loading = false
        this.$emit('close', this.contract)
      }, 800)
    },
    load_edit_item() {
      if (this.ctrData) {
        for (let key in this.ctrData) {
          if (key in this.contract)
            if (typeof this.ctrData[key] === "object") {
              this.contract[key] = this.ctrData[key].value
              continue
            }
            this.contract[key] = this.ctrData[key]
        }
      }
    },
  },

  created() {
    this.getStatus()
    this.getOrganizations()
    this.load_edit_item()
  },
  computed: {
    form_title() {
      return this.edit === false ? 'Добавить контракт' : 'Редактировать контракт'
    },
  }
}
</script>

<style scoped>

</style>