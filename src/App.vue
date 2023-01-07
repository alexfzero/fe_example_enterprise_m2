<template>
  <v-app>
    <leftMenu></leftMenu>
    <v-main id="base-content" class="d-print-none">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>



import leftMenu from "@/modules/core/components/leftMenu.vue";

export default {
  name: 'App',

  components: {leftMenu},

  data: () => ({
    //
  }),
};
</script>
