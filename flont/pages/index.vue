<template>
  <div>
    <v-btn class="info" @click="submit">ログイン</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    async submit() {
      console.log(await this.$axios.get("/auth/user"));
    }
  }
};
</script>
