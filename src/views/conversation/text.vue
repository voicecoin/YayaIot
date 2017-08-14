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
                content: ''
            };
        },
        methods: {
            onKeyup (e) {
                if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
                    this.messages.push({
                        content: this.content,
                        date: new Date(),
                        self: true
                    });

                    let token = this.$store.state.agent.clientAccessToken;
                    let session = this.$store.state.user.id;
                    this.$ajax.get('/v1/Conversation?clientAccessToken=' + token + '&sessionId=' + session + '&text=' + this.content)
                        .then(response => {

                            this.messages.push({
                                content: response.data,
                                date: new Date(),
                                self: false
                            });
                            this.content = '';

                        });
                    

                }
            }
        }
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