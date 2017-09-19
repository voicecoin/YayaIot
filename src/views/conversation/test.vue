<template>
    <div>
        <Button v-if="agentId" type="primary" @click="startConversation" icon="chatbox" style="margin-top:10px;">对话测试</Button>
        <Modal v-model="showConversation">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="chatbox"></Icon>
                <span>{{conversationTitle}}</span>
            </p>
            <div>
                <converation ref="conversation"></converation>
            </div>
            <div slot="footer">
                <Button type="ghost" :loading="loading" @click="resetConversation">重置</Button>
                <Button type="primary" :loading="loading" @click="sendText">发送</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import converation from './window.vue';

    export default {
        data () {
            return {
				showConversation: false,
                loading: false
            }
        },
        computed: {
            conversationTitle() {
				return "正在和" + this.$store.state.agent.name + "进行对话测试";
			},
            agentId(){
                return this.$store.state.agent.id;
            }
        },
        methods: {
            redirect(path){
                this.$router.push({path: path});
            },
            startConversation(){
                var agentId = this.$store.state.agent.id;
                this.$ajax.get('/v1/Conversation/' + agentId)
                    .then(response => {
                        this.showConversation = true;
                        this.$store.state.conversation.id = response.data;
                    });
            },
            sendText(){
                this.loading = true;
                this.$refs.conversation.sendMessage();
                setTimeout(() => {
                    this.loading = false;
                }, 500);
            },
            resetConversation(){
                let conversationId = this.$store.state.conversation.id;
                this.$ajax.get('/v1/Conversation/' + conversationId + '/Reset')
                    .then(response => {
                        this.$Message.info("重置会话成功");
                    });
            }
        },
		components: {
            converation
		}
    }
</script>

<style scoped>

  
</style>