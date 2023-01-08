<template>
  <div>
    <PageHeader :title="title"></PageHeader>

    <div style="height: 35px"></div>

    <v-container>
      <v-data-iterator
          :items=router_items.name_list
          hide-default-footer
          no-data-text="Нет данных"
      >
        <v-row class="align-center">
          <v-col
              cols="12"
              sm="6"
              lg="4"
              v-for="(item, index) in router_items.link"
              :key="`card_${index}`"
          >
            <router-link style="text-decoration: none" :to="item">
              <v-card
                  min-height="150"
                  elevation="6"
                  class="ma-3 d-flex"
                  color="#393C6E"
                  rounded
              >
                <v-container class="my-auto">
                  <v-row class="my-auto">
                    <v-col class="title white--text">
                      <div class="d-flex justify-center align-center">
                        <v-icon color="white" large left>{{ router_items.icon[index] }}</v-icon>
                        <span style="font-size: 26px">{{ router_items.name_list[index] }}</span>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </router-link>
          </v-col>
        </v-row>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>

import PageHeader from "@/modules/core/components/PageHeader.vue";

export default {
  name: "AdminMenu",
  components: {
    PageHeader
  },
  data() {
    return {
      title: 'Панель администратора',
      router_items: {
        name_list: ['Operations type', 'Contract statuses', 'Users', 'Departments', 'Positions'],
        icon: ['type_specimen', 'description', 'people', 'badge', 'person_pin_circle'],
        link: ['/admin/references/operations', '/', '/', '/', '/']
      }
    }
  },
  created() {
  },
  methods: {},
}
</script>

<style scoped>

</style>