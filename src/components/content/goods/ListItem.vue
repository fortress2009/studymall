<template>
  <div class="listItem">
    <!-- better-scroll 组件在图片加载完之前就计算了所有滚动图片的高度  而加载完的图片的高度
    是大于计算的高度的 所有会出bug  因此需要通过@load监听每次加载图片   加载好再home.vue里刷新计算高度 防止bug-->
    <img :src="listItem.show.img" alt 
    @load="imgLoad" 
    @click="goodClick"/>
    <div class="info">
      <p>{{listItem.title}}</p>
      <span class="price">{{listItem.price}}</span>
      <span class="collect">{{listItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "listItem",
  props: {
    listItem: {
      type: Object,
      default() {
        return Object;
      },
    },
  },
  methods: {
    imgLoad() {
      // 事件总线
      this.$bus.$emit("itemImgLoad");
    },
    goodClick(){
      // console.log('goodclick');
      //  设定跳转路径   拿到商品的数据
      //  将url 用+号拼接
      this.$router.push('/detail'+this.listItem.iid)
    }
  },
};
</script>

<style>
.listItem {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.listItem img {
  width: 100%;
  border-radius: 5px;
}
.info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.info .collect {
  position: relative;
}
.info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>