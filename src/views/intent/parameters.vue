<template>
    <Row style="min-height:400px;">
        <div class="ivu-table-wrapper" style="margin-top: 10px; margin-bottom: 10px;">
            <div class="ivu-table ivu-table-stripe">
                <div class="ivu-table-header">
                    <table cellspacing="0" cellpadding="0" border="0" width="100%">
                        <thead>
                            <tr>
                                <th>
                                    <div class="ivu-table-cell">
                                        <span>必填</span>
                                        <Tooltip content="操作说明，未完善" placement="top"><Icon type="help-circled"></Icon></Tooltip>
                                    </div>
                                </th>
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
                                <th>
                                    <div class="ivu-table-cell">
                                        <span>列表显示</span>
                                        <Tooltip content="操作说明，未完善" placement="top"><Icon type="help-circled"></Icon></Tooltip>
                                    </div>
                                </th>
                                <th>
                                    <div class="ivu-table-cell">
                                        <span>提示语</span>&nbsp;
                                        <Tooltip content="操作说明，未完善" placement="top"><Icon type="help-circled"></Icon></Tooltip>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="ivu-table-body">
                    <table cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tbody class="ivu-table-tbody">
                            <tr v-for="parameter in response.parameters" class="ivu-table-row">
                                <td>
                                    <div class="ivu-table-cell">
                                        <Checkbox v-model="parameter.required">&nbsp;</Checkbox>
                                    </div>
                                </td>
                                <td>
                                    <div class="ivu-table-cell">
                                        <span contenteditable>{{parameter.name}}</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="ivu-table-cell">
                                        <span>{{parameter.dataType}}</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="ivu-table-cell">
                                        <span>{{parameter.value}}</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="ivu-table-cell">
                                        <span></span>
                                    </div>
                                </td>
                                <td>
                                    <div class="ivu-table-cell">
                                        <span>{{parameter.prompts}}</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Row>

</template>

<script>
	export default {
        props:['response'],
        data () {
            return {
            }
        },
        computed: {

        },
        methods: {

        },
		components: {
			
		},
		mounted() {

		}
    }
</script>

<style scoped lang="less">  
	[contenteditable=true]:empty:before {
		content: attr(placeholder);
		display: block; /* For Firefox */
		color: lightgrey;
	}
	[contenteditable]:focus {
		outline: 0px solid transparent;
	}
</style>