<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="items"
        :loading="loadingPage"
        class="elevation-1"
    ></v-data-table>
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
        {text: 'Номер операции', value: 'number', align: 'start', sortable: false},
        {text: 'Заказ', value: 'order', align: 'start', sortable: true},
        {text: 'Дата операции', value: 'date', align: 'start', sortable: true},
        {text: 'Товар', value: 'product', sortable: false, align: 'center'},
        {text: 'Тип операции', value: 'operation', sortable: false, align: 'center'},
      ],
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>