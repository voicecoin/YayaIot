<style scoped lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 200px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
            margin-bottom: 200px;
            p{
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
    }	
	.title{
		font-size:2em;
		margin-top:1.5em;
	}
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
                <!--<Row type="flex" justify="center" align="middle">
                    <Col span="24">
                        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                            <Form-item label="密码" prop="passwd">
                                <Input type="password" v-model="formCustom.passwd"></Input>
                            </Form-item>
                            <Form-item label="确认密码" prop="passwdCheck">
                                <Input type="password" v-model="formCustom.passwdCheck"></Input>
                            </Form-item>
                            <Form-item label="年龄" prop="age">
                                <Input type="text" v-model="formCustom.age" number></Input>
                            </Form-item>
                            <Form-item>
                                <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
                                <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
                            </Form-item>
                        </Form>
                    </Col>
                </Row>-->
                <img src="../../images/logo.png" width="200px;">
                <h3 style="margin-bottom:10px;">很抱歉！网站正在进行内部功能测试，暂时不提供新用户注册功能</h3>
                <a href="/" type="text">返回主页</a>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formCustom.passwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            const validateAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                // 模拟异步验证效果
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            
            return {
                formCustom: {
                    passwd: '',
                    passwdCheck: '',
                    age: ''
                },
                ruleCustom: {
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                    age: [
                        { validator: validateAge, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
