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
            Добавить проводку
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
  name: "FundsList",
  components: {PageHeader},
  data() {
    return {
      title: 'Движение денежных средств',
      loadingPage: false,
      items: [
        // {number: 'Номер', model: 'Марка', color: 'Цвет', actions: 'Действия'},
      ],
      headers: [
        {text: 'Номер', value: 'number', align: 'start', sortable: false},
        {text: 'Контракт', value: 'contract', align: 'start', sortable: true},
        {text: 'Наименование', value: 'name', align: 'start', sortable: false},
        {text: 'Время проводки', value: 'date_time', align: 'start', sortable: true},
        {text: 'Валюта', value: 'currency', align: 'start', sortable: true},
        {text: 'Значение', value: 'value', align: 'start', sortable: true},
        {text: 'Пришел от', value: 'came_from', align: 'start', sortable: true},
      ],
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>