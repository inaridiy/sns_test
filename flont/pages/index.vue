<template>
  <v-container>
    <form-card title="ログイン">
      <v-form>
        <v-text-field v-model="tweet.text"></v-text-field>
        <v-card-actions>
          <v-btn class="info" @click="tweetPost">ツイート</v-btn>
        </v-card-actions>
      </v-form>
    </form-card>

    <div>
      <v-btn class="info" @click="submit">ログイン</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return { tweet: { text: "" } };
  },
  methods: {
    async submit() {
      console.log(await this.$axios.get("/auth/user"));
    },
    async tweetPost() {
      console.log(await this.$axios.post("/tweet", { text: this.tweet.text }));
    }
  }
};
</script>
