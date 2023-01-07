<template>
  <div class="d-inline">
    <h1>Main</h1>
    <div style="height: 120px"
         class="d-flex flex-column flex-wrap align-content-center justify-space-around">
      <router-link :to="{name: 'pageOne', params:{}}">
        <v-btn></v-btn>
      </router-link>
      <router-link :to="{name: 'pageTwo', params:{}}">
        <v-btn></v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage"
}
</script>

<style scoped>

</style>