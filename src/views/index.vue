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
	.slogan{
		font-size:1.2em;
		margin-bottom:3em;
	}
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="top">
			<Col span="24">
				<Row type="flex" justify="center">
					<Col span="2"></Col>
					<Col span="20">
						<div style="height:200px;"></div>
						<h1>
							<img src="../images/logo.png">
						</h1>
						<div class="title">YAYA 人工智能物联网对话机器人制作平台</div>
						<div class="slogan"><vue-typer text='开始制作属于自己的物联网机器人吧……' :type-delay='200' :repeat='0'></vue-typer></div>
						
					</Col>
					<Col span="2" style="height: 95%">
						
					</Col>
				</Row>
				<Row type="flex" justify="center" align="middle">
					<Col>
						<login></login>
						
						<Button type="primary" @click="goto('/register')" style="margin-top:30px;">免费注册</Button><p style="margin-top:10px;">立即使用，开启物联设备对话交互新时代</p>
					</Col>
				</Row>
				<Row style="height:100px;" type="flex" justify="center" align="bottom">
					<Col>
						<span>© 2012-2017 深圳爱用科技有限公司</span>
					</Col>
				</Row>
			</Col>

        </Row>
    </div>
</template>
<script>
	import {VueTyper} from 'vue-typer';
	import login from './account/login.vue';
	import register from './account/register.vue';
	
    export default {
		data () {
            return {
            }
        },
        methods: {
			goto(path){
				this.$router.push(path);
			}
        },
		components: {
			VueTyper,
			login,
			register: register
		}
    }
</script>
