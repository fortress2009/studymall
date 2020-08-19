<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 检测滑动位置
      // 开启上拉加载事件(根据使用该组件的页面 决定是否开启)
      probetype: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true,
    });
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
    if (this.pullUpLoad) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }
  },
  methods: {
    // 下拉加载后刷新
    // finishPullUp(){
    //   setTimeout(this.scroll.finishPullUp(),1000)
    // }
    refresh() {
      this.scroll && this.scroll.refresh();
      console.log("----");
    },
    finishPullUp(){
      // 完成上拉加载更多
      // 加载新的数据后刷新 下拉加载更多
      this.scroll.finishPullUp()
    }
  },
};
</script>

<style>
</style>