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
  name: "StorageList",
  data() {
    return {
      loadingPage: false,
      items: [
        // {number: 'Номер', model: 'Марка', color: 'Цвет', actions: 'Действия'},
      ],
      headers: [
        {text: 'Номер', value: 'number', align: 'start', sortable: false},
        {text: 'Наименование', value: 'name', align: 'start', sortable: true},
        {text: 'Артикул', value: 'article', align: 'start', sortable: true},
        {text: 'Кол-во', value: 'quantity', sortable: false, align: 'center'},
      ],
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>