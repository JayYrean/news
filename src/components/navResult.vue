<template>
	<div class="news" id="navResult">
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
			</router-link>
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
	name: 'navResult',
	data: function () {
		return {
			dataArr: [],
			result: [],
			currentPage: 1,
			num: 21
		}
	},
	created: function () {
		this.dataArr = JSON.parse(this.$route.query.dataList);
	},
	computed: {
		List: function () {
			var that = this,
				start = (this.currentPage-1)*this.num,
				end = this.currentPage*this.num;
			that.result = [];
			that.dataArr.map(function(item){
				if(item.type_id == that.$route.params.value){
					that.result.push(item);
				}
			});
			return that.result.sort( that.compare('created_at') ).slice(start, end);
		},
		value: function () {
			return this.$route.params.value;
		},
		totalNum: function () {
			return this.result.length;
		}
	},
	methods: {
		compare: function(property){		//同main.vue里的compare以及topImage里的compare
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
#navResult{
	margin: 1rem auto;
	width: 75%;
}
</style>