<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 由于betterscroll组件的吸顶有bug所有采用复制的方法 
    在滚动到相应的位置时  原来的tabcontrol继续滚动 使用该克隆组件代替-->
    <tab-control
      class="tabcontrol"
      :titles="['流行','新款','精选']"
      @tabClick="TabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentClick"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-featrue></home-featrue>
      <tab-control :titles="['流行','新款','精选']" @tabClick="TabClick" ref="tabControl2"></tab-control>
      <goods-list :goodsList="showGoods"></goods-list>
    </scroll>
    <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import { getHomeMultidata, getHomeGoods } from "../../network/home";
import { debounce } from "../../components/common/utils/utils";

import NavBar from "@/components/common/navbar/NavBar";

import HomeSwiper from "@/views/home/childComponent/HomeSwiper";
import HomeRecommend from "@/views/home/childComponent/HomeRecommend";
import HomeFeatrue from "@/views/home/childComponent/HomeFeatrue";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/BackTop/backTop";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommend,
    HomeFeatrue,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      currentType: "pop",
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = debounce(
      this.$refs.scroll && this.$refs.scroll.refresh,
      500
    );
    // 监听listitem的图片加载 (事件总线需要在main.js注册)
    this.$bus.$on("itemImgLoad", () => {
      // 侦测到图片已经加载完 scroll组件就刷新并计算wrapper的高度
      // 确保拿过来的数据是不为空的(假如scroll为空就会报错)
      // 调用防抖函数
      refresh();
    });
    // 获取tabcontrol的offsettop
    // 使用组件的属性$el：获取组件中的元素
    setTimeout(() => {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.tabOffsetTop);
    }, 200);
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated() {
    // 进来到主页 回滚到上次离开的位置 saveY
    // refresh()保存之前的缓存内容，重新加载页面，没有加载上来的东西 继续加载
    this.$refs.scroll.refresh()
    this.$refs.scroll.scroll.scrollTo(0,this.saveY) 
    console.log(this.saveY);
  },
  deactivated() {
    // this.$refs.scroll.refresh()
    // 在离开时 记录home页的高度
    this.saveY = this.$refs.scroll && this.$refs.scroll.scroll.y;
    console.log(this.saveY);
  },
  methods: {
    /**
     * 事件监听
     */
    TabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;

        case 1:
          this.currentType = "new";
          break;

        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // 通过ref拿到scroll组件 可以通过方法 scrollTo（0,0,500）回到顶部
      // 500毫秒延时
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    },
    contentClick(position) {
      this.isShowBackTop = -position.y > 750;
      // 决定克隆的tabcontrol是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 下拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    /**
     * 网络请求
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        (this.banners = res.data.banner.list),
          (this.recommends = res.data.recommend.list);
          // 下次更新DOM时,获取新的tabOffsetTop值
        // this.$nextTick(() => {
        //   this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        //   console.log(this.tabOffsetTop);
        // });
      });
    },
    getHomeGoods(type) {
      // 数据较多时  当前的数据加载完 再来获取当前页+1的数据
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // 将每次获取的数据添加到goods的对象里面
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script> 

<style scoped>
#home {
  margin-top: 44px;
}
.home-nav {
  background-color: pink;
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 5;
}
.content {
  position: absolute;
  overflow: hidden;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
}
.tabcontrol {
  position: relative;
  z-index: 5;
  background-color: #fff;
}
</style>