<template>
  <v-container class="subprimary mt-10">
    <v-row align-content="start" align="start" v-if="title">
      <v-col cols="auto">
        <h1>{{title}}</h1>
      </v-col>
    </v-row>
    <v-divider  class="py-2" v-if="title"></v-divider>
  </v-container>
</template>

<script>

export default {
  name: "PageHeader",
  props: {
    title: String
  }
}
</script>

<style scoped>

</style>
