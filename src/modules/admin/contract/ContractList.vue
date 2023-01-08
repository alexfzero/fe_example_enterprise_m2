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
            Добавить контракт
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
  name: "ContractList",
  components: {PageHeader},
  data() {
    return {
      title: 'Контракты',
      loadingPage: false,
      items: [
        // {number: 'Номер', model: 'Марка', color: 'Цвет', actions: 'Действия'},
      ],
      headers: [
        {text: 'Номер', value: 'number', align: 'start', sortable: false},
        {text: 'Клиент', value: 'client', align: 'start', sortable: true},
        {text: 'Документ', value: 'Document', align: 'start', sortable: false},
        {text: 'Статус', value: 'status', align: 'start', sortable: true},
        {text: 'Сформирован', value: 'formalized', align: 'start', sortable: true},
      ],
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>