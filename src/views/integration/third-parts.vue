<template>
    <Row style="padding:10px;">
        <Card class="third-part">
            <div style="text-align:center">
                <img src="../../images/icons/wechat.png" height="100">
                <h3>微信公众号</h3><br/>
                <div style="margin:10px;">
                    <i-switch v-model="settings.enable" size="large">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </i-switch>
                    <Button type="text" @click="showSettings(1)">设置</Button>
                </div>
            </div>
        </Card>

        <Modal
            v-model="settingsVisible"
            title="微信公众号"
            @on-ok="updateSettings">
            <Form :model="settings" label-position="left" :label-width="100">
                <Form-item label="回调地址">
                    <Input v-model="settings.webhook" disabled></Input>
                </Form-item>
                <Form-item label="开发者ID">
                    <Input v-model="settings.appId"></Input>
                </Form-item>
                <Form-item label="令牌">
                    <Input v-model="settings.token"></Input>
                </Form-item>
                <Form-item label="消息加解密密钥">
                    <Input v-model="settings.encodingKey"></Input>
                </Form-item>
                <Form-item label="启用服务">
                    <i-switch v-model="settings.enable" size="large">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </i-switch>
                </Form-item>
            </Form>
        </Modal>
        <!--<Card class="third-part">
            <div style="text-align:center">
                <img src="../../images/icons/facebook-messenger.svg" height="100">
                <h3>Facebook Messenger</h3><br/>
                <div style="margin:10px;">
                    <i-switch size="large">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </i-switch>
                    <Button type="text" @click="">设置</Button>
                </div>
            </div>
        </Card>-->
    </Row>
</template>

<script>

	export default {
        props: ['userSay'],
        data () {
            return {
                settingsVisible: false,
                settings: {},
                platforms: []
            }
        },
        computed: {
        },
        methods: {
            showSettings(platform){
                this.settingsVisible = true;
            },
            updateSettings(){

            }
        },
		components: {
			
		},
		mounted() {
            let agentId = this.$store.state.agent.id;
            this.$ajax.get('/v1/Integration/' + agentId)
                    .then(response => {
                        this.platforms = response.data;
                        this.settings = response.data[0];
                    });
            
		}
    }
</script>

<style scoped lang="less">  
    .third-part{
        width:250px;
        margin:10px;
        float:left;
        display:inline-block;
    }
</style>