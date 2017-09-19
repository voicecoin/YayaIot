<template>
    <div style="text-align:center;">
        <h3>{{agent.name}} 常用问答</h3>
        <br />
        <Row>
            <Input v-model="text" icon="search" placeholder="请输入要搜索的词库分类..." style="width: 30%;" :autofocus="true"></Input>
            <Button type="primary" icon="plus" style="margin-left:1%;" @click="addFaq">添加问答对</Button>
            <Upload :action="uploadUrl" :headers="uploadHeaders" accept=".txt" :show-upload-list="false" :on-success="uploadedFaq" style="margin-left:1%;display:inline-block;">
                <Poptip placement="right" trigger="hover">
                    <Button type="ghost" icon="ios-cloud-upload-outline">导入问答对</Button>
                    <div slot="content">
                        <h3>问答对文本格式</h3>
                        <p>输入问题</p>
                        <p>输入答案</p>
                        <p>-break-</p>
                        <p>输入问题</p>
                        <p>输入答案</p>
                    </div>
                </Poptip>
            </Upload>
            <!--<Button type="ghost" icon="ios-cloud-download-outline">导出问答</Button>
            <Button type="ghost" @click="train">测试</Button>-->
        </Row>
        <Table stripe :columns="columns" :data="corpus" style="margin-top: 10px;margin-bottom: 10px;"></Table>
		<div>
			<Page :total="total" :current="page" :page-size="size" @on-change="changePage" show-total size="small"></Page>
		</div>

        <Modal v-model="showDeleteConfirm" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>是否继续删除？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="handleRemoveFaq">删除</Button>
            </div>
        </Modal>

        <Modal v-model="showAddForm" width="500">
            <p slot="header" style="text-align:center">
                <Icon type="information-circled"></Icon>
                <span>添加问答对</span>
            </p>
            <div style="text-align:center">
                <Input v-model="question">
                    <span slot="prepend">用户提问：</span>
                </Input>
                <br/>
                <Input v-model="answer">
                    <span slot="prepend">机器回答：</span>
                </Input>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long :loading="modal_loading" @click="handleAddFaq">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import storage from 'localStorage';
    
    export default {
        data () {
            return {
                corpus: [
                    {q: "", a:""}
                ],
                columns: [
                    {
                        title: '问题',
                        key: 'question'
                    },
                    {
                        title: '答案',
                        key: 'answer'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 150,
                        render: (h, params) => {
                            return h('div', [
                                /*h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.editDataType(params);
                                        }
                                    }
                                }, '修改'),*/
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteFaq(params);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                total: 0,
                page: 1,
                size: 10,
                text: '',
                showDeleteConfirm: false,
                showAddForm: false,
                modal_loading: false,
                selectedId: null,
                question: '',
                answer: ''
            }
        },
        computed: {
            agent() {
                this.changePage(this.page);
                return this.$store.state.agent;
            },

            uploadUrl(){
                return this.$config.baseURL + "/v1/faq/upload/" + this.$store.state.agent.id;
            },

            uploadHeaders(){
                return {Authorization: 'Bearer ' + localStorage.getItem('access_token')}
            }
        },
        methods: {
            changePage (page) {
                this.page = page;
                var agentId = this.$store.state.agent.id;
                this.$ajax.get('/v1/Faq/' + agentId + '/Query?page=' + this.page + '&size=' + this.size + "&name=" + this.text)
                    .then(response => {
                        this.corpus = response.data.items;
                        this.total = response.data.total;
                    });
            },

            train(){
                var agentId = this.$store.state.agent.id;
                this.$ajax.get('/v1/faq/train/' + agentId)
                    .then(response => {
                        this.dataTypes = response.data.items;
                        this.total = response.data.total;
                    });
            },

            uploadedFaq(){
                this.changePage(this.page);
            },

            addFaq(){
                this.showAddForm = true;
            },

            handleAddFaq(){
                var agentId = this.$store.state.agent.id;
                this.$ajax.post('/v1/Faq', {agentId: agentId, question: this.question, answer: this.answer})
                    .then(response => {
                        this.changePage(this.page);
                        this.showAddForm = false;
                        this.$Message.info("添加问答对成功。");
                    });
            },

            deleteFaq(params){
                this.showDeleteConfirm = true;
                this.selectedId = params.row.id;
            },

            handleRemoveFaq(){
                var agentId = this.$store.state.agent.id;
                this.$ajax.delete('/v1/faq/' + agentId + '/' + this.selectedId)
                    .then(response => {
                        this.changePage(this.page);
                        this.showDeleteConfirm = false;
                        this.$Message.info("删除成功。");
                    });
            }
        }
    }
</script>
