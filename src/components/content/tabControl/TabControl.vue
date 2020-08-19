<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      class="tab-control-item"
      :class="{active: index === currentIndex}"
      @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      // 将当前点击index赋值给currentindex 改变样式
      this.currentIndex=index
      // 将当前点击传出去
      this.$emit('tabClick',index)
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
}
.tab-control-item {
  flex: 1;
  text-align: center;
  
}
.active {
  color: pink;
}
.active span{
  border-bottom: 3px solid pink;
  padding: 2px;
}
</style>