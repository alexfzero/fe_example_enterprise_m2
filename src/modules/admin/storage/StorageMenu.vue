<template>
  <div>
    <v-container class="mt-16">
      <v-row
          justify="center"
          align="center"
      >
        <v-col cols="3">
          <DashBoardCard color='#393C6E'
                         :title="'Storage'"
                         :icon="'format_list_numbered'"
                         v-on:storage="isStorage = true"
          />
        </v-col>
        <v-col cols="3">
          <DashBoardCard color="#393C6E"
                         :title="'Storage operations'"
                         :icon="'insert_chart_outlined'"
                         v-on:storage="isStorage = false"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-container>
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

export default {
  name: "StorageMenu",
  components: {
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