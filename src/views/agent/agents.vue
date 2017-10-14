<template>
	<div>
		<Card v-for="item in items" class="agent">
			<Row type="flex" justify="center" align="top">
				<Col span="8" style="text-align:center;">
					<div v-if="item.avatar">
						<img :src="item.avatar" style="width:60%;">
						<h4>免费版</h4>
					</div>
					<div v-else style="text-aligh:center;">
						<img v-if="item.id" src="../../images/bot.png" style="width:60%;">
						<img v-else src="../../images/int_01.png" style="width:60%;">
					</div>
				</Col>
				<Col span="16">
					<Row style="height:150px;text-align:center;">
						<div v-if="item.id">
							<h3>{{item.name}}</h3>
							<p>{{item.description}}</p>
							<p>生日：{{item.birthday}}<p/>
						</div>
						<div v-else>
							<h3>&nbsp;</h3>
							<p>还没有自己的对话机器人？</p>
						</div>
					</Row>
				</Col>
			</Row>
			<Row type="flex" justify="center">
				<ButtonGroup>
					<Button v-if="item.id" type="ghost" @click="handleAgentDetail(item.id)" icon="ios-gear">设置</Button>
					<Button v-if="item.id" type="ghost" @click="startConversation(item.id)" icon="chatbox">测试</Button>
					<Button v-if="item.id" type="ghost" icon="share" disabled>分享</Button>
				</ButtonGroup>
				<Button v-if="item.id==null" type="primary" @click="handleAgentCreate" icon="plus">创建机器人</Button>
			</Row>
		</Card>

		<conversationTest ref="conversation" :agent="agent"></conversationTest>
	</div>
</template>

<script>
	import conversationTest from '../conversation/test.vue';
	
    export default {
        data () {
            return {
                items: []
            }
        },
        computed: {
            agent() {
                return this.$store.state.agent;
            }
        },
		methods: {
			handleAgentDetail(agentId){
				this.$router.push('/agent/agent?agentId=' + agentId);
				//this.$route.query.agentId = agentId;
				this.$store.commit('setAgentId', agentId)
			},
			handleAgentCreate(){
				this.$router.push('/agent/create');
			},
			startConversation(agentId){
				this.$store.commit('setAgentId', agentId);
				this.$refs.conversation.start();
			}
		},
		created() {
			let userId = this.$store.getters.user.id;
			this.$ajax.get('/v1/Agents/' + userId + '/Query')
				.then(response => {
					this.items = response.data.items;
					this.items.push({});
				});
		},
		components: {
            conversationTest: conversationTest
		}
    }
</script>

<style scoped lang="less">
    .agent{
        width:300px;
        display: inline-block;
		margin: 10px;
    }
</style>