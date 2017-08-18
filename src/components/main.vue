<template>
<div class="home">
	<div class="main">
		<news :data-list="dataList"></news>
		<div class="sideNews">
			<announcement :announcement="announcementList"></announcement>
			<hotNews :hot-list="hotList"></hotNews>
		</div>
	</div>
</div>
</template>

<script>
import news from './news'
import hotNews from './hotNews'
import announcement from './announcement'

export default {
	name: 'home',
	components: {
    	news,
    	hotNews,
    	announcement
	},
	data: function () {
		return {
			dataList: [],
			hotList: [],
	        announcementList: [],
	        newsType: 1,
	        start: 1,
	        end: 50
		}
	},
	created: function() {		//利用aioxs获取数据并初始化数据
	    var that = this;
	    this.$ajax.get('http://118.89.37.216/api/news_list/skip/1/take/999999').then(function(response){
	    	that.dataList = response.data;
	    	for(var item in that.dataList){
	        	if(that.dataList[item].type_id == that.newsType){
	       			that.announcementList.push(that.dataList[item]);
	        	}
	      	}
	    	that.hotList = that.dataList.sort(that.compare('views'));
	    	eventBus.$emit("getdata", JSON.stringify(that.dataList));	//利用全局Vue进行数据传输
	    }).catch(function(error){
	    	console.log(error);
	    });
	},
	methods: {
	    compare: function(property){	//利用闭包返回一个函数使sort可以对对象的某个属性进行排序
	    	return function(a, b){
	        	return Number(a[property] > b[property]);
	    	}
	    }
	}
}
</script>
<style>
.main{
	display: flex;
	justify-content: center;
	padding-top: 0.8rem;
}
</style>