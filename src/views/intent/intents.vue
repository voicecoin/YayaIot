<template>
    <div style="text-align:center;">
        <h3>{{agent.name}} 用户自定义意图管理</h3>
        <br />
        <Row>
            <Input v-model="text" icon="search" placeholder="请输入要搜索的意图名称..." style="width: 60%;float:left;"></Input>
            <Button type="primary" icon="plus" style="margin-left:1%;width:15%;" @click="handleAddIntent">创建新意图</Button>
            <Upload action="//jsonplaceholder.typicode.com/posts/" style="margin-left:1%;width:15%;display:inline-block;">
                <Button type="ghost" icon="ios-cloud-upload-outline">导入意图定义</Button>
            </Upload>
        </Row>
        <Table stripe :columns="columns" :data="intents" style="margin-top: 10px;margin-bottom: 10px;"></Table>
		<div>
			<Page :total="total" :current="page" :page-size="size" @on-change="changePage" show-total size="small"></Page>
		</div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                columns: [
                    {
                        title: '意图名称',
                        key: 'name'
                    },
                    {
                        title: '描述',
                        key: 'description'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.editIntent(params);
                                        }
                                    }
                                }, '配置'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, '导出')
                            ]);
                        }
                    }
                ],
                intents: [],
                total: 0,
                page: 1,
                size: 10,
                text: null
            }
        },
        computed: {
            agent() {

                var agentId = this.$store.state.agent.id;
                this.$ajax.get('/v1/Intents/' + agentId + '/Query?page=1&size=' + this.size)
                    .then(response => {
                        this.intents = response.data.items;
                        this.total = response.data.total;
                    });

                return this.$store.state.agent;
            }
        },
        methods: {
            changePage (page) {
                var agentId = this.$store.state.agent.id;
                this.$ajax.get('/v1/Entities/' + agentId + '/Query?page=' + page + '&size=' + this.size)
                    .then(response => {
                        this.dataTypes = response.data.items;
                        this.total = response.data.total;
                    });
            },
            editIntent (params) {
                let data = params.row;
                this.$route.query.intentId = data.id;
                this.$router.push('/intent/intent?intentId=' + data.id);
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAddIntent () {
                this.$router.push('/intent/intent');
                /*let agentId = this.$store.state.agent.id;
                this.$ajax.post('/v1/Entities/' + agentId, this.entityType)
					.then(response => {
						this.dataTypes.push(response.data);
                        this.total++;
						this.$Message.info("添加新词语类型成功");
					});*/
            },
            handleRemove (index) {
                this.formDynamic.items.splice(index, 1);
            }
        },
        mounted() {
            
        }
    }
</script>