<template>
    <Row>
        <div class="ivu-input" style="border-radius:0px;border-bottom:0px;">
            <Tooltip placement="right">
                <Icon type="quote"></Icon>
                <div slot="content">
                    <p>普通模式下文本会由系统自动识别词库</p>
                    <p>模板模式下系统不会进行识别 </p>
                </div>
            </Tooltip>

            <div contenteditable @mouseup="grab" class="expression"><!--@keyup.enter="mark"-->
                <div v-for="seg in userSay.data" style="float:left;">
                    <Button v-if="seg.meta" type="text" @click="showDetail(seg)" :style="{backgroundColor: seg.color, marginRight:'2px'}" size="small">{{seg.text}}</Button>
                    <span v-else class="ivu-btn ivu-btn-text ivu-btn-small">{{seg.text}}</span>
                </div>
            </div>
        </div>
        <Modal
            v-model="dataDetailVisible"
            title="更改词语分类"
            @on-ok="changeDataType"
            @on-cancel="hideDetail">
            
            <Radio-group v-model="currentSeg.meta">
                <Radio v-for="entity in dataTypes" :label="'@' + entity.name"></Radio>
            </Radio-group>
            
        </Modal>
    </Row>

            <!--<div v-if="visible" class="ivu-table-wrapper">
                <div class="ivu-table ivu-table-stripe">
                    <div class="ivu-table-header">
                        <table cellspacing="0" cellpadding="0" border="0" width="100%">
                            <thead>
                                <tr>
                                    <th>
                                        <div class="ivu-table-cell">
                                            <span>参数名称</span>
                                            <Tooltip content="操作说明，未完善" placement="top"><Icon type="help-circled"></Icon></Tooltip>
                                        </div>
                                    </th>
                                    <th>
                                        <div class="ivu-table-cell">
                                            <span>数据类型</span>
                                            <Tooltip content="操作说明，未完善" placement="top"><Icon type="help-circled"></Icon></Tooltip>
                                        </div>
                                    </th>
                                    <th>
                                        <div class="ivu-table-cell">
                                            <span>取值</span>
                                            <Tooltip content="操作说明，未完善" placement="top"><Icon type="help-circled"></Icon></Tooltip>
                                        </div>
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="ivu-table-body">
                        <table cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tbody class="ivu-table-tbody">
                                <tr v-for="seg in userSay.data" v-if="seg.meta" class="ivu-table-row">
                                    <td>
                                        <div class="ivu-table-cell">
                                            <span contenteditable>{{seg.alias}}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="ivu-table-cell">
                                            <Dropdown trigger="click" @on-click="changeDataType">
                                                <Button type="text" @click="dataTypeVisible = true">{{seg.meta}}</Button>
                                                <Dropdown-menu slot="list">
                                                    <Dropdown-item v-for="dataType in dataTypes">{{dataType.name}}</Dropdown-item>
                                                    <Dropdown-item divided>创建新词库</Dropdown-item>
                                                </Dropdown-menu>
                                            </Dropdown>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="ivu-table-cell">
                                            <span>{{seg.text}}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="ivu-table-cell">
                                            <Button icon="trash-b" type="text">删除</Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>-->
    
</template>

<script>

	export default {
        props: ['userSay'],
        data () {
            return {
                dataDetailVisible: false,
                currentSeg: {name: null},
                dataTypes: []
            }
        },
        computed: {
            visible(){
                let entities = this.userSay.data.filter(x => x.meta);
                return entities.length > 0;
            }
        },
        methods: {
            grab(){
                let text = this.$util.getSelectionText();
                if(text.length){
                    
                }
            },

            mark(){

            },

            showDetail(seg){
                this.currentSeg = seg;
                this.dataDetailVisible = true;
            },
            changeDataType(){
                // find entity type by name
                let currentDataTypeName = this.currentSeg.meta;
                let entity = this.dataTypes.find((entity)=>{
                    return "@" + entity.name == currentDataTypeName;
                });

                this.currentSeg.color = entity.color;
                this.currentSeg.meta = "@" + entity.name;
            },
            hideDetail(){
                
            }
        },
		components: {
			
		},
		mounted() {
            let agentId = this.$store.state.agent.id;
            this.$ajax.get('/v1/Entities/' + agentId + '/Query')
                    .then(response => {
                        this.dataTypes = response.data.items;
                    });
            
		}
    }
</script>

<style scoped lang="less">  
    .ivu-table-wrapper{
        borderTop:0px;
    }
    .expression {
        width:97%;
        float:right;
        border:0px;
        font-size:13px;
    }
	[contenteditable=true]:empty:before {
		content: attr(placeholder);
		display: block; /* For Firefox */
		color: lightgrey;
	}
	[contenteditable]:focus {
		outline: 0px solid transparent;
	}
</style>