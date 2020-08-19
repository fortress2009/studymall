<template>
  <div class="goodsList">
    <list-item v-for="item in goodsList" :listItem="item"></list-item>
  </div>
</template>

<script>
import ListItem from "@/components/content/goods/ListItem";

export default {
  name: "goodsList",
  components: {
    ListItem,
  },
  props: {
    goodsList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.goodsList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>

