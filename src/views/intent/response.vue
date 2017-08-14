<template>
    <Row>
        <Tabs value="defaultPlatform">
            <Tab-pane label="默认平台" name="defaultPlatform">
                <Card v-for="message in messages" style="text-align:center;">
                    <p slot="title">文本回复</p>
                    <ol style="margin-bottom:10px;">
                        <li v-for="speech in message.speeches">
                            <div class="ivu-input" contenteditable=true>{{speech}}</div>
                            <Button type="ghost" @click="handleRemove(message.speeches, speech)">删除</Button>
                        </li>
                    </ol>
                    <Button type="dashed" @click="handleAdd(message.speeches)" icon="plus-round">新增</Button>
                </Card>
            </Tab-pane>
            <Tab-pane label="微信公众号" name="name2">微信公众号</Tab-pane>
            <Tab-pane label="Facebook Messenger" name="name3">Facebook Messenger</Tab-pane>
        </Tabs>
        <Button type="ghost" style="margin-top:10px;" @click="addTextMessage(messages)">新增文本回复</Button>
    </Row>
</template>

<script>
    export default {
        props: ['messages'],
        methods: {
			handleAdd(speeches){
                speeches.push("");
				//this.messages.push({});
			},
            handleRemove(speeches, speech){
                speeches.remove(speech);
            },
            addTextMessage(messages){
                messages.push({speeches: []});
            }
        }
    }
</script>

<style scoped>  
    .ivu-input{
        width:90%;
        font-size:13px;
    }
    .ivu-card-head{
        background-color: '#f8f8ff' !important;
    }
</style>