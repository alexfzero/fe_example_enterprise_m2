<template>
  <div>
    <PageHeader :title="title"></PageHeader>

    <v-container class="page-content" style="width: 100%">
      <v-toolbar
          class="removeBtnPaddingRight"
          color="#DADADA"
          dense
          flat
      >
        <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp" class="pa-2">
          <v-btn
              depressed
              outlined
              @click="+1"
          >
            Добавить заявку
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    <v-data-table
          :headers="headers"
          :items="items"
          :loading="loadingPage"
          class="elevation-1"
      ></v-data-table>
    </v-container>
  </div>
</template>

<script>
import PageHeader from "@/modules/core/components/PageHeader.vue";

export default {
  name: "OrderList",
  components: {PageHeader},
  data() {
    return {
      title: 'Заявки',
      loadingPage: false,
      items: [
        // {number: 'Номер', model: 'Марка', color: 'Цвет', actions: 'Действия'},
      ],
      headers: [
        {text: 'Номер', value: 'order_number', align: 'start', sortable: false},
        {text: 'Поставщик', value: 'provider', align: 'start', sortable: false},
        {text: 'Контактное лицо', value: 'contact_person', align: 'start', sortable: false},
        {text: 'Дата регистрации', value: 'order_reg_date', align: 'start', sortable: true},
        {text: 'Номер контракта', value: 'contract_number', align: 'start', sortable: false},
        {text: 'Менеджер', value: 'purchase_manager', align: 'start', sortable: false},
      ],
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>