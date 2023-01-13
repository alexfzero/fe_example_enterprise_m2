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
        v-model="str_oper.number_operation"
        label="Номер"
        :error="hasError('number_operation')"
        :errorMessages="getError('number_operation')"
        class="mb-n2"
    ></v-text-field>
    <v-autocomplete
        class="mt-4"
        v-model="str_oper.order"
        :items="orders"
        item-value="value"
        item-text="text"
        label="Заказ"
        :error="hasError('order')"
        :errorMessages="getError('order')"
    ></v-autocomplete>
    <v-autocomplete
        class="mt-4"
        v-model="str_oper.product"
        :items="products"
        item-value="value"
        item-text="text"
        label="Товар"
        :error="hasError('product')"
        :errorMessages="getError('product')"
    ></v-autocomplete>
    <v-autocomplete
        class="mt-4"
        v-model="str_oper.operation_type"
        :items="types"
        item-value="value"
        item-text="text"
        label="Тип операции"
        :error="hasError('operation_type')"
        :errorMessages="getError('operation_type')"
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
  name: "OperationEditForm",
  components: {ScrollCenterDialog},
  mixins: [FormErrorsMixin],
  props: {
    opened: Boolean,
    edit: Boolean,
    operData: Object,
  },
  data() {
    return {
      URL_ORD: selectors.API + selectors.ORDERS.ORDERS,
      URL_STR: selectors.API + selectors.REFERENCES.STORAGES,
      URL_TYPE: selectors.API + selectors.TEMPS.OPERATIONS,
      URL_OPER: models.API + roles.SUPER_ADMIN + models.REFERENCES.NAME + models.REFERENCES.PATH.OPERATIONS,
      loading: false,
      str_oper: {
        number_operation: undefined,
        order: undefined,
        product: undefined,
        operation_type: undefined,
      },
      orders: undefined,
      products: undefined,
      types: undefined,
      save_loading:false,
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    save() {
      let data = {}
      for (let key in this.str_oper) {
        data[key] = this.str_oper[key]
      }

      if (this.edit) {
        let id = this.operData.id
        this.changeStrOper(data, id)
      } else {
        this.createStrOper(data)
      }
    },
    getOrders() {
      makeGetRequest(this.URL_ORD)
          .then(resp => resp.json())
          .then(data => {
            this.orders = data
          })
    },
    getProducts() {
      makeGetRequest(this.URL_STR)
          .then(resp => resp.json())
          .then(data => {
            this.products = data
          })
    },
    getTypes() {
      makeGetRequest(this.URL_TYPE)
          .then(resp => resp.json())
          .then(data => {
            this.types = data
          })
    },
    createStrOper(data) {
      makePostRequest(this.URL_OPER, data)
      setTimeout(() => {
        this.save_loading = false
        this.$emit('close', this.str_oper)
      }, 800)
    },
    changeStrOper(data, id) {
      let url_id = id + '/'
      makeUpdateRequest(this.URL_OPER + url_id, data)
      setTimeout(() => {
        this.save_loading = false
        this.$emit('close', this.str_oper)
      }, 800)
    },
    load_edit_item() {
      if (this.operData) {
        for (let key in this.operData) {
          if (key in this.str_oper) {
            if (typeof this.operData[key] === "object") {
              this.str_oper[key] = this.operData[key].value
              continue
            }
            this.str_oper[key] = this.operData[key]
          }
        }
      }
    },
  },

  created() {
    this.getOrders()
    this.getProducts()
    this.getTypes()
    this.load_edit_item()
  },
  computed: {
    form_title() {
      return this.edit === false ? 'Добавить операцию' : 'Редактировать операцию'
    },
  }
}
</script>

<style scoped>

</style>