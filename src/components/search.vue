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
	name: 'search',
	data: function () {
		return {
			num: 21,
			currentPage: 1,
			totalNum: 1
		}
	},
	computed: {
		List: function () {	//初始化过滤列表
			var result = [],
				filterKey = this.$route.params.filterKey,
				dataList = JSON.parse(this.$route.query.dataList),
				start = (this.currentPage-1)*this.num,
				end = (this.currentPage)*this.num;
			for(var i=0,len=dataList.length;i<len;i++){		//当请求到的数据（dataList）中title、content、create_at含有用户输入的过滤信息则将dataList[i]保存
				if(dataList[i].title.indexOf(filterKey) != -1 || dataList[i].content.indexOf(filterKey) != -1 || dataList[i].created_at.indexOf(filterKey) != -1){
					result.push(dataList[i]);
				}
			}
			this.totalNum = result.length;
			console.log(result);
			return result.slice(start, end);		//当点击分页插件时this.currentPage发生改变会导致start和end发生改变使过滤列表的结果发生相应变化
		},
		value: function () {
			return this.$route.params.value;	//获取当前的新闻类型
		}
	},
	methods: {
		handleCurrentChange: function (){
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