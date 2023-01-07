<template>
  <div>
    <v-container class="mt-15">
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
    <v-container class="mt-10">
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
import DashBoardCard from "@/modules/core/components/Cards.vue";
import OperationList from "@/modules/admin/storage/OperationList.vue";

export default {
  name: "StorageMenu",
  components: {OperationList, DashBoardCard, StorageList},
  data() {
    return {
      isStorage: true
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>