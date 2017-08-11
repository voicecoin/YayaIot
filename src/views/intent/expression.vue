<template>
    <Row>
        <Col span="24">
            <div class="ivu-input" style="border-radius:0px;">
                <Tooltip placement="right">
                    <Icon type="quote"></Icon>
                    <div slot="content">
                        <h3>点击进行模式切换</h3>
                        <p>普通模式下文本会由系统自动识别词库</p>
                        <p>模板模式下系统不会进行识别 </p>
                    </div>
                </Tooltip>
                <div :title="userSay.text" contenteditable @keyup.enter="submit" @focus="showData" @blur="hideData" class="expression">
                    <span v-for="seg in userSay.data" v-html="seg.text" :style="{backgroundColor: seg.color}"></span> 
                </div>
            </div>
            <div v-if="visible" class="ivu-table-wrapper">
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
                                            <span>{{seg.meta}}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="ivu-table-cell">
                                            <span>{{seg.value}}</span>
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
            </div>
        </Col>
    </Row>
</template>

<script>

	export default {
        props: ['userSay'],
        data () {
            return {
			
            }
        },
        computed: {
            visible(){
                let entities = this.userSay.data.filter(x => x.meta);
                return this.userSay.visible && entities.length > 0;
            }
        },
        methods: {
			showData(){
				this.userSay.visible = true;
			},
            hideData(){
                this.userSay.visible = false;
            }
        },
		components: {
			
		},
		mounted() {

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