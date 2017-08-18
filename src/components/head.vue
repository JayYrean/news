<template>
	<div class="top">
		<top-image :image-list="imageList"></top-image>
		<div class="nav">
			<ul>
				<li v-for="(item, index) in navList" :class="index==0?'active':'animate'" @click="change(index)">
					<router-link  :to="index==0?{path: '/'}:{name: 'nav', params:{value: item}, query:{dataList: JSON.stringify(dataList)}}"> {{ index == 0? '首页':'类型'+ index }} </router-link>
				</li>
			</ul>
		</div>
		<div class="timeSearch">
			<p>欢迎！现在是 <span>{{ time }}</span></p>
			<div>
				<el-input placeholder="search" icon="search" v-model="filterKey">
				    <template slot="prepend">站内搜索</template>
				</el-input>
			</div>
		</div>
	</div>
</template>

<script>
import topImage from './topImage'

export default {
	name: 'top',
	props: ['navList', 'imageList', 'dataList'],
	data: function () {
		return {
			time: '',
			filterKey: ''
		}
	},
	components:{
		topImage
	},
	created: function () {
		var that = this;
		that.time = that.getTime();
		setInterval(function(){
			that.time = that.getTime();
		}, 1000);
	},
	computed: {
    	value: function () {
     		return this.$route.params.value;
   		}
	},
	methods: {
		getTime: function () {		//得到当前时间
			var date = new Date(),
				M = date.getMonth() + 1,
				week = date.getDay(),
				h = date.getHours(),
				m = date.getMinutes(),
				s = date.getSeconds();
			switch(week){
				case '0': 
					week = '星期天';
					break;
				case '1':
					week = '星期一';
					break;
				case '2':
					week = '星期二';
					break;
				case '3':
					week = '星期三';
					break;
				case '4':
					week = '星期四';
					break;
				case '5':
					week = '星期五';
					break;
				case '6':
					week = '星期六';
					break;
			}
			var str = date.getFullYear() + '年' + M + '月' + date.getDate() + '日' + ' ' + this.setZero(h) + ':' + this.setZero(m) + ':' + this.setZero(s);
			return str;
		},
		setZero: function(num){		//当小时 分钟 秒 只有一位数时前插一个0
			var str = num + '';
			if(num>=0 && num<=9){
				str = '0' + num;
			}
			return str;
		},
		change: function (index) {		//改变确定点击的导航栏 改变点击导航条的class
			var aLi = document.getElementsByClassName('nav')[0].getElementsByTagName('li');
			for(var i=0,len=aLi.length;i<len;i++){
				aLi[i].className = 'animate';
			}
			aLi[index].className = 'active';
		},
		reset: function () {		//重置输入框
			this.filterKey = '';
		}
	},
	watch: {
	    value: function (val, oldval){
	    	if(this.$route.path == '/'){	//检测路径当路径为 / 时将首页的class设置成active
	       		this.change(0);
	    	}
	    },
	    filterKey: function (val, oldval) {
	    	var that = this;
	    	if(val){
	    		this.$router.push({name: 'search', params: {filterKey: val}, query: {dataList: JSON.stringify(that.dataList)}});
	    	}else{
	    		this.reset();
	    		this.$router.push({path: '/'});
	    	}
	    }
	}
}
</script>

<style>
.topImage{
	width: 100%;
}
.nav{
	background: #1276d9;
	display: flex;
	justify-content: center;
	margin: -1px;
}
.nav ul{
	display: flex;
	justify-content: space-around;
	width: 70%;
}
.nav ul li{
	/*border-bottom: 1px solid green;*/
	line-height: 4rem;
	width: 7rem;
}
.nav li a{
	color: #fff;
	display: inline-block;
	font-size: 1.4rem;
	width: 100%;
}
.timeSearch{
	/* box-shadow: 0px 0px 2px rgba(0, 0, 50, 1); */
	display: flex;
	font-size: 1.6rem;
	justify-content: space-between;
	line-height: 3.4rem;
	margin: 1rem auto;
	padding: 0px 4px;
	width: 70%;
}
.timeSearch div input{
	font-size: 1.4rem;
	height: 3rem;
}
</style>