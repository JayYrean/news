<template>
  <el-carousel :interval="4000" indicator-position="none" arrow="hover" height="10rem">
    <el-carousel-item v-for="(item, index) in images" :key="index">
      <router-link :to="{name: 'topic', query:{item: JSON.stringify(item)}}"><img :src="item.img_url" /></router-link>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'topImage',
  props: ['imageList'],
  computed: {
    totalImg: function () {
      return this.imageList.length > 5 ? 5 : this.imageList.length;
    },
    images: function () {   //初始化轮播图列表
      var that = this;
      return this.imageList.sort( that.compare('views', 'created_at') ).slice(0, that.tatolImg);
    }
  },
  methods: {
    compare: function(property1, property2){  //利用闭包返回一个函数使sort可以根据对象某个属性进行排序，这里是先根据property1降序排序相等时再根据property2进行降序排序。
      return function(a, b){
        var result = 1;
        if(Number(a[property1] <= b[property1])){
            a[property2] > b[property2] ? result = -1 : a[property2] == b[property2] ? result = 0 : result = 1;
        }
        return result;
      }
    }
  }
}
</script>
<style>
  .el-carousel{
    height: 10rem;
  }
  .el-carousel__container{
    height: 10rem;
  }
  .el-carousel__item {
    height: 10rem;
  }
  .el-carousel__item img{
    width: 100%;
    height: 100%;
  }
</style>