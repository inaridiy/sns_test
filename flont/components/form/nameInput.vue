<template>
  <v-text-field
    v-model="setEmail"
    :disabled="disabled"
    label="ユーザー名を入力"
    prepend-icon="mdi-account-circle"
    placeholder="タナッキー"
  >
  </v-text-field>
</template>
<script>
export default {
  props: {
    name: {
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
        return this.name;
      },
      set(newVal) {
        return this.$emit("update:name", newVal);
      }
    }
  }
};
</script>
