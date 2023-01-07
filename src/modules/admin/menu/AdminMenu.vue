<template>
  <div>
    <v-container class="mt-15">
      <v-row
          justify="center"
          align="center"
      >
        <v-col cols="3">
          <DashBoardCard :title="'Operations type'" color='#393C6E' :data="2"
                         :icon="'type_specimen'"/>
        </v-col>
        <v-col cols="3">
          <DashBoardCard :title="'Contract statuses'" color="#393C6E" :data="2"
                         :icon="'description'"/>
        </v-col>
        <v-col cols="3">
          <DashBoardCard :title="'Users'" color="#393C6E" :data="2"
                         :icon="'people'"/>
        </v-col>
        <v-col cols="3" class="ma-5">
          <DashBoardCard :title="'Departments'" color="#393C6E" :data="2"
                         :icon="'badge'"/>
        </v-col>

        <v-col cols="3">
          <DashBoardCard :title="'Positions'" color="#393C6E" :data="2"
                         :icon="'person_pin_circle'"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DashBoardCard from '../../core/components/Cards.vue';


export default {
  name: "MainMenu",
  data() {
    return {}
  },
  components: {
    DashBoardCard
  },
  created() {
  },
  methods: {},
}
</script>

<style scoped>

</style>