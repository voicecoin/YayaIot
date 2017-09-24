<template>
    <Tabs :animated="false">
        <Tab-pane label="基本信息" name="general">
			<Row>
				<Col span="4" style="text-align:center;">
					<img v-if="agent.avatar" :src="agent.avatar" />
					<img v-else src="../../images/bot.png" />
					<p style="margin:10px;">版本类型：免费版</p>
					<Button type="ghost">升级{{agent.name}}</Button>
				</Col>
				<Col span="20">
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
			</Row>
			<Row>
				<Col span="4">&nbsp;</Col>
				<Col span="20">
					<Input v-model="agent.clientAccessToken" readonly>
						<span slot="prepend">客户端访问Token：</span>
					</Input>
					<br/>
					<Input v-model="agent.developerAccessToken" readonly>
						<span slot="prepend">开发者访问Token：</span>
					</Input>
				</Col>
			</Row>
			<br/>
			<Row>
				<Col span="4">
					&nbsp;
				</Col>
				<Col span="20" style="text-align:center;">
					<Button type="dashed" @click="showDeleteConfirm = true" style="float:left;margin-right:10px;">删除{{agent.name}}</Button>
					<Modal v-model="showDeleteConfirm" width="360">
						<p slot="header" style="color:#f60;text-align:center">
							<Icon type="information-circled"></Icon>
							<span>删除确认</span>
						</p>
						<div style="text-align:center">
							<p>删除{{agent.name}}机器人后，所有与{{agent.name}}连接的设备将不可用。</p>
							<p>是否继续删除？</p>
						</div>
						<div slot="footer">
							<Button type="error" size="large" long :loading="modal_loading" @click="handleRemove">删除</Button>
						</div>
					</Modal>
					<Button type="primary" @click="updateAgent(agent.id)">保存</Button>
				</Col>
			</Row>
		</Tab-pane>
        <Tab-pane label="高级设置" name="advance">
			<Row>
				<Card>
					<p slot="title">能力拓展</p>
					<p>通过添加新技能，提升{{agent.name}}的对话能力</p>
					<div v-for="ally in allies" style="margin:10px;">
						<Checkbox :label="ally.name" v-model="ally.isAlly" @on-change="updateSkill(ally)">
							<span style="line-height:60px;">{{ally.name}}</span>
						</Checkbox>
						<img v-if="ally.avatar" :src="ally.avatar" style="height:60px;margin-right:10px;float:left;"/>
            			<img v-else src="../../images/bot.png" style="height:60px;margin-right:10px;float:left;"/>
					</div>
				</Card>
			</Row>
		</Tab-pane>
        <Tab-pane label="导入与导出" name="migrate">
			<Row>
				<Button type="ghost">导出</Button>
			</Row>
		</Tab-pane>
    </Tabs>
</template>
<script>
	
    export default {
        data(){
			return {
				agent: {
					name: "Blank"
				},
				allies: [],
				showDeleteConfirm: false,
				modal_loading: false
			}
		},
		mounted() {
			let agentId = this.$route.query.agentId;
			this.$ajax.get(`/v1/Agents/` + agentId)
				.then(response => {
					this.agent = response.data;
				});

			this.$ajax.get(`/v1/Skills/` + agentId)
				.then(response => {
					this.allies = response.data;
				});
		},
		methods:{
			updateAgent(agentId){
				this.$ajax.put('/v1/Agents/' + agentId, this.agent)
					.then(response => {
						this.$Message.info("保存成功");
					});
			},
			handleRemove(){
				let agentId = this.$route.query.agentId;
				this.modal_loading = true;
				this.$ajax.put('/db/AgentEntity/' + agentId, {id: agentId, status: 11})
					.then(response => {
						this.modal_loading = false;
						this.showDeleteConfirm = false;
						this.$Message.info("删除成功");
					});
			},

			updateSkill(ally){
				let agentId = this.$route.query.agentId;
				if(ally.isAlly){
					this.$ajax.post('/v1/Skills/' + agentId + '/' + ally.skillId)
						.then(response => {
							this.$Message.info("添加技能成功");
						});
				} else if(!ally.isAlly){
					this.$ajax.delete('/v1/Skills/' + agentId + '/' + ally.skillId)
						.then(response => {
							this.$Message.info("移除技能成功");
						});
				}
			}
		}
    }
</script>