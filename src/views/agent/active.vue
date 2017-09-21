<template>
    <Row class="active-agent">
        <p style="margin-top:50px;margin-bottom:10px;">
            <img v-if="agent.avatar" :src="agent.avatar" style="width:50%;"/>
            <img v-else src="../../images/bot.png" style="width:50%;"/>
        </p>
        <Button type="primary" @click="startConversation" icon="chatbox">{{agent.name}}</Button>
        <!--<Dropdown trigger="click" @on-click="switchAgent">
            <Button type="primary">
                {{agent.name}}
                <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list">
                <Dropdown-item v-for="item in agents" :name="item.id">{{item.name}}</Dropdown-item>
            </Dropdown-menu>
        </Dropdown>-->
        <conversationTest ref="conversation" :agent="agent"></conversationTest>
    </Row>
</template>
<script>
	import conversationTest from '../conversation/test.vue';

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
        methods:{
            switchAgent(agentId){
                this.$store.commit("setAgentId", agentId);
            },
            startConversation(){
				this.$refs.conversation.start();
			}
        },
		mounted() {
			//let userId = this.$store.getters.user.id;//this.$route.query.agentId;
            this.$store.commit('refreshAgents');
		},
		components: {
            conversationTest: conversationTest
		}
    }
</script>

<style scoped lang="less">
    .active-agent{
		color: white;
        margin-top: 20px;
    }
</style>