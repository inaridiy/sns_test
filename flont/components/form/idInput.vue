<template>
  <v-text-field
    v-model="setEmail"
    :disabled="disabled"
    label="IDを入力"
    prepend-icon="mdi-identifier"
    placeholder="yourID"
  >
  </v-text-field>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    setEmail: {
      get() {
        return this.id;
      },
      set(newVal) {
        return this.$emit("update:id", newVal);
      }
    }
  }
};
</script>
