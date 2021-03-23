<template>
  <v-container>
    <h1 class="text-h1 text-center">シンプルメモ</h1>

    <div class="text-center">
      <v-btn
        class="pa-2"
        x-large
        :to="
          `/memos/${Math.random()
            .toString(32)
            .substring(2)}`
        "
        >新規作成</v-btn
      >
      <div class="pa-2">または</div>
      <div class=".flex">
        <v-text-field label="IDを入れてね" v-model="id" outlined></v-text-field>
        <v-btn :to="`/memos/${id}`">読み込む</v-btn>
      </div>
    </div>
  </v-container>
</template>
<script>
export default {
  data: () => {
    return {
      id: ""
    };
  }
};
</script>
