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
            Добавить организацию
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
  name: "OrgList",
  components: {PageHeader},
  data() {
    return {
      title: 'Организации',
      loadingPage: false,
      items: [
        // {number: 'Номер', model: 'Марка', color: 'Цвет', actions: 'Действия'},
      ],
      headers: [
        {text: 'Наименование', value: 'short_name', align: 'start', sortable: false},
        {text: 'E-mail', value: 'mail_address', align: 'start', sortable: false},
        {text: 'ИНН', value: 'inn', align: 'start', sortable: true},
        {text: 'Банк', value: 'bank_name', align: 'start', sortable: true},
        {text: 'Контактное лицо', value: 'contact_person', align: 'start', sortable: true},
      ],
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>