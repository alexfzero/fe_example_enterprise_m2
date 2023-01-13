<template>
  <v-dialog
      v-model="
      /* eslint-disable-next-line vue/no-mutating-props */
      opened"
      width="500"
      persistent
  >
    <v-card class="rounded-lg">
      <v-card-title>Подтвердите изменение</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-5">
        <span v-html="getText()" v-if="getText !== undefined && opened"></span>
        <slot v-else></slot>
      </v-card-text>
      <v-card-actions>
        <v-flex>
          <v-btn
              @click="applyDialog"
              color="warning"
              text
          >
            Подтвердить
          </v-btn>
          <v-btn
              @click="closeDialog"
              text
          >
            Отменить
          </v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: "PosApplyDialog",
  props: {
    getText: {
      type: Function,
      default: undefined,
    },
    attrs: Object,
    opened: Boolean,
  },
  data: function () {
    return {
      // opened: true
    }
  },
  methods: {
    closeDialog: function () {
      this.$emit('close', false)
    },
    applyDialog: function () {
      this.$emit('close', true)
    }

  }
}
</script>

<style scoped>

</style>
