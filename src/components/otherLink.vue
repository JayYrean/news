<template>
	<div class="otherLink">
		<p>--友情链接--</p>
		<div>
			<div>
				<span>校内链接:</span>
				<el-select v-model:value="value1" placeholder="请选择">
				    <el-option
				   	v-for="item in schoolLinks"
				    :key="item.value"
				    :label="item.label"
				    :value="item.value">
				    </el-option>
				</el-select>
			</div>
			<div>
				<span>其他链接:</span>
				<el-select v-model:value="value2" placeholder="请选择">
				    <el-option
				   	v-for="item in otherLinks"
				    :key="item.value"
				    :label="item.label"
				    :value="item.value">
				    </el-option>
				</el-select>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        schoolLinks: [{
        	value: 'http://www.hnuc.edu.cn/',
        	label: '湖南商学院官网'
        }, {
        	value: 'http://jwgl.hnuc.edu.cn/',
        	label: '湖南商学院教务系统'
        }, {
        	value: 'http://dmstudio233.com',
        	label: 'DM官网'
        }, {
        	value: 'http://www.baidu.com',
        	label: '百度',
	        link: ''
        }, {
        	value: 'http://www.google.com.hk',
        	label: '谷歌'
        }],
        otherLinks: [{
        	value: 'http://www.hnuc.edu.cn/',
	        label: '湖南商学院官网'
        }, {
	        value: 'http://jwgl.hnuc.edu.cn/',
	        label: '湖南商学院教务系统'
        }, {
	        value: 'http://dmstudio233.com',
	        label: 'DM官网'
        }, {
	        value: 'http://www.baidu.com',
	        label: '百度'
        }, {
	        value: 'http://www.google.com.hk',
	        label: '谷歌'
        }],
        value1: '',
        value2: ''
      }
    },
    watch: {
    	value1: function(val, oldval){
    		if(val != ''){
    			window.open(val);
    		}
    		this.value1 = '';
    	},
    	value2: function(val, oldval){
    		if(val != ''){
    			window.open(val);
    		}
    		this.value2 = '';
    	}
    }
  }
</script>

<style>
.otherLink{
	padding: 0px 0px 0px 1rem;
	margin: 1rem auto;
	text-align: left;
	width: 70%;
}
.otherLink>p{
	font-size: 1.6rem;
}
.otherLink>div{
	display: flex;
	justify-content: space-between;
	margin-top: 1rem;
	width: 100%;
}
.otherLink div span{
	font-size: 1.2rem;
}
</style>