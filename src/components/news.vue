<template>
	<div class="news" id="allNews">
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>全部</el-breadcrumb-item>
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
	name: 'newsAll',
	props: ['dataList'],
	data: function () {
		return {
			currentPage: 1,
			num: 23
		}
	},
	computed: {
		List: function(){
			var that = this;
			var start = (this.currentPage-1)*this.num,
				end = this.currentPage*this.num;
			return this.dataList.sort( that.compare('created_at') ).slice(start, end);
		},
		totalNum: function(){
			return this.dataList.length;
		}
	},
	methods: {
		compare: function(property){ 	//同navResult的compare
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
.news{
	box-shadow: 0px 0px 4px rgba(204, 204, 204, 1);
	padding: 15px 20px;
}
.news{
	width: 40%;
	font-size: 1.2rem;
}
.news .el-breadcrumb{
	border-bottom: 1px dashed #ccc;
	border-radius: 3px;
	padding-bottom: 0.8rem;
}
.news div p{
	border-bottom: 1px dashed #ccc;
	font-size: 1.4rem;
	padding: 4px 6px;
	text-align: left;
}
.news ul li{
	border-bottom: 1px dashed #ccc;
	color: #555;
	line-height: 3rem;
	text-align: left;
}
.news li:hover{
	color: #999;
	cursor: pointer;
}
.news li *{
	font-size: 1.2rem;
}
.news li p{
	border: none;
	float: right;
}
.news li strong{
	margin-left: 5px;
}
.news li p * {
	color: #999;
	font-size: 1rem;
}
.news li .el-tag{
	height: 2rem;
	width: 4rem;
	text-align: center;
}
.pages{
	margin-top: 1.6rem;
}
</style>