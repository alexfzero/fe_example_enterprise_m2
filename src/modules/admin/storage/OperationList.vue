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

              @click="newOper"
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
                  @click="editOper(item)"
                  v-bind="attrs"
                  v-on="on"
              >
                edit
              </v-icon>
            </template>
            <span>Редактировать операцию</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                  @click="deleteOper(item)"
                  v-bind="attrs"
                  v-on="on"
                  class="mr-2"
              >
                delete
              </v-icon>
            </template>
            <span>Удалить операцию</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <OperationEditForm
          v-if="dialog_add_edit"
          :opened="dialog_add_edit"
          :edit="edit_status"
          :oper-data="oper_data"
          @close="closeEditDialog"
      ></OperationEditForm>
      <ApplyDialog
          v-if="dialog_delete"
          :opened="dialog_delete"
          :get-text="() => `Вы уверены, что хотите удалить данную операцию ?`"
          @close="closeDeleteDialog"
      ></ApplyDialog>
    </v-container>
  </div>
</template>

<script>
import PageHeader from "@/modules/core/components/PageHeader.vue";
import OperationEditForm from "@/modules/admin/storage/OperationEditForm.vue";
import ApplyDialog from "@/modules/admin/storage/ApplyDialog.vue";
import urls from "@/urls/models";
import roles from "@/urls/roles";
import {makeGetRequest, makeDeleteRequest} from "@/helper";

export default {
  name: "OperationList",
  components: {
    PageHeader,
    ApplyDialog,
    OperationEditForm
  },
  data() {
    return {
      title: 'Операции по складу',
      count: 0,
      width: '900px',
      options: {},
      URL: urls.API + roles.SUPER_ADMIN + urls.REFERENCES.NAME + urls.REFERENCES.PATH.OPERATIONS,
      loadingPage: false,
      attrs: undefined,
      dialog_add_edit: false,
      dialog_delete: false,
      oper_data: undefined,
      edit_status: undefined,
      items: undefined,
      headers: [
        {text: 'ID', value: 'id', align: 'start', sortable: false, width: '25px'},
        {text: 'Номер операции', value: 'number_operation', align: 'start', sortable: false},
        {text: 'Заказ', value: 'order.text', align: 'start', sortable: true},
        {text: 'Дата операции', value: 'date_time', align: 'start', sortable: true},
        {text: 'Товар', value: 'product.text', sortable: false, align: 'center'},
        {text: 'Тип операции', value: 'operation_type.text', sortable: false, align: 'center'},
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
    newOper() {
      this.dialog_add_edit = true
      this.edit_status = false
      this.oper_data = undefined
    },
    editOper(item) {
      this.dialog_add_edit = true
      this.edit_status = true
      this.oper_data = item
    },
    deleteOper(item) {
      this.dialog_delete = true
      this.oper_data = item
    },
    // eslint-disable-next-line no-unused-vars
    closeEditDialog(event) {
      this.loadData()
      this.dialog_add_edit = false
      this.oper_data = undefined
    },
    closeDeleteDialog(event) {
      console.log('event', event)

      if (event) {
        let id_url = this.oper_data.id + '/'
        makeDeleteRequest(this.URL + id_url)
      }
      setTimeout(()=>{
        this.loadData()
        this.dialog_delete = false
        this.oper_data = undefined
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
            for (let item in this.items) {
              let date_time = this.items[item].date_time.split('T')
              date_time[1] = date_time[1].slice(0, 8)
              this.items[item].date_time = date_time.join(' ')
              // console.log(this.items[item].date_time)
            }
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