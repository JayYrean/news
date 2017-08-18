<template>
  <div id="app">
    <top :nav-list="navList" :image-list="imageList" :data-list="dataList"></top>
    <router-view></router-view>
    <div class="split"></div>
    <div class="link">
      <other-link></other-link>
    </div>
    <div class="footer">
      written by Jayyou©
    </div>
  </div>
</template>

<script>
import top from './components/head'
import news from './components/news'
import otherLink from './components/otherLink'

export default {
  name: 'app',
  data: function () {
    return {
        dataList: [],
        navList: ['*'],
        imageList: [],
        hidden: true
      }
  },
  components: {
    top,
    otherLink,
    news
  },
  created: function () {
    var that = this;
    eventBus.$on('getdata', function (msg) {  //利用全局Vue实例传输数据，获取从main.vue传过来的数据并进行分类
      that.dataList = JSON.parse(msg);
      var i = 0;
      for(var item in that.dataList){
        if(that.navList.indexOf(that.dataList[item].type_id) === -1){
          that.navList.push(that.dataList[item].type_id);
        }
        if(that.showImage(that.dataList[item])){
          that.imageList.push(that.dataList[item]);
        }
      }
    }.bind(this));
  },
  methods: {
    showImage: function (item) {  //确定图片路劲是否正确
      var reg = /.*(.jpg|.jpeg|.gif|.bmp|.png)$/g;
      var result = true;
      if(!reg.test(item.img_url)){
        result = false;
      }
      return result;
    }
  },
  beforeDestroy () {             //清除全局Vue实例的getdata方法
    eventBus.$off('getdata');
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  padding: 0px;
  margin: 0px;
  font-size: 62.75%;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
body{
  width: 100%;
}
li{
  list-style: none;
}
a{
  text-decoration: none;
}
img{
  display: block;
}
clearfix::before, clearfix::after{
  content: "";
  display: block;
  clear: both;
}
.animate:not(.active)::after{
  /* background: #5FB878; */
  background: skyblue;
  content: "";
  display: block;
  height: 3px;
  opcity: 0;
  transition-property: opcity;
  transition-duration: .3s;
  width: 0px;
  transition-property: width;
  transition-duration: .3s;
}
.animate:hover{
  cursor: pointer;
}
.animate:hover::after{
  opcity: 1;
  width: 100%;
}
.active{
  /* box-shadow: 0px 0px 3px rgba(18, 118, 217, 1); */
  background: rgba(50, 130, 230, 0.8);
  border-bottom: 3px solid skyblue;
}
div.split{
  border: 1px dashed #ccc;
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 1);
  margin-top: 2rem;
  width: 100%;
}
.sideNews{
  width: 25%;
  margin-left: 5%;
}
.footer{
  background: #1815EB;
  color: #fff;
  font-size: 1.6rem;
  line-height: 5rem;
  width: 100%;
  text-align: center;
}
</style>
