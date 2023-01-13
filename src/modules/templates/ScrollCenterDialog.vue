<template>
  <v-dialog
      v-model="
      /* eslint-disable-next-line vue/no-mutating-props */
      value"
      :width="width"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      persistent
      scrollable
  >
    <v-card class="rounded-lg">
      <v-toolbar flat tile rounded="0" width="100%" :color="topColor" class="px-2 rounded-t-lg">
        <slot name="title">
          <span class="text-h5">
            {{ title }}
          </span>
        </slot>
        <v-spacer v-if="spacedTitle"></v-spacer>
        <v-btn
            v-show="closed"
            fab
            icon
            small
            @click="closeDialog(false)"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container class="overflow-y-auto scrolled-style pt-0" :style="{height: contentHeight ? contentHeight: undefined}">
        <slot>

        </slot>
      </v-container>
      <v-card-actions>
        <slot name="actions">
          <slot name="prepend-actions"></slot>
          <v-spacer v-if="left"></v-spacer>
          <v-btn
              :color="dennyColor"
              text
              :loading="loading"
              :readonly="loading"
              @click="closeDialog(false)"
          >
            {{ dennyText }}
          </v-btn>
          <v-spacer v-if="between"></v-spacer>
          <v-btn
              v-if="applyable"
              :color="applyColor"
              text
              :loading="loading"
              :readonly="loading"
              @click="closeDialog(true)"
          >
            {{ applyText }}
          </v-btn>
          <v-spacer v-if="right"></v-spacer>
          <slot name="append-actions"></slot>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ScrollCenterDialog",
  props: {
    value: Boolean,
    title: String,
    scrolled: {
      default: true,
      type: Boolean
    },
    closed: {
      default: true,
      type: Boolean
    },
    spacedTitle: {
      default: true,
      type: Boolean,
    },
    between: {
      default: false,
      type: Boolean,
    },
    left: {
      default: true,
      type: Boolean,
    },
    right: {
      default: false,
      type: Boolean,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    dennyText: {
      default: 'Отмена',
      type: String,
    },
    dennyColor: {
      default: 'blue darken-1',
      type: String,
    },
    applyable: {
      default: true,
      type: Boolean,
    },
    applyText: {
      default: 'Сохранить',
      type: String,
    },
    applyColor: {
      default: 'blue darken-1',
      type: String,
    },
    topColor: {
      default: 'super-grey',
      type: String
    },
    width: {
      default: '600px',
      type: String,
    },
    contentHeight: {
      default: undefined,
      type: String
    }
  },
  data(){
    return {}
  },
  watch: {
  },
  methods: {
    closeDialog(emit_apply=false){
      if (emit_apply)
        this.$emit('apply')
      else
        this.$emit('close')
    }
  }
}
</script>

<style scoped>
.scrolled-style::-webkit-scrollbar {
  width: 5px;
}

.scrolled-style::-webkit-scrollbar-track {
}

.scrolled-style::-webkit-scrollbar-thumb {
  background: gray;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}
</style>
