<template>
  <v-card width="500px" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">{{ title }}</h1>
    </v-card-title>
    <slot />
  </v-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "無名のフォーム"
    }
  }
};
</script>
