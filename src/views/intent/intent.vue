<template>
	<Row style="height:100%;">
		<Col>
			<Row style="margin:20px;">
				<Col span="24">
					<Steps :current="current">
						<Step title="语境设置" content="意图名称，根据传入上下文或事件触发用户意图"></Step>
						<Step title="用户表达" content="用户表达意图的不同方式"></Step>
						<Step title="参数设置" content="设置实体抽取类型，可提供动态消息回复"></Step>
						<Step title="回复设置" content="机器人回复消息格式和回调动作，可针对不同平台进行定制"></Step>
					</Steps>
				</Col>
			</Row>

			<Row v-if="current==0" style="margin:20px;min-height:400px;">
				<Col span="24">
					<basic :intent="intent"></basic>
				</Col>
			</Row>

			<Row v-if="current==1" style="margin:20px;min-height:400px;">
				<Col span="13">
					<Input v-model="userSay" @on-enter="addUserSay" placeholder="按回车输入用户表达" style="margin-bottom:20px;">
						<span slot="prepend">用户说：</span>
					</Input>

					<ul>
						<li v-for="data in intent.userSays" @click="switchUserSay(data)">
							<expression :userSay="data"></expression>
						</li>
					</ul>
				</Col>
				<Col span="1">&nbsp;</Col>
				<Col span="10">
					<semantic :userSay="currentExpression"></semantic>
				</Col>
			</Row>

			<Row v-if="current==2" style="margin:20px;min-height:400px;">
				<parameters :response="intent.responses[0]"></parameters>
			</Row>

			<Row v-if="current==3" style="margin:20px;min-height:400px;">
				<response :messages="intent.responses[0].messages"></response>
			</Row>

			<Row type="flex" justify="center">
				<i-button v-if="current>0" type="ghost" @click="previous" style="margin-right:10px;">上一步</i-button>
				<i-button v-if="current<3" type="primary" @click="next">下一步</i-button>
				<i-button v-else type="primary" @click="save">保存</i-button>
			</Row>
		</Col>
	</Row>
</template>

<script>
	import basic from './basic.vue';
	import expression from './expression.vue';
	import parameters from './parameters.vue';
	import response from './response.vue';
	import semantic from './semantic.vue';

	export default {
        data () {
            return {
				intent: {
					name: null,
					contexts: [],
					events: [],
					userSays: [],
					responses: [
						{
							action: null, 
							parameters: [], 
							affectedContexts: [], 
							messages: [
								{
									speeches: []
								}
							]
						}
					]
				},
				ruleValidate: {
                    userSay: [
                        { required: true, message: '用户表达不能为空', trigger: 'blur' },
						{ type: 'string', min: 1, message: '用户表达不能少于1个字', trigger: 'blur' }
                    ]
				},
				current: 0,
				userSay: '',
				currentExpression: {}
            }
        },
        computed: {
			
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

			switchUserSay(data){
				this.currentExpression = data;
			},

			addUserSay(){
				let text = this.userSay;
				this.$ajax.get('/v1/Analyzer/Markup?text=' + text)
					.then(response => {
							this.intent.userSays.push({text: text, data: response.data});
						});
			},
			save() {
				var agentId = this.$store.state.agent.id;
				var intentId = this.intent.id;
				if(intentId) {
					this.$ajax.put('/v1/Intents/' + intentId, this.intent)
						.then(response => {
							this.$Message.info("修改成功");
						});
				} else {
					this.$ajax.post('/v1/Intents/' + agentId, this.intent)
						.then(response => {
							this.intent = response.data;
							this.$Message.info("创建成功");
						});
				}
				
			},
            /*handleAddContext () {
                this.intent.contexts.push(this.intent.context);
            },
			handleAddEvent(){
				this.intent.events.push(this.intent.event);
			},*/
			handleAddUserSay(){
				if(this.intent.userSay == null) return;
				this.$ajax.get('/v1/Intents/Markup?text=' + this.intent.userSay)
                    .then(response => {
                        this.intent.userSays.push(response.data);
						this.intent.userSay = null;
                    });
			}
        },
		components: {
			basic,
			expression,
			parameters,
			response,
			semantic
		},
		mounted() {
			let intentId = this.$route.query.intentId;
			if(intentId) {
				this.$ajax.get('/v1/intents/' + intentId)
					.then(response => {
						this.intent = response.data;
					});
			} else {
				this.$ajax.get('/v1/intents')
					.then(response => {
						this.intent = response.data;
					});
			}

		}
    }
</script>

<style scoped lang="less">  
	.editable{
		border: 1px lightgrey solid;
    	border-radius: 3px;
		font-size: 1.2em;
	}
	[contenteditable=true]:empty:before {
		content: attr(placeholder);
		display: block; /* For Firefox */
		color: lightgrey;
	}
	[contenteditable]:focus {
		outline: 0px solid transparent;
	}
	.expression {
        width:97%;
        float:right;
        border:0px;
        font-size:13px;
    }
</style>