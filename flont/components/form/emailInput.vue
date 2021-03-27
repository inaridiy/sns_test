<template>
  <v-text-field
    v-model="setEmail"
    :disabled="disabled"
    :rules="rules"
    type="email"
    label="メールアドレスを入力"
    prepend-icon="mdi-email"
    placeholder="your@email.com"
  >
  </v-text-field>
</template>
<script>
export default {
  data() {
    return {
      rules: [
        v => !!v || "",
        v => /.+@.+\..+/.test(v) || "",
        value => !!value || "必ず入力してください"
      ]
    };
  },
  props: {
    email: {
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
        return this.email;
      },
      set(newVal) {
        return this.$emit("update:email", newVal);
      }
    }
  }
};
</script>
