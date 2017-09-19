<template>
    <div class="layout">
        <Row class="layout-header" type="flex" align="middle">
            <Col span="4">
                <div class="layout-logo-left"><img src="../images/iot-logo.png" style="height:60px;margin-left:10%;margin-top:5px;"/></div>
            </Col>
            <Col span="16" class="layout-ceiling-main">
                <Icon type="home" size="16"></Icon><a href="/">首页</a>
                <a href="http://forum.yaya.ai" target="_blank">聊天机器人论坛</a>
                <a href="/">开发文档</a>
            </Col>
            <Col span="4" style="text-align:right;">
                <userStatus></userStatus>
            </Col>
        </Row>
        <Row style="height:100%;">
            <Col :xs="6" :sm="5" :md="4" :lg="3" class="layout-menu-left">
                <Menu theme="dark" width="auto" active-name="/agent/agents" @on-select="redirect">
                    
                    <!--<Menu-item name="dashboard">
                        <Icon type="ios-keypad" :size="iconSize"></Icon>
                        <div class="layout-text" @click="openMenu('dashboard', '/dashboard')">仪表盘</div>
                    </Menu-item>-->
                    <Menu-item name="/agent/agents">
                        <Icon type="outlet" size="24"></Icon>
                        <span class="layout-text">机器人&nbsp;&nbsp;</span>
                    </Menu-item>
                    <Menu-item name="/faq/corpus">
                        <Icon type="android-wifi" size="24"></Icon>
                        <span class="layout-text">快速问答</span>
                    </Menu-item>
                    <Menu-item name="/intent/intents">
                        <Icon type="pull-request" size="24"></Icon>
                        <span class="layout-text">任务意图</span>
                    </Menu-item>
                    <Menu-item name="/entity/entity-types">
                        <Icon type="ios-book" size="24"></Icon>
                        <span class="layout-text">词库管理</span>
                    </Menu-item>
                    <!--<Menu-item name="/hotword/training">
                        <Icon type="ios-pulse" size="24"></Icon>
                        <span class="layout-text">热词训练</span>
                    </Menu-item>
                    <Menu-item name="/chat/window">
                        <Icon type="ios-chatboxes" size="28"></Icon>
                        <span class="layout-text">会话管理</span>
                    </Menu-item>-->
                    <Menu-item name="/integration/third-parts">
                        <Icon type="usb" size="28"></Icon>
                        <span class="layout-text">系统集成</span>
                    </Menu-item>
                    <Menu-item name="/account/settings">
                        <Icon type="person" size="24"></Icon>
                        <span class="layout-text">账户设置</span>
                    </Menu-item>
                </Menu>

                <activeAgent v-if="agentId"></activeAgent>
                <conversationTest v-if="agentId"></conversationTest>

            </Col>

            <Col :xs="18" :sm="19" :md="20" :lg="21" style="height:100%;">
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="/">首页</Breadcrumb-item>
                        <Breadcrumb-item>我的机器人</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                        <router-view class="layout-content-main"></router-view>
                </div>
                <div class="layout-copy">
                    © 2012-2017 YayaBot — 深圳爱用科技有限公司
                </div>
            </Col>
        </Row>

    </div>
</template>

<script>
    import active from './agent/active.vue';
    import userStatus from './account/user-status.vue';
    import conversationTest from './conversation/test.vue';

    export default {
        data () {
            return {

            }
        },
        computed: {
            agentId(){
                return this.$store.state.agent.id;
            }
        },
        methods: {
            redirect(path){
                this.$router.push({path: path});
            }
        },
		components: {
            activeAgent: active,
            userStatus,
            conversationTest
		}
    }
</script>

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height:100%;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 500px;
        margin: 15px;
        overflow: auto;
        background: #fff;
        border-radius: 4px;
        
    }
    .layout-content-main{
        padding: 10px;
        height:100%;
    }
    .layout-copy{
        text-align: center;
        height:10%;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
		text-align: center;
        padding-top: 50px;
        height: 100%;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        text-align: center;
    }
    .layout-ceiling-main{
        text-align: center;
    }
    .layout-ceiling-main a{
        color: black;
        font-size: 16px;
        margin-left: 10px;
    }
    .layout-right{
        background: #464c5b;
        height: 100%;
    }
    .layout-hide-text .layout-text{
        display: inline-block;
    }
    .layout-text{
        font-size: 15px;
        margin-right: 20%;
        float: right;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
</style>