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
            Добавить артикул
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
  name: "StorageList",
  data() {
    return {
      loadingPage: false,
      items: [
        // {number: 'Номер', model: 'Марка', color: 'Цвет', actions: 'Действия'},
      ],
      headers: [
        {text: 'Номер', value: 'product_number', align: 'start', sortable: false},
        {text: 'Наименование', value: 'product_name', align: 'start', sortable: true},
        {text: 'Артикул', value: 'product_article', align: 'start', sortable: true},
        {text: 'Кол-во', value: 'quantity', sortable: false, align: 'center'},
      ],
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>