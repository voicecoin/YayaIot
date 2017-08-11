<template>
    <div>
        <Row>
            <Col span="8">&nbsp;</Col>
            <Col span="12">
                <Steps :current="current">
                    <Step title="已完成" content="机器人基本信息"></Step>
                    <Step title="进行中" content="上传机器人头像"></Step>
                    <Step title="待进行" content="创建成功"></Step>
                </Steps>
            </Col>
            <Col span="4">&nbsp;</Col>
        </Row>
        <Row style="margin-top:50px;margin-bottom:50px;">
            <Col span="8">&nbsp;</Col>
            <Col span="8">
                <Form :model="agent" :label-width="80">
                    <Form-item label="名字">
                        <Input v-model="agent.name" placeholder="请输入机器人名字"></Input>
                    </Form-item>
                    <Form-item label="描述">
                        <Input v-model="agent.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入机器人的职责描述..."></Input>
                    </Form-item>
                    <Form-item label="语言">
                        <Select v-model="agent.language" placeholder="请选择">
                            <Option value="zh-cn">中文</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="是否公开">
                        <i-switch v-model="agent.isPublic"></i-switch>
                    </Form-item>
                </Form>
            </Col>
            <Col span="8">&nbsp;</Col>
        </Row>
        <Row>
            <Col span="14">&nbsp;</Col>
            <Col span="4">
                <i-button type="ghost" @click="previous">前一步</i-button>
                <i-button type="primary" @click="next">下一步</i-button>
            </Col>
            <Col span="6">&nbsp;</Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                agent:{
                    language: "zh-cn"
                },
                current: 0
            }
        },
        methods: {
            next () {
                if (this.current < 3) {
                    this.current += 1;
                }
            },
            previous () {
                if (this.current > 0) {
                    this.current -= 1;
                }
            }
        }
    }
</script>