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
        v-model="department"
        label="Тип оперции"
        :error="hasError('department')"
        :errorMessages="getError('department')"
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
  name: "DepEditForm",
  components: {ScrollCenterDialog},
  mixins: [FormErrorsMixin],
  props: {
    opened: Boolean,
    edit: Boolean,
    departmentData: Object,
  },
  data() {
    return {
      default_data: {
        status: undefined,
      },
      URL: models.API + roles.SUPER_ADMIN + models.TEMPS.NAME + models.TEMPS.PATH.DEPARTMENTS,
      loading: false,
      department: undefined,
      save_loading: false,
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    save() {
      let data = {
        name: this.department,
      }

      if (this.edit) {
        let id = this.departmentData.id
        this.changePos(data, id)
      } else {
        this.createPos(data)
      }
    },
    createPos(data) {
      makePostRequest(this.URL, data)
      setTimeout(()=>{
        this.save_loading = false
        this.$emit('close', this.department)
      }, 300)
    },
    changePos(data, id) {
      let url_id = id + '/'
      makeUpdateRequest(this.URL + url_id, data)
      setTimeout(()=>{
        this.save_loading = false
        this.$emit('close', this.department)
      }, 300)
    },
    load_edit_item() {
      if (this.departmentData) {
        this.department = this.departmentData.name
      }
    },
  },

  created() {
    this.load_edit_item()
  },
  computed: {
    form_title() {
      return this.edit === false ? 'Добавить департамент' : 'Редактировать департамент'
    }
    ,
  }
}
</script>

<style scoped>

</style>