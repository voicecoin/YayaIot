<template>
<div class="text">
    <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" @keyup="onKeyup"></textarea>
</div>
</template>

<script>
    export default {
        props:['messages'],
        data () {
            return {
                content: '天气'
            };
        },
        methods: {
            onKeyup (e) {
                if (e.ctrlKey && e.keyCode === 13) {
                    sendMessage(this);
                }
            },
            sendMessage(){
                sendMessage(this);
            }
        }
    };

    var sendMessage = function(vm){
        if(!vm.content.length) return;

        vm.messages.push({
            content: vm.content,
            date: new Date(),
            self: true
        });

        let token = vm.$store.state.agent.clientAccessToken;
        let conversationId = vm.$store.state.conversation.id;

        let text = vm.content;
        vm.content = '';

        vm.$ajax.get('/v1/Conversation?clientAccessToken=' + token + '&conversationId=' + conversationId + '&text=' + text)
            .then(response => {

                vm.messages.push({
                    content: response.data,
                    date: new Date(),
                    self: false
                });
                
            });
    };
</script>

<style lang="less" scoped>
.text {
    height: 20%;
    border-top: solid 1px #ddd;
    textarea {
        padding: 10px;
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
        font-family: "Micrsofot Yahei";
        resize: none;
    }
}
</style>