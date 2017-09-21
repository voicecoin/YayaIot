<template>
    <div>
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
        props: ['agent'],
        data () {
            return {
				showConversation: false,
                loading: false
            }
        },
        computed: {
            conversationTitle() {
				return "正在和" + this.agent.name + "进行对话测试";
			}
        },
        methods: {
            redirect(path){
                this.$router.push({path: path});
            },
            start(){
                var agentId = this.agent.id;
                this.$ajax.get('/v1/Conversation/' + agentId)
                    .then(response => {
                        this.showConversation = true;
                        this.$store.state.conversation.id = response.data;
                    });
                this.$refs.conversation.reset();
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