<template>
  <div>
    <nav-bar>
      <div slot="left">
        <img src="../../../assets/img/common/back.svg" alt class="back" @click="backClick" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item,index) in titles"
          class="title-item"
          @click="titleClick(index)"
          :class="{active:index===currentIndex}"
        >{{item}}</div>
      </div>
    </nav-bar>
    
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "detailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
}
.title-item {
  margin: 0 8px;
  flex: 1;
}
.active {
  color: pink;
}
.back {
  margin-top: 10px;
}
</style>