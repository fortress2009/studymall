<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
import detailNavBar from "@/views/detail/childComps/detailNavBar";
import detailSwiper from "@/views/detail/childComps/detailSwiper";
import detailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import detailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import Scroll from "@/components/common/scroll/Scroll";

import { getDetailData, Goods, Shop } from "../../network/detail";
export default {
  name: "detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo:{}
    };
  },
  components: {
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo,
    Scroll,
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid;
    // 根据iid来请求数据
    getDetailData(this.iid).then((res) => {
      const data = res.result;
      // 分离请求到的数据
      console.log(res);

      // 2.2.获取顶部信息
      this.topImages = data.itemInfo.topImages;

      // 2.3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 2.4.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 2.5.获取商品信息
      this.detailInfo = data.detailInfo

      // // 2.6.保存参数信息
      // this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      // // 2.7.保存评论信息
      // if (data.rate.list) {
      //   this.commentInfo = data.rate.list[0];}
    });
  },
};
</script>

<style scoped>
#detail {
  /* 盖住mian nav  nav脱离了标准流*/
  position: relative;
  z-index: 9;
  background-color: #fff;
  /* 100%的视口高度 */
  /* height: 100vh; */
}
.content {
  height: 100vh;
  /* caculate 计算滚动的背景高度*/
  height: calc(100%-44px);
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>