<template>
  <div>
    <PageHeader :title="title"></PageHeader>

    <v-container>
      <v-row
          justify="center"
          align="center"
      >
        <v-col cols="3">
          <DashBoardCard color='#393C6E'
                         :data="2"
                         :title="'Storage'"
                         :icon="'format_list_numbered'"
                         v-on:storage="isStorage = true"
          />
        </v-col>
        <v-col cols="3">
          <DashBoardCard color="#393C6E"
                         :data="2"
                         :title="'Storage operations'"
                         :icon="'insert_chart_outlined'"
                         v-on:storage="isStorage = false"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-container class="mt-5">
      <div v-if="isStorage">
        <StorageList></StorageList>
      </div>
      <div v-else>
        <OperationList></OperationList>
      </div>
    </v-container>
  </div>
</template>

<script>
import StorageList from "@/modules/admin/storage/StorageList.vue";
import DashBoardCard from "@/modules/admin/storage/Cards.vue";
import OperationList from "@/modules/admin/storage/OperationList.vue";
import PageHeader from "@/modules/core/components/PageHeader.vue";

export default {
  name: "StorageMenu",
  components: {
    PageHeader,
    OperationList,
    DashBoardCard,
    StorageList
  },
  data() {
    return {
      title: 'Склад',
      isStorage: true
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>