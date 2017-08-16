<template>
    <div>
        <Row>
            <Col span="8">&nbsp;</Col>
            <Col span="12">
                <Steps :current="current">
                    <Step title="基本信息" content="机器人基本信息"></Step>
                    <Step title="头像" content="上传机器人头像"></Step>
                    <Step title="完成" content="创建成功"></Step>
                </Steps>
            </Col>
            <Col span="4">&nbsp;</Col>
        </Row>

        <Row v-if="current==0" style="margin:20px;min-height:400px;">
            <Col>
                <Form v-if="agent" :model="agent" :label-width="80">
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
        </Row>

        <Row v-if="current==1" type="flex" justify="center" style="margin:20px;min-height:400px;text-align:center;">
            <Col v-if="agent">
                <!--<div>
                    <img v-if="agent.avatar" :src="agent.avatar"/>
                    <img v-else src="../../images/bot.png"/>
                </div>-->
                <vue-avatar
                    :width="160"
                    :height="160"
                    ref="vueavatar"
                    @vue-avatar-editor:image-ready="onImageReady"
                    :image="agent.avatar"></vue-avatar>
                
                <vue-avatar-scale
                    ref="vueavatarscale"
                    @vue-avatar-editor-scale:change-scale="onChangeScale"
                    :width="250"
                    :min="1"
                    :max="5"
                    :step="0.1"></vue-avatar-scale>
            </Col>
        </Row>

        <Row v-if="current==2" type="flex" justify="center" style="margin:20px;min-height:400px;">
            <Col v-if="agent" style="text-align:center;">
                <h3>机器人创建成功</h3>
                <div style="margin:20px;">
                    <img v-if="agent.avatar" :src="agent.avatar"/>
                    <img v-else src="../../images/bot.png"/>
                </div>
                <p style="margin:10px;">您的物联网设备专属机器人创建成功，可以开始定制用户词库和设置意图。</p>
            </Col>
        </Row>

        <Row type="flex" justify="center">
            <i-button v-if="current>0 && current<2" type="ghost" @click="previous" style="margin-right:10px;">前一步</i-button>
			<i-button v-if="current<1" type="primary" @click="next">下一步</i-button>
			<i-button v-if="agent != null && agent.id == null && current == 1" type="primary" @click="create">创建</i-button>
            <i-button v-if="current == 2" type="ghost" @click="goto('/intent/intents')" style="margin-right:10px;">添加意图</i-button>
            <i-button v-if="current == 2" type="ghost" @click="goto('/entity/entity-types')">自定义词库</i-button>
        </Row>
    </div>
</template>
<script>
    import VueAvatar from '../../components/vue-avatar.vue'
    import VueAvatarScale from '../../components/vue-avatar-scale.vue'
    import avatar from '../../images/bot.png';

    export default {
        data(){
            return {
                agent: null,
                avatar: avatar,
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
            },
            create() {
                this.agent.avatar = this.$refs.vueavatar.getImageScaled().toDataURL()
                this.$ajax.post('/v1/Agents', this.agent)
                    .then(response => {
                        this.agent = response.data;
                        this.current = 2;
                        this.$store.state.agents.push(this.agent);
                        this.$store.commit('setAgentId', this.agent.id)
                        this.$Message.info("创建成功");
                    });  
            },
            goto(path) {
                this.$router.push(path);
            },
            onImageReady(){
                this.agent.avatar = this.$refs.vueavatar.getImageScaled().toDataURL();
            },
            onChangeScale (scale) {
                this.$refs.vueavatar.changeScale(scale);
            }
        },
        mounted() {
            this.$ajax.get('/v1/Agents')
                .then(response => {
                    this.agent = response.data;
                });
        },
        components: {
            "vue-avatar": VueAvatar,
            "vue-avatar-scale": VueAvatarScale
        }
    }
</script>