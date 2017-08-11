<template>
	<div>
		<Card v-for="item in items" class="agent">
			<Row type="flex" justify="center" align="top">
				<Col span="8" style="text-align:center;">
					<div v-if="item.avatar">
						<img :src="item.avatar" style="width:90%;">
						<h4>免费版</h4>
					</div>
					<div v-else style="text-aligh:center;">
						<img v-if="item.id" src="../../images/bot.png" style="width:90%;">
						<img v-else src="../../images/int_01.png" style="width:90%;">
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
							<p>还没有自己的物联网机器人？</p>
						</div>
					</Row>
					<Button v-if="item.id" type="ghost" @click="handleAgentDetail(item.id)">详细信息</Button>
					<Button v-else type="primary" @click="handleAgentCreate" icon="plus">创建机器人</Button>
				</Col>
			</Row>
		</Card>
	</div>
</template>

<script>

    export default {
        data () {
            return {
				agent: { },
                items: []
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
			}
		},
		created() {
			let userId = this.$store.getters.user.id;
			this.$ajax.get('/v1/Agents/' + userId + '/Query')
				.then(response => {
					this.items = response.data.items;
					this.items.push({});
				});
		}
    }
</script>

<style scoped lang="less">
    .agent{
        width:25%;
        display: inline-block;
		margin: 10px;
    }
</style>