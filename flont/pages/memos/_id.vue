<template>
  <v-container>
    <v-card>
      <div>IDは{{ memoId }}です</div>
      <br />
      <v-text-field
        label="タイトルを入れやがれください"
        v-model="title"
        outlined
      ></v-text-field>
      <v-container>
        <div id="editorjs" />
      </v-container>
      <v-btn @click="save">保存</v-btn>
    </v-card>
  </v-container>
</template>

<script>
let EditorJS, Header, List;
if (process.client) {
  EditorJS = require("@editorjs/editorjs");
  Header = require("@editorjs/header");
  List = require("@editorjs/list");
}

export default {
  name: "ArticleCreateForm",
  data: () => ({
    editor: {},
    p: "",
    title: ""
  }),
  async asyncData({ $axios, params }) {
    const ip = await $axios.$get(`http://localhost:4000/memos/${params.id}`);

    return { ...ip, p: params.id };
  },
  async mounted() {
    const temp = this.memo ? JSON.parse(this.memo) : null;
    this.editor = new EditorJS({
      holder: "editorjs",
      data: temp,
      tools: {
        header: Header,
        list: {
          class: List,
          inlineToolbar: true
        }
      }
    });
  },
  methods: {
    async save() {
      const data = await this.editor.save();
      await this.$axios.$post(`http://localhost:4000/memos/${this.p}`, {
        title: this.title,
        memo: data
      });
    }
  }
};
</script>

<style scoped></style>
