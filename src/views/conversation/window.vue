<template>
    <Row>
        <chatMessage :messages="session.messages"></chatMessage>
        <chatText :messages="session.messages" ref="textMessage"></chatText>
    </Row>
</template>

<script>
import text from './text.vue';
import message from './message.vue';

let defaultMessage = {
                self: false,
                date: new Date(),
                content: "请问有什么需要帮助的？"
            };

export default {
	data () {
		return {
			session: {
				messages:[defaultMessage]
			}
		}
	},
    methods: {
        reset(){
            this.session.messages = [defaultMessage];
        },

        sendMessage(){
            this.$refs.textMessage.sendMessage();
        }
    },
    mounted(){

    },
	components: {
		chatText: text,
        chatMessage: message
	}
};
</script>