<template>
  <div>
    <PageHeader :title="title"></PageHeader>
    <v-container class="d-flex flex-column justify-center align-center">
      <v-toolbar
          class="removeBtnPaddingRight"
          color="#DADADA"
          dense
          flat
          width="900px"
      >
        <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp" class="pa-2">
          <v-btn
              color="primary"

              @click="newUser"
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
          style="width: 900px"
          :options.sync="options"
          :server-items-length="count"
      >
        <template v-slot:[`item.is_admin`]="{ item }">
          <v-icon
              :color="checkFlag(item.is_admin).color"
          >
            {{ checkFlag(item.is_admin).icon }}
          </v-icon>
        </template>
        <template v-slot:[`item.is_staff`]="{ item }">
          <v-icon
              :color="checkFlag(item.is_staff).color"
          >
            {{ checkFlag(item.is_staff).icon }}
          </v-icon>
        </template>
        <template v-slot:[`item.is_booker`]="{ item }">
          <v-icon
              :color="checkFlag(item.is_booker).color"
          >
            {{ checkFlag(item.is_booker).icon }}
          </v-icon>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                  class="mr-2"
                  @click="editUser(item)"
                  v-bind="attrs"
                  v-on="on"
              >
                edit
              </v-icon>
            </template>
            <span>Редактировать пользователя</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                  @click="deleteUser(item)"
                  v-bind="attrs"
                  v-on="on"
                  class="mr-2"
              >
                delete
              </v-icon>
            </template>
            <span>Удалить пользователя</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <UserEditForm
          v-if="dialog_add_edit"
          :opened="dialog_add_edit"
          :edit="edit_status"
          :user-data="user_data"
          @close="closeEditDialog"
      ></UserEditForm>
      <ApplyDialog
          v-if="dialog_delete"
          :opened="dialog_delete"
          :get-text="() => `Вы уверены, что хотите удалить данного пользователя ?`"
          @close="closeDeleteDialog"
      ></ApplyDialog>
    </v-container>
  </div>
</template>

<script>
import PageHeader from "@/modules/core/components/PageHeader.vue";
import UserEditForm from "@/modules/admin/users/UserEditForm.vue";
import ApplyDialog from "@/modules/admin/positions/ApplyDialog.vue";
import urls from "@/urls/models";
import roles from "@/urls/roles";
import {makeGetRequest, makeDeleteRequest} from "@/helper";
import {isPipeOperator} from "eslint-plugin-vue/lib/utils/indent-utils";

export default {
  name: "UserList",
  components: {
    PageHeader,
    ApplyDialog,
    UserEditForm
  },
  data() {
    return {
      opened: false,
      title: 'Пользователи',
      count: 0,
      options: {},
      URL: urls.API + roles.SUPER_ADMIN + urls.CONTACTS.NAME + urls.CONTACTS.PATH.USER,
      loadingPage: false,
      attrs: undefined,
      dialog_add_edit: false,
      dialog_delete: false,
      user_data: undefined,
      edit_status: undefined,
      items: undefined,
      headers: [
        {text: 'ID', value: 'id', align: 'start', sortable: false, width: '25px'},
        {text: 'Login', value: 'username', align: 'start', sortable: true},
        {text: 'ФИО', value: 'fio', align: 'start', sortable: true},
        {text: 'Должность', value: 'position.text', align: 'start', sortable: false},
        {text: 'Админ', value: 'is_admin', align: 'start', sortable: false, width: '25px'},
        {text: 'Сотрудник', value: 'is_staff', align: 'start', sortable: false, width: '25px'},
        {text: 'Бухгалтер', value: 'is_booker', align: 'start', sortable: false, width: '25px'},
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
    isPipeOperator,
    checkFlag(flag) {
      if (flag) return {icon: "check_circle", color: "green"}
      else return {icon: "not_interested", color: "grey"}
    },
    newUser() {
      this.dialog_add_edit = true
      this.edit_status = false
      this.user_data = undefined
    },
    editUser(item) {
      this.dialog_add_edit = true
      this.edit_status = true
      this.user_data = item
    },
    deleteUser(item) {
      this.dialog_delete = true
      this.user_data = item
    },
    // eslint-disable-next-line no-unused-vars
    closeEditDialog(event) {
      this.loadData()
      this.dialog_add_edit = false
      this.user_data = undefined
    },
    closeDeleteDialog(event) {
      console.log('event', event)

      if (event) {
        let id_url = this.user_data.id + '/'
        makeDeleteRequest(this.URL + id_url)
      }
      setTimeout(()=>{
        this.loadData()
        this.dialog_delete = false
        this.user_data = undefined
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