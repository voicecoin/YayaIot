<style scoped lang="less">

</style>

<template>
    <Row>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <Form-item prop="username">
                <Input type="text" v-model="formInline.username" placeholder="邮箱">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item prop="password">
                <Input type="password" v-model="formInline.password" placeholder="密码">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
        </Form>
        <div>
            <Button type="primary" @click="goto('/register')">免费注册</Button>
            <Button @click="handleSubmit('formInline')" style="margin-left:10px;">登录</Button>
            <p style="margin-top:30px;">立即使用，开启人机交互新模式</p>
        </div>
    </Row>
</template>

<script>
    export default {
		data () {
            return {
				formInline: {
                    username: this.$config.testAccount.username,
                    password: this.$config.testAccount.password
                },
                ruleInline: {
                    username: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
			goto(path){
				this.$router.push(path);
			},
			handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.getToken();
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            getToken() {
				var qs = require('qs');
				
                /*this.$ajax.post(`/token`, qs.stringify(this.formInline), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
					.then(response => {
                        this.$store.commit('authenticated', response.data.token)
                    });*/
                this.$store.commit('authenticated', 'FAKE TOKEN');
            }
        }
    }
</script>
