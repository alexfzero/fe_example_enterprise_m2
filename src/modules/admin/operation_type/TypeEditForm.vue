<template>
  <scroll-center-dialog
      v-model="
      /* eslint-disable-next-line vue/no-mutating-props */
      opened"
      :loading="save_loading"
      width="600"
      @close="close"
      @apply="save"
      :title="form_title"
      :scrolled="false"
  >
    <v-text-field
        v-model="operation"
        label="Тип оперции"
        :error="hasError('operation')"
        :errorMessages="getError('operation')"
        class="mb-n2"
    ></v-text-field>
  </scroll-center-dialog>
</template>

<script>
import FormErrorsMixin from "@/mixins/FormErrorsMixin"
import {makePostRequest, makeUpdateRequest} from "@/helper";
import models from "@/urls/models";
import roles from "@/urls/roles";
import ScrollCenterDialog from "@/modules/templates/ScrollCenterDialog.vue";

export default {
  name: "TypeEditForm",
  components: {ScrollCenterDialog},
  mixins: [FormErrorsMixin],
  props: {
    opened: Boolean,
    edit: Boolean,
    operationData: Object,
  },
  data() {
    return {
      default_data: {
        status: undefined,
      },
      URL_OPERATION: models.API + roles.SUPER_ADMIN + models.TEMPS.NAME + models.TEMPS.PATH.OPERATIONS,
      loading: false,
      operation: undefined,
      save_loading: false,
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    save() {
      let data = {
        name: this.operation,
      }

      if (this.edit) {
        let id = this.operationData.id
        this.changePos(data, id)
      } else {
        this.createPos(data)
      }
    },
    createPos(data) {
      makePostRequest(this.URL_OPERATION, data)
      setTimeout(()=>{
        this.save_loading = false
        this.$emit('close', this.operation)
      }, 300)
    },
    changePos(data, id) {
      let url_id = id + '/'
      makeUpdateRequest(this.URL_OPERATION + url_id, data)
      setTimeout(()=>{
        this.save_loading = false
        this.$emit('close', this.operation)
      }, 300)
    },
    load_edit_item() {
      if (this.operationData) {
        this.operation = this.operationData.name
      }
    },
  },

  created() {
    this.load_edit_item()
  },
  computed: {
    form_title() {
      return this.edit === false ? 'Добавить тип оперции' : 'Редактировать тип оперции'
    }
    ,
  }
}
</script>

<style scoped>

</style>