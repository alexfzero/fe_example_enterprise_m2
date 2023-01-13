<template>
  <v-dialog
      :value="isOpened"
      max-width="390"
      class="justify-center"
      persistent
  >
    <v-card elevation="4" light tag="section">
      <v-card-title>
        <v-layout align-center justify-space-between>
          <h3 class="headline">
            Authorization
          </h3>
            <v-img alt="Authorization" class="ml-3" contain height="48px" width="100px"
                   position="center right" :src="logo"></v-img>
        </v-layout>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p>Sign in with your username and password:</p>
        <v-form>
          <v-text-field
              outline
              label="Username"
              type="text"
              v-model="user.username"></v-text-field>
          <v-text-field
              outline
              hide-details
              label="Password"
              type="password"
              v-model="user.password"></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions :class="{ 'justify-center pa-3': $vuetify.breakpoint.smAndUp }">
        <v-btn
            color="primary"
            :large="$vuetify.breakpoint.smAndUp"
            @click.stop="closeDialog"
        >
          <v-icon left>lock</v-icon>
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import logo from "@/assets/logo.png"

export default {
  name: 'LoginDialog',
  props: {
    isOpened: Boolean
  },
  data() {
    return {
      logo: logo,
      user: {
        username: undefined,
        password: undefined
      }
    }
  },
  methods: {
    closeDialog() {
      let data = {}
      data = this.user
      this.user = {
        username: undefined,
        password: undefined
      }
      this.$emit('close', data)
    }
  }
}
</script>