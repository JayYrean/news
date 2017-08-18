<template>
	<div class="news" id="hots">
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{ value }}</el-breadcrumb-item>
		</el-breadcrumb>
		<ul>
			<router-link tag="li" v-for="(item, index) in List" class="clearfix" :to="{name: 'topic', query:{item: JSON.stringify(item)}}" :key="index">
				<el-tag type="primary" :title="item.type_id"> {{ item.type_id.length <= 3 ? item.type_id : item.type_id == 4? item.type_id : item.type_id.slice(0, 3) + '..' }} </el-tag>
				<strong :title="item.title">{{ item.title.length < 50 ? item.title : item.title.slice(0, 50) + '...' }}</strong>
				<p>
					<span>阅读:{{ item.views }}</span>
					<span>时间:{{ item.created_at }}</span>
				</p>
			</router-link>>
		</ul>
		<div class="pages">
		    <el-pagination
      			@current-change="handleCurrentChange"
		    	:current-page.sync="currentPage"
		    	:page-size="num"
		     	layout="prev, pager, next, jumper"
		      	:total="totalNum">
		    </el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	name: 'hots',
	data: function () {
		return {
			dataArr: [],
			currentPage: 1,
			num: 21
		}
	},
	created: function () {
		this.dataArr = JSON.parse(this.$route.query.data); 		//获取通过路由传过来的数据dataList
	},
	computed: {
		List: function () {
			var start = (this.currentPage-1)*this.num,
				end = (this.currentPage)*this.num;
			return this.dataArr.slice(start, end);
		},
		value: function () {		//获取路由传过来的新闻类型
			return this.$route.params.value;
		},
		totalNum: function () {
			return this.dataArr.length;
		}
	},
	methods: {
		compare: function(property){	//同navResult的compare
			return function(a,b){
				var result = -1;
				if(Number(a[property] <= b[property])){
					result = 1;
				}
				return result;
			}
		},
		handleCurrentChange: function(val){
			// console.log(this.currentPage);
		}
	}
}

</script>

<style>
#hots{
	margin: 1rem auto;
	width: 75%;
}
</style>