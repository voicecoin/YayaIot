<template>
    <Tabs>
        <Tab-pane label="基本信息" name="general">
			<Row>
				<Col span="4" style="text-align:center;">
					<img v-if="agent.avatar" :src="agent.avatar" />
					<img v-else src="../../images/bot.png" />
					<p style="margin:10px;">版本类型：免费版</p>
					<Button type="ghost">版本升级</Button>
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
					<Button type="ghost">删除</Button>
					<Button type="primary" @click="updateAgent(agent.id)">保存</Button>
				</Col>
			</Row>
		</Tab-pane>
        <Tab-pane label="高级设置" name="advance"></Tab-pane>
        <Tab-pane label="导入与导出" name="migrate"></Tab-pane>
    </Tabs>
</template>
<script>
	
    export default {
        data(){
			return {
				agent: {
					name: "Blank"
				}
			}
		},
		created() {
			let agentId = this.$route.query.agentId;
			this.$ajax.get(`/v1/Agents/` + agentId)
				.then(response => {
					this.agent = response.data;
				});
		},
		methods:{
			updateAgent(agentId){
				this.$ajax.put('/v1/Agents/' + agentId, this.agent)
					.then(response => {
						this.$Message.info("保存成功");
					});
			}
		}
    }
</script>