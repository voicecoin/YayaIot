<template>
    <Row>
        <chatMessage :messages="session.messages"></chatMessage>
        <chatText :messages="session.messages" ref="textMessage"></chatText>
    </Row>
</template>

<script>
import text from './text.vue';
import message from './message.vue';

export default {
	data () {
		return {
			session: {
				messages:[]
			}
		}
	},
    methods: {
        reset(){
            this.session.messages = [];
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