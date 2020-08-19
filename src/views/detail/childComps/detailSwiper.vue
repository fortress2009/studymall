<template>
  <div class="detail">
    <swiper class="details">
      <swiper-item  v-for="(item,index) in topImages" :key="index">
          <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from "@/components/common/swiper/Swiper";
import SwiperItem from "@/components/common/swiper/SwiperItem";
export default {
  name: "detailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style scoped>
.details{
    height: 350px;
    overflow: hidden;
}
</style>