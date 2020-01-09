<template>
    <div>
        <a-modal :class="modalClass" :title="title" :visible="visible" @cancel="() => { $emit('cancel') }" @ok="hideModal" okText="确认" cancelText="取消">
            <a-input-search placeholder="input search text" @search="onSearch" enterButton/>
            <a-table
                    style="margin-top:8px;"
                    :dataSource="dataSource"
                    :pagination="pagination"
                    :columns="columns"
                    size="small"
                    :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                    @change="handlePageChange"
                    :rowKey="rowKey"
            >
            </a-table>
        </a-modal>
    </div>
</template>

<script>
    export default {
        name: "ecButtonModalBox",
        props: {
            pagination: Object,
            modalClass: String,
            width: String,
            rowSelection: Object,
            rowKey: String,
            columns: Array,
            dataSource: Array,
            visible:{
                type:Boolean,
                default:false,
            },
            title: String,
        },
        data() {
            return {
                tableSource:this.dataSource,
                selectedRowKeys:[],
                records:[],
            }
        },
        created() {
            this.selectedRowKeys = this.rowSelection.selectedRowKeys;
        },
        methods:{
            handlePageChange({ current, pageSize }, filters, sorter) {
                this.$emit('change',{ current, pageSize }, filters, sorter);
            },
            hideModal(){
                this.$emit('confirm',this.selectedRowKeys,this.records)
            },
            onSelectChange(selectedRowKeys,records){
                this.selectedRowKeys = selectedRowKeys;
                this.records= records;
                // this.$emit('onselectChange',records)
            },
            onSearch(value){
                this.$emit('search',value);
            }
        },
    }
</script>

<style>
.large-modal{
    min-width: 800px;
}
</style>
