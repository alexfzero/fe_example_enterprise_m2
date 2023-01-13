<template>
  <div>
    <PageHeader :title="title"></PageHeader>
    <v-container class="d-flex flex-column justify-center align-center">
      <v-toolbar
          class="removeBtnPaddingRight"
          color="#DADADA"
          dense
          flat
          :width="width"
      >
        <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp" class="pa-2">
          <v-btn
              color="primary"

              @click="newOrder"
          >
            Добавить
          </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp" class="pa-2">
          <v-btn
              @click="updateData"
          >
            Обновить
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-data-table
          :headers="headers"
          :items="items"
          :loading="loadingPage"
          no-data-text="Нет данных"
          class="elevation-1"
          :style="`width:` + width"
          :options.sync="options"
          :server-items-length="count"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                  class="mr-2"
                  @click="editOrder(item)"
                  v-bind="attrs"
                  v-on="on"
              >
                edit
              </v-icon>
            </template>
            <span>Редактировать заказ</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                  @click="deleteOrder(item)"
                  v-bind="attrs"
                  v-on="on"
                  class="mr-2"
              >
                delete
              </v-icon>
            </template>
            <span>Удалить заказ</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <OrderEditForm
          v-if="dialog_add_edit"
          :opened="dialog_add_edit"
          :edit="edit_status"
          :order-data="order_data"
          @close="closeEditDialog"
      ></OrderEditForm>
      <ApplyDialog
          v-if="dialog_delete"
          :opened="dialog_delete"
          :get-text="() => `Вы уверены, что хотите удалить данный заказ ?`"
          @close="closeDeleteDialog"
      ></ApplyDialog>
    </v-container>
  </div>
</template>

<script>
import PageHeader from "@/modules/core/components/PageHeader.vue";
import OrderEditForm from "@/modules/admin/order/OrderEditForm.vue";
import ApplyDialog from "@/modules/admin/order/ApplyDialog.vue";
import urls from "@/urls/models";
import roles from "@/urls/roles";
import {makeGetRequest, makeDeleteRequest} from "@/helper";

export default {
  name: "OrderList",
  components: {
    PageHeader,
    ApplyDialog,
    OrderEditForm
  },
  data() {
    return {
      title: 'Организации',
      count: 0,
      width: '900px',
      options: {},
      URL: urls.API + roles.SUPER_ADMIN + urls.ORDERS.NAME + urls.ORDERS.PATH.ORDERS,
      loadingPage: false,
      attrs: undefined,
      dialog_add_edit: false,
      dialog_delete: false,
      order_data: undefined,
      edit_status: undefined,
      items: undefined,
      headers: [
        {text: 'ID', value: 'id', align: 'start', sortable: false, width: '25px'},
        {text: 'Номер', value: 'order_number', align: 'start', sortable: false},
        {text: 'Поставщик', value: 'provider.text', align: 'start', sortable: false},
        {text: 'Контактное лицо', value: 'contact_person.text', align: 'start', sortable: false},
        {text: 'Дата регистрации', value: 'order_reg_date', align: 'start', sortable: true},
        {text: 'Номер контракта', value: 'contract_number.text', align: 'start', sortable: false},
        {text: 'Менеджер', value: 'purchase_manager.text', align: 'start', sortable: false},
        {text: 'Действия', value: 'actions', align: 'center', sortable: false, width: '100px'},
      ],
    }
  },
  watch: {
    options: {
      handler() {
        this.loadData()
      },
      deep: true,
    },
  },
  methods: {
    newOrder() {
      this.dialog_add_edit = true
      this.edit_status = false
      this.order_data = undefined
    },
    editOrder(item) {
      this.dialog_add_edit = true
      this.edit_status = true
      this.order_data = item
    },
    deleteOrder(item) {
      this.dialog_delete = true
      this.order_data = item
    },
    // eslint-disable-next-line no-unused-vars
    closeEditDialog(event) {
      this.loadData()
      this.dialog_add_edit = false
      this.order_data = undefined
    },
    closeDeleteDialog(event) {
      console.log('event', event)

      if (event) {
        let id_url = this.order_data.id + '/'
        makeDeleteRequest(this.URL + id_url)
      }
      setTimeout(()=>{
        this.loadData()
        this.dialog_delete = false
        this.order_data = undefined
      }, 700)

    },
    updateData() {
      this.loadData()
    },
    loadData(url = undefined) {
      this.items = []
      if (!url) {
        url = new URL(this.URL)
      }
      let params = {}
      if (this.options.page && this.options.itemsPerPage) {
        params.page = this.options.page
        params.size = this.options.itemsPerPage
      } else {
        params.page = "1"
        params.size = "10"
      }
      url.search = new URLSearchParams(params).toString()
      this.loadingPage = true
      makeGetRequest(url)
          .then(resp => resp.json())
          .then(data => {
            this.items = data.results
            this.count = data.count
            this.loadingPage = false
          })

      // if (reload) {
      //   this.updateData()
      // }
    }
  },
  created() {
    // this.loadData()
  }
}
</script>

<style scoped>

</style>