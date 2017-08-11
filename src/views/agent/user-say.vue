<template>
	<Card style="width:60%;" class="expression">
        <div>
            <div class="addUserSay">
				<Input v-model="text" placeholder="请输入用户表达方式...">
					<Button slot="prepend" type="text" icon="quote"  style="border-radius:0px;"></Button>
					<Button slot="append" icon="checkmark"  style="border-radius:0px;" @click="addUserSay"></Button>
				</Input>			
			</div>
			<Table :columns="columns" :data="params"></Table>
        </div>
    </Card>
</template>

<script>
	import {HTTP} from '../../libs/http-common';
	
	export default {
        data () {
            return {
                text: '北京天气怎么样',
				columns: [{
                        title: '参数名',
                        key: 'alias'
                    },
                    {
                        title: '实体分类',
                        key: 'dataType'
                    },
                    {
                        title: '实体抽取',
                        key: 'text'
                    }],	
				params: []
            }
		},
		
		methods:{
			addUserSay(){
				HTTP.get('/v1/Intents/Markup?text=' + this.text)
					.then(response => {
						for (var i = 0; i < response.data.length; i++) { 
							if(response.data[i].dataType) this.params.push(response.data[i]);
						}
					})
					.catch(e => {
					  this.$Message.error(e.response.data.message);
					})
			}
		}
	}
</script>

<style scoped lang="less">
    .expression{
		margin: 10px;
		padding: 10px;
		display: inline-block;
    }
	.ivu-input-group-append{
		border-radius: 0px;
	}
	.addUserSay{
		/*margin-bottom:10px;*/
	}
</style>