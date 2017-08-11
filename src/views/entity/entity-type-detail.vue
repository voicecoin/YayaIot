<template>
    <div>
        <h3 v-if="entityType.id">修改 {{entityType.name}}</h3>
        <h3 v-else>创建</h3>
        <br/>
        <Form :model="entityType" :label-width="150">
            <Form-item label="词库名称">
                <Input v-model="entityType.name" placeholder="请输入词库分类名称"></Input>
            </Form-item>
            <Form-item label="描述">
                <Input v-model="entityType.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入词库分类说明..."></Input>
            </Form-item>
            <Form-item v-if="entityType.id" label="是否定义同义词">
                <Checkbox v-model="entityType.isEnum">不定义</Checkbox>
            </Form-item>
            <Form-item v-if="entityType.id" label="词库分类标记默认背景色">
                <div :style="{width: '60px', float: 'left', borderRadius: '5px', backgroundColor: entityType.color}">{{entityType.color}}</div>
                <Input style="width: 80px; margin-left:10px;" v-model="entityType.color" placeholder="请输入16进制颜色值, 比如#FFFFFF"></Input>
            </Form-item>
        </Form>

        <Row>
            <Col span="4">
                &nbsp;
            </Col>
            <Col span="20" style="text-align:center;">
                <Button type="ghost" @click="cancelAction">取消</Button>
                <Button v-if="entityType.id" type="primary" @click="updateEntity">保存</Button>
                <Button v-else type="primary" @click="createEntity">创建</Button>

                <Button v-if="entityType.id" type="dashed" @click="showDeleteConfirm = true" style="float:left;margin-right:10px;">删除词库</Button>
                <Modal v-model="showDeleteConfirm" width="360">
                    <p slot="header" style="color:#f60;text-align:center">
                        <Icon type="information-circled"></Icon>
                        <span>删除确认</span>
                    </p>
                    <div style="text-align:center">
                        <p>此词库删除后，其包含的词条将一并删除。</p>
                        <p>是否继续删除？</p>
                    </div>
                    <div slot="footer">
                        <Button type="error" size="large" long :loading="modal_loading" @click="handleRemove">删除</Button>
                    </div>
                </Modal>
                <Button v-if="entityType.id" type="ghost" @click="addEntityEntry(entityType.id)" style="float:left;">词条管理</Button>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                showDeleteConfirm: false,
                modal_loading: false,
                entityType: {
                    id: null,
                    isEnum: false,
                    name: null
                }
            }
        },
        computed: {
            agent() {

                /*var agentId = this.$store.state.agent.id;
                this.$ajax.get('/v1/Entities/' + agentId + '/Query?page=1&size=' + this.size)
                    .then(response => {
                        this.dataTypes = response.data.items;
                        this.total = response.data.total;
                    });*/

                return this.$store.state.agent;
            }
        },
        methods: {
            cancelAction(){
                this.$router.push('/entity/entity-types');
            },
            handleRemove () {
                
            },
            addEntityEntry(entityId){
                this.$route.query.entityId = entityId;
                this.$router.push('/entity/entries?entityId=' + entityId);
            },
            updateEntity(){
                let entityId = this.$route.query.entityId;
                this.$ajax.put('/v1/Entities/' + entityId, this.entityType)
                    .then(response => {
                        this.$Message.info("更新成功")
                    });
            },
            createEntity(){
                this.$ajax.post('/v1/Entities/' + this.agent.id, this.entityType)
                    .then(response => {
                        this.entityType = response.data;
                    });
            }
        },
        mounted() {
            let entityId = this.$route.query.entityId;
            if(entityId) {
                this.$ajax.get('/v1/Entities/' + entityId)
                    .then(response => {
                        this.entityType = response.data;
                    });
            }

        }
    }
</script>