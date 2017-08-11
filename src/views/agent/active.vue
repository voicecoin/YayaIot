<template>
    <Row class="active-agent">
        <p style="margin-top:50px;margin-bottom:10px;">
            <img v-if="agent.avatar" :src="agent.avatar" style="width:60%;"/>
            <img v-else src="../../images/bot.png" style="width:60%;"/>
        </p>
        <Dropdown>
            <Button type="primary">
                {{agent.name}}
                <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list">
                <Dropdown-item v-for="item in agents">{{item.name}}</Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
    </Row>
</template>
<script>
	
    export default {
        data(){
			return {
				
			}
		},
        computed: {
            agent () {
                return this.$store.state.agent;
            },
            agents() {
                return this.$store.state.agents;
            }
        },
		mounted() {
			//let userId = this.$store.getters.user.id;//this.$route.query.agentId;
            this.$store.commit('refreshAgents');
		}
    }
</script>

<style scoped lang="less">
    .active-agent{
		color: white;
        margin-top: 20px;
    }
</style>