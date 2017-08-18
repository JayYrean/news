<template>
	<div class="topic">
		<h1>{{ item.title }}</h1>
		<p>浏览次数: {{ item.views }}&nbsp;&nbsp;&nbsp;时间: {{ item.created_at }}</p>
		<div class="img">
			<img :src="item.img_url" v-if="showImage" />
			<p>{{ item.content }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'topic',
	computed: {
		item: function () {
			return JSON.parse(this.$route.query.item);
		}
	},
	methods: {
		showImage: function (item) {	//确定是否为图片
    		var reg = /.*(.jpg|.jpeg|.gif|.bmp)$/g;
    		var result = true;
    		if(!reg.test(item.img_url)){
        		result = false;
    		}
    		return result;
    	}
	}
}
</script>

<style>
.topic{
	box-shadow: 0px 0px 4px rgba(204, 204, 204, 1);
	padding: 15px 20px;
	margin: 1rem auto;
	width: 60%;
}
.topic h1{
	font-size: 2rem;
	padding: 1rem 0.8rem;
}
.topic p:first-of-type{
	font-size: 1rem;
	color: #999;
}
.img::before,.img::after{
	content: '';
	display: block;
	clear: both;
}
.img p{
	text-indent: 2rem;
}
.topic .img p{
	color: #444;
	font-size: 1.6rem;
	text-align: left;
	width: 100%;
}
.img>img{
	float: left;
	width: 120px;
}
</style>