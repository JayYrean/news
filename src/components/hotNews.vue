<template>
	<div class="news" id="hotNews">
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>热门新闻</el-breadcrumb-item>
		</el-breadcrumb>
		<ul>
			<router-link tag="li" v-for="(item, index) in hotList2" class="clearfix" :to="{name: 'topic', query:{item: JSON.stringify(item)}}" :key="index">
				<el-tag type="danger" v-if="index==0">{{ index+1 }}</el-tag>
				<el-tag type="warning" v-else-if="index==1">{{ index+1 }}</el-tag>
				<el-tag type="success" v-else-if="index==2">{{ index+1 }}</el-tag>
				<el-tag type="gray" v-else > {{ index+1 }} </el-tag>
				<strong :title="item.title">{{ item.title.length < 20 ? item.title : item.title.slice(0, 20) + '...' }}</strong>
				<p>
					<span>阅读:{{ item.views }}</span>
					<span>时间:{{ item.created_at }}</span>
				</p>
			</router-link>
			<router-link tag="li" :to="{name: 'hots',params: {value: '热门新闻'}, query:{data: JSON.stringify(hotList)}}" class="clearfix">
				<span>更多...</span>
			</router-link>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'hotNews',
	props: ['hotList'],
	computed: {
		hotList2: function () {		//初始化热门新闻列表
			return this.hotList.slice(0, 10);
		}
	}
}
</script>

<style>
#hotNews{
	width: 100%;
}
#hotNews li:last-child{
	border-bottom: none;
	text-align: right;
}
#hotNews li p *{
	color: #999;
	font-size: 1rem;
}
.el-breadcrumb span{
	font-size: 1.4rem;
}
#hotNews .el-tag{
	height: 2rem;
	width: 3rem;
	text-align: center;
}
</style>