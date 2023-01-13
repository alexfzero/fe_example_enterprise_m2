<template>
  <scroll-center-dialog
      v-model="
      /* eslint-disable-next-line vue/no-mutating-props */
      opened"
      :loading="save_loading"
      width="500"
      @close="close"
      @apply="save"
      :title="form_title"
      :scrolled="false"
  >
    <v-text-field
        v-model="number"
        label="Номер"
        :error="hasError('number')"
        :errorMessages="getError('number')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="name"
        label="Наименование"
        :error="hasError('name')"
        :errorMessages="getError('name')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="article"
        label="Артукул"
        :error="hasError('article')"
        :errorMessages="getError('article')"
        class="mb-n2"
    ></v-text-field>
    <v-text-field
        v-model="quantity"
        label="Кол-во"
        :error="hasError('quantity')"
        :errorMessages="getError('quantity')"
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
  name: "StorageEditForm",
  components: {ScrollCenterDialog},
  mixins: [FormErrorsMixin],
  props: {
    opened: Boolean,
    edit: Boolean,
    productData: Object,
  },
  data() {
    return {
      default_data: {
        number: undefined,
        name: undefined,
        article: undefined,
        quantity: undefined,
      },
      URL: models.API + roles.SUPER_ADMIN + models.REFERENCES.NAME + models.REFERENCES.PATH.STORAGES,
      loading: false,
      number: undefined,
      name: undefined,
      article: undefined,
      quantity: undefined,
      save_loading: false,
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    save() {
      let data = {
        product_number: this.number,
        product_name: this.name,
        product_article: this.article,
        quantity: this.quantity,
      }

      if (this.edit) {
        let id = this.productData.id
        this.changePos(data, id)
      } else {
        this.createPos(data)
      }
    },
    createPos(data) {
      makePostRequest(this.URL, data)
      setTimeout(() => {
        this.save_loading = false
        this.$emit('close', this.position)
      }, 300)
    },
    changePos(data, id) {
      let url_id = id + '/'
      makeUpdateRequest(this.URL + url_id, data)
      setTimeout(() => {
        this.save_loading = false
        this.$emit('close', this.position)
      }, 300)
    },
    load_edit_item() {
      if (this.productData) {
        this.number = this.productData.product_number
        this.name = this.productData.product_name
        this.article = this.productData.product_article
        this.quantity = this.productData.quantity
      }
    },
  },

  created() {
    this.load_edit_item()
  },
  computed: {
    form_title() {
      return this.edit === false ? 'Добавить позицию' : 'Редактировать позицию'
    }
    ,
  }
}
</script>

<style scoped>

</style>