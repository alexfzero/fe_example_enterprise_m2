<template>
  <div>
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
            Добавить операцию
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
export default {
  name: "OperationList",
  data() {
    return {
      loadingPage: false,
      items: [
        // {number: 'Номер', model: 'Марка', color: 'Цвет', actions: 'Действия'},
      ],
      headers: [
        {text: 'Номер операции', value: 'number_operation', align: 'start', sortable: false},
        {text: 'Заказ', value: 'order', align: 'start', sortable: true},
        {text: 'Дата операции', value: 'date_time', align: 'start', sortable: true},
        {text: 'Товар', value: 'product', sortable: false, align: 'center'},
        {text: 'Тип операции', value: 'operation_type', sortable: false, align: 'center'},
      ],
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>