<template>
	<div class="announcement news">
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>公告</el-breadcrumb-item>
		</el-breadcrumb>
		<ul>
			<router-link tag="li" v-for="(item, index) in List" class="clearfix" :to="{name: 'topic', query:{item: JSON.stringify(item)}}" :key=index>
				<el-tag type="primary"> {{ index+1 }} </el-tag>
				<strong :title="item.title">{{ item.title.length < 20 ? item.title : item.title.slice(0, 20) + '...' }}</strong>
				<p>
					<span>阅读:{{ item.views }}</span>
					<span>时间:{{ item.created_at }}</span>
				</p>
			</router-link>
			<router-link tag="li" :to="{name: 'hots', params: {value: '公告通知'}, query:{data: JSON.stringify(announcement)}}" class="clearfix">
				<span>更多...</span>
			</router-link>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'announcement',
	props: ['announcement'],
	computed: {
		List: function () {		//初始化公告列表
			return this.announcement.slice(0, 10);
		}
	}
}
</script>

<style>
.announcement{
	margin-bottom: 3.5rem;
	width: 100%;
}
.announcement li:last-child{
	border-bottom: none;
	text-align: right;
}
.announcement li p *{
	color: #999;
	font-size: 1rem;
}
.el-breadcrumb span{
	font-size: 1.4rem;
}
.announcement .el-tag{
	height: 2rem;
	width: 3rem;
	text-align: center;
}
</style>