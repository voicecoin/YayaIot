<template>
    <Row style="text-align:center;">
        <h3>用户词条管理</h3>
        <br />
        <Col>
            <Input v-if="total > 10" v-model="text" icon="search" placeholder="请输入要搜索的实体条目名称..." style="width:50%;margin-bottom:20px;"></Input>
            <br />
            <ul>
                <li v-for="entry in entries" style="text-align: left;margin-bottom:10px;">
                    <Input v-model="entry.value" @on-enter="handleAddEntry" style="width:100px;margin-right: 10px;"></Input>
                    <Tag v-for="synonym in entry.synonyms" :key="synonym" :name="synonym" type="dot" closable @on-close="handleRemoveSynonym(entry, synonym)">{{synonym}}</Tag>
                    <Input v-model="entry.synonym" icon="ios-plus-empty" placeholder="添加同义词" @on-enter="handleAddSynonym(entry, entry.synonym)" style="width:100px;margin-right: 10px;"></Input>
                    <Button type="text" icon="trash-b" style="float:right;" @click="showDeleteConfirm = true">删除</Button>
                    <Modal v-model="showDeleteConfirm" width="360">
                        <p slot="header" style="color:#f60;text-align:center">
                            <Icon type="information-circled"></Icon>
                            <span>删除确认</span>
                        </p>
                        <div style="text-align:center">
                            <p>删除整个词条和其同义词</p>
                            <p>是否继续删除？</p>
                        </div>
                        <div slot="footer">
                            <Button type="error" size="large" long :loading="modal_loading" @click="handleRemoveEntry(entry.id)">删除</Button>
                        </div>
                    </Modal>
                </li>
                <li v-model="entry" style="text-align: left;margin-bottom:10px;">
                    <Input v-model="entry.value" placeholder="添加词条" @on-enter="handleAddEntry" style="width:100px;margin-right: 10px;"></Input>
                </li>
            </ul>
            <div>
                <Page :total="total" :current="page" :page-size="size" @on-change="changePage" show-total size="small"></Page>
            </div>
        </Col>
        <Button type="ghost" @click="goto" style="margin-top:10px;">返回</Button>
    </Row>
</template>
<script>
    import InputTag from 'vue-input-tag'

    export default {
        data () {
            return {
                entry: {
                    value: null
                },
                showDeleteConfirm: false,
                modal_loading: false,
                columns: [
                    {
                        title: '名称',
                        key: 'value'
                    },
                    {
                        title: '同义词',
                        key: 'synonyms',
                        render: (h, params) => {
                            let elements = [];
                            for(var el in params.row.synonyms) {
                                let word = elements.length == 0 ? params.row.synonyms[el] : ', ' + params.row.synonyms[el];
                                elements.push(
                                    h('span', word)
                                );
                            }
                 
                            return h('div', elements);
                        }
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
                                            this.editDataType(params);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                entries: [],
                page: 1,
                size: 10,
                total: 0,
                text: null
            }
        },
        computed: {
            
        },
        methods: {
            changePage (page) {
                let entityId = this.$route.query.entityId;
                this.$ajax.get('/v1/EntityEntries/' + entityId + '/Query?page=' + page + '&size=' + this.size)
                    .then(response => {
                        this.entries = response.data.items;
                        this.total = response.data.total;
                    });
            },
            editDataType (params) {
                let data = params.row;
                this.$route.query.entityId = data.id;
                this.$router.push('/entity/entity-type-detail?entityId=' + data.id);
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAddEntry () {
                let entityId = this.$route.query.entityId;
                this.$ajax.post('/v1/EntityEntries/' + entityId, this.entry)
                    .then(response => {
                        this.entries.push(response.data);
                        this.entry.value = null;
                        this.$Message.info("添加成功");
                    });
            },
            handleRemoveEntry (entryId) {
                this.$ajax.delete('/v1/EntityEntries/' + entryId)
                    .then(response => {
                        for(var index=0; index< this.entries.length; index++){
                            if(this.entries[index].id == entryId){
                                this.entries.splice(index, 1);
                                this.$Message.info("删除成功");
                                this.showDeleteConfirm = false;
                            }
                        }
                    });
            },
            handleAddSynonym(entry, synonym) {
                let data = {entityEntryId: entry.id, synonym: synonym};
                this.$ajax.post('/v1/EntrySynonmy/' + entry.id, data)
                    .then(response => {
                        entry.synonyms.push(response.data);
                        entry.synonym = null;
                        this.$Message.info("添加成功");
                    });
            },
            handleRemoveSynonym(entry, synonym){
                this.$ajax.delete('/v1/EntrySynonmy/' + entry.id + '/' + synonym)
                    .then(response => {
                        const index = entry.synonyms.indexOf(synonym);
                        entry.synonyms.splice(index, 1);
                        this.$Message.info("删除成功");
                    });
            },
            goto(){
                this.$router.push("/entity/entity-type-detail?entityId=" + this.$route.query.entityId );
            }
        },
        mounted() {
            let entityId = this.$route.query.entityId;
            this.$ajax.get('/v1/EntityEntries/' + entityId + '/Query')
                .then(response => {
                    this.entries = response.data.items;
                    this.total = response.data.total;
                });
        },
		components: {
			InputTag
		}
    }
</script>