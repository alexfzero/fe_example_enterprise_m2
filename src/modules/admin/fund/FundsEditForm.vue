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
        v-model="flow_fund.number"
        label="Номер"
        :error="hasError('number')"
        :errorMessages="getError('number')"
        class="mb-n2"
    ></v-text-field>
    <v-autocomplete
        class="mt-4"
        v-model="flow_fund.contract"
        :items="contracts"
        item-value="value"
        item-text="text"
        label="Контракт"
        :error="hasError('contract')"
        :errorMessages="getError('contract')"
    ></v-autocomplete>
    <v-text-field
        v-model="flow_fund.name"
        label="Наименование"
        :error="hasError('name')"
        :errorMessages="getError('name')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="flow_fund.currency"
        label="Валюта"
        :error="hasError('currency')"
        :errorMessages="getError('currency')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="flow_fund.value"
        label="Значение"
        :error="hasError('value')"
        :errorMessages="getError('value')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="flow_fund.came_from"
        label="От"
        :error="hasError('came_from')"
        :errorMessages="getError('came_from')"
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
  name: "FundsEditForm",
  components: {ScrollCenterDialog},
  mixins: [FormErrorsMixin],
  props: {
    opened: Boolean,
    edit: Boolean,
    flowData: Object,
  },
  data() {
    return {
      URL_CONT: selectors.API + selectors.REFERENCES.CONTRACTS,
      URL_FUND: models.API + roles.SUPER_ADMIN + models.REFERENCES.NAME + models.REFERENCES.PATH.FUNDS,
      loading: false,
      flow_fund: {
        number: undefined,
        contract: undefined,
        name: undefined,
        currency: undefined,
        value: undefined,
        came_from: undefined,
      },
      contracts: undefined,
      save_loading:false,
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    save() {
      let data = {}
      for (let key in this.flow_fund) {
        data[key] = this.flow_fund[key]
      }

      if (this.edit) {
        let id = this.flowData.id
        this.changeFund(data, id)
      } else {
        this.createFund(data)
      }
    },
    getContracts() {
      makeGetRequest(this.URL_CONT)
          .then(resp => resp.json())
          .then(data => {
            this.contracts = data
          })
    },
    createFund(data) {
      makePostRequest(this.URL_FUND, data)
      setTimeout(() => {
        this.save_loading = false
        this.$emit('close', this.flow_fund)
      }, 800)
    },
    changeFund(data, id) {
      let url_id = id + '/'
      makeUpdateRequest(this.URL_FUND + url_id, data)
      setTimeout(() => {
        this.save_loading = false
        this.$emit('close', this.flow_fund)
      }, 800)
    },
    load_edit_item() {
      if (this.flowData) {
        for (let key in this.flowData) {
          if (key in this.flow_fund)
            if (typeof this.flowData[key] === "object") {
              this.flow_fund[key] = this.flowData[key].value
              continue
            }
            this.flow_fund[key] = this.flowData[key]
        }
      }
    },
  },

  created() {
    this.getContracts()
    this.load_edit_item()
  },
  computed: {
    form_title() {
      return this.edit === false ? 'Добавить движение средств' : 'Редактировать движение средств'
    },
  }
}
</script>

<style scoped>

</style>