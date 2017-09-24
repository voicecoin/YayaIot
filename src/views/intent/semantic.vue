<template>
    <div class="ivu-table-wrapper">
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
    </div>
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
        methods:{
            changeDataType(){
                // find entity type by name
                let currentDataTypeName = this.currentSeg.meta;
                let entity = this.dataTypes.find((entity)=>{
                    return "@" + entity.name == currentDataTypeName;
                });

                this.currentSeg.color = entity.color;
                this.currentSeg.meta = "@" + entity.name;
            }
        }
    }
    
</script>