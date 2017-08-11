<template>
    <div style="text-align:center;">
        <h3>{{agent.name}} 用户词库管理</h3>
        <br />
        <Row>
            <Input v-if="total > 10" v-model="text" icon="search" placeholder="请输入要搜索的词库分类..." style="width: 30%;"></Input>
            <Button type="primary" icon="plus" style="margin-left:1%;" @click="handleAddDataType">添加词库分类</Button>
            <Upload action="//jsonplaceholder.typicode.com/posts/" style="margin-left:1%;display:inline-block;">
                <Button type="ghost" icon="ios-cloud-upload-outline">导入词库</Button>
            </Upload>
            <Button type="ghost" icon="ios-cloud-download-outline">导出词库</Button>
        </Row>
        <Table stripe :columns="columns" :data="dataTypes" style="margin-top: 10px;margin-bottom: 10px;"></Table>
		<div>
			<Page :total="total" :current="page" :page-size="size" @on-change="changePage" show-total size="small"></Page>
		</div>

        <!--<Card style="margin-top:20px;">
            <Form :model="entityType">
                <Form-item>
                    <Checkbox v-model="entityType.isEnum">没有同义词</Checkbox>
                </Form-item>
                <Form-item>
                    <Input v-model="entityType.name" placeholder="请输入自定义实体类型名称，按回车键保存。" @on-enter="handleAdd" icon="plus"></Input>
                </Form-item>
            </Form>
        </Card>-->

    </div>
</template>
<script>
    export default {
        data () {
            return {
                entityType: {
                    isEnum: false,
                    name: null
                },
                columns: [
                    {
                        title: '词库分类',
                        key: 'name'
                    },
                    {
                        title: '描述',
                        key: 'description'
                    },
                    {
                        title: '词条数量',
                        key: 'count'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 150,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.editDataType(params);
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.editEntries(params);
                                        }
                                    }
                                }, '词条')
                            ]);
                        }
                    }
                ],
                dataTypes: [],
                total: 0,
                page: 1,
                size: 10,
                text: null
            }
        },
        computed: {
            agent() {

                var agentId = this.$store.state.agent.id;
                this.$ajax.get('/v1/Entities/' + agentId + '/Query?page=1&size=' + this.size)
                    .then(response => {
                        this.dataTypes = response.data.items;
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
            editDataType (params) {
                let data = params.row;
                this.$route.query.entityId = data.id;
                this.$router.push('/entity/entity-type-detail?entityId=' + data.id);
            },
            editEntries (params) {
                let data = params.row;
                this.$route.query.entityId = data.id;
                this.$router.push('/entity/entries?entityId=' + data.id);
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAddDataType () {
                this.$router.push('/entity/entity-type-detail');
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