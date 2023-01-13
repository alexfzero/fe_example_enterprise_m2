
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
        v-model="order.order_number"
        label="Номер"
        :error="hasError('order_number')"
        :errorMessages="getError('order_number')"
        class="mb-n2"
    ></v-text-field>
    <v-autocomplete
        class="mt-4"
        v-model="order.provider"
        :items="organizations"
        item-value="value"
        item-text="text"
        label="Поставщик"
        :error="hasError('provider')"
        :errorMessages="getError('provider')"
    ></v-autocomplete>
    <v-autocomplete
        class="mt-4"
        v-model="order.contact_person"
        :items="users"
        item-value="value"
        item-text="text"
        label="Контактное лицо"
        :error="hasError('contact_person')"
        :errorMessages="getError('contact_person')"
    ></v-autocomplete>
    <date-picker
        key="date_arrival"
        v-model="order.date_arrival"
        label="Дата поставки"
        :description="'День рождения'"
    >
    </date-picker>
    <v-text-field
        v-model="order.quantity"
        label="Кол-во"
        :error="hasError('quantity')"
        :errorMessages="getError('quantity')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="order.price"
        label="Цена"
        :error="hasError('price')"
        :errorMessages="getError('price')"
        class="mb-n2"
    ></v-text-field>
    <v-autocomplete
        class="mt-4"
        v-model="order.contract_number"
        :items="contracts"
        item-value="value"
        item-text="text"
        label="Номер контракта"
        :error="hasError('contract_number')"
        :errorMessages="getError('contract_number')"
    ></v-autocomplete>
    <v-autocomplete
        class="mt-4"
        v-model="order.purchase_manager"
        :items="users"
        item-value="value"
        item-text="text"
        label="Менеджер"
        :error="hasError('purchase_manager')"
        :errorMessages="getError('purchase_manager')"
    ></v-autocomplete>
    <v-text-field
        v-model="order.vat"
        label="НДС(%)"
        :error="hasError('vat')"
        :errorMessages="getError('vat')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="order.summary"
        label="Сумма"
        :error="hasError('summary')"
        :errorMessages="getError('summary')"
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
import DatePicker from "@/modules/core/components/DatePicker.vue";

export default {
  name: "OrderEditForm",
  components: {DatePicker, ScrollCenterDialog},
  mixins: [FormErrorsMixin],
  props: {
    opened: Boolean,
    edit: Boolean,
    orderData: Object,
  },
  data() {
    return {
      URL_USR: selectors.API + selectors.CONTACTS.USER,
      URL_ORG: selectors.API + selectors.CONTACTS.ORGANIZATIONS,
      URL_CTR: selectors.API + selectors.REFERENCES.CONTRACTS,
      URL_ORD: models.API + roles.SUPER_ADMIN + models.ORDERS.NAME + models.ORDERS.PATH.ORDERS,
      loading: false,
      order: {
        order_number: undefined,
        provider: undefined,
        contact_person: undefined,
        date_arrival: undefined,
        quantity: undefined,
        price: undefined,
        contract_number: undefined,
        purchase_manager: undefined,
        vat: undefined,
        summary:  undefined,
      },
      users: undefined,
      organizations: undefined,
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
      for (let key in this.order) {
        data[key] = this.order[key]
      }

      if (this.edit) {
        let id = this.orderData.id
        this.changeOrder(data, id)
      } else {
        this.createOrder(data)
      }
    },
    getUsers() {
      makeGetRequest(this.URL_USR)
          .then(resp => resp.json())
          .then(data => {
            this.users = data
          })
    },
    getOrganizations() {
      makeGetRequest(this.URL_ORG)
          .then(resp => resp.json())
          .then(data => {
            this.organizations = data
          })
    },
    getContracts() {
      makeGetRequest(this.URL_CTR)
          .then(resp => resp.json())
          .then(data => {
            this.contracts = data
          })
    },
    createOrder(data) {
      makePostRequest(this.URL_ORD, data)
      setTimeout(() => {
        this.save_loading = false
        this.$emit('close', this.order)
      }, 800)
    },
    changeOrder(data, id) {
      let url_id = id + '/'
      makeUpdateRequest(this.URL_ORD + url_id, data)
      setTimeout(() => {
        this.save_loading = false
        this.$emit('close', this.order)
      }, 800)
    },
    load_edit_item() {
      if (this.orderData) {
        for (let key in this.orderData) {
          if (key in this.order) {
            if (typeof this.orderData[key] === "object") {
              this.order[key] = this.orderData[key].value
              continue
            }
            this.order[key] = this.orderData[key]
          }
        }
      }
    },
  },

  created() {
    this.getUsers()
    this.getOrganizations()
    this.getContracts()
    this.load_edit_item()
  },
  computed: {
    form_title() {
      return this.edit === false ? 'Добавить заказ' : 'Редактировать заказ'
    },
  }
}
</script>

<style scoped>

</style>