<template>
    <Form :model="intent" :label-width="80">
        <Form-item label="名字">
            <Input v-model="intent.name" placeholder="意图名称"></Input>
        </Form-item>
        <Form-item label="描述">
            <Input v-model="intent.description" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="请输入意图描述..."></Input>
        </Form-item>
        <Form-item label="触发事件">
            <Tag v-for="event in intent.events" :key="event" :name="event" type="dot" closable @on-close="handleRemoveEvent(event)">{{event}}</Tag>
            <Input v-model="event" placeholder="添加事件，回车确认" @on-enter="handleAddEvent(intent.events)" style="width:150px;margin-right: 10px;"></Input>
        </Form-item>
        <Form-item label="传入上文">
            <Tag v-for="context in intent.contexts" :key="context" :name="context" type="dot" closable @on-close="handleRemoveContext(context)">{{context}}</Tag>
            <Input v-model="context" placeholder="添加上文，回车确认" @on-enter="handleAddContext(intent.contexts)" style="width:150px;margin-right: 10px;"></Input>
        </Form-item>
        <Form-item label="传出下文">
            <Tag v-for="context in intent.responses[0].affectedContexts" :key="context.name" :name="context.name" closable @on-close="handleRemoveAffectedContext(context.name)">
                <Tooltip content="状态有效期" placement="top">
                    <span contenteditable style="margin-right:5px;font-size:13px;font-weight:bold;">{{context.lifespan}}</span>
                </Tooltip>
                {{context.name}}
            </Tag>
            <Input v-model="affectedContext" placeholder="添加下文，回车确认" @on-enter="handleAddAffectedContext(intent.responses[0].affectedContexts)" style="width:150px;margin-right: 10px;"></Input>
        </Form-item>
    </Form>
</template>
<script>
    export default {
        props:['intent'],
        data(){
			return {
                context: null,
                affectedContext: null,
                event: null
			}
		},
        methods: {
			handleAddContext(contexts) {
                contexts.push(this.context);
                this.context = null;
            },
            handleAddAffectedContext(affectedContexts) {
                affectedContexts.push({name: this.affectedContext, lifespan: 5});
                this.affectedContext = null;
            },
            handleAddEvent(events) {
                events.push(this.event);
                this.event = null;
            }
        },
        computed: {

        },
		mounted() {

		}
    }
</script>

<style scoped lang="less">  
    .ivu-tag{
        height:32px;
        line-height:32px;
    }
</style>

