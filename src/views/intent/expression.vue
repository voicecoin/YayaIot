<template>
    <Row>
        <div class="ivu-input" style="border-radius:0px;">
            <Tooltip placement="right">
                <Icon type="quote"></Icon>
                <div slot="content">
                    <p>普通模式下文本会由系统自动识别词库</p>
                    <p>模板模式下系统不会进行识别 </p>
                </div>
            </Tooltip>

            <div contenteditable @mouseup="grab" class="expression"><!--@keyup.enter="mark"-->
                <span v-for="seg in userSay.data" :style="{backgroundColor: seg.color}">{{seg.text}}</span>
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
                if(text.length > 0){
                    this.userSay.data.push({text: text, seg: "@人名"});
                }
            },

            mark(){

            },

            showDetail(seg){
                if(seg.meta) {
                    this.currentSeg = seg;
                    this.dataDetailVisible = true;
                }
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