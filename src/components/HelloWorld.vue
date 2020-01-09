<template>
  <div class="hello">
    <a-button type="primary" @click="showModal">
      选择商铺
    </a-button>
    <ec-button-modal-box
            modalClass="large-modal"
            title="一个名字"
            :pagination="pagination"
            :visible="visible"
            :columns="columns"
            :dataSource="list"
            @cancel="handleCancel"
            @confirm="handleConfirm"
            @search="onSearch"
            @change="handlePageChange"
            :rowSelection="{selectedRowKeys: ['1','4']}"
            rowKey="xdsn"
    ></ec-button-modal-box>
  </div>
</template>

<script>
import EcButtonModalBox from "./ecButtonModalBox/ecButtonModalBox";
export default {
  name: 'HelloWorld',
  components: {EcButtonModalBox},
  data(){
    const columns = [
      {
        title: '序号',
        align: 'center',
        width: 70,
        customRender: (text, record, index) => (this.pageNum - 1) * this.pageSize + index + 1,
      },
      {
        title: '问题主题',
        dataIndex: 'subject',
      },
      {
        title: 'AAAAAAAAAAAA',
        dataIndex: 'A',
      },
      {
        title: 'B',
        dataIndex: 'B',
      },
      {
        title: 'C',
        dataIndex: 'C',
      },
      {
        title: 'D',
        dataIndex: 'D',
      },
      {
        title: 'XDSN号',
        dataIndex: 'xdsn',
      },
    ];
    const dataSource = [
      {
        subject: 'a',
        xdsn: '1',
        A: '1',
        B: 'B',
        C: '1',
        D: 'B',
      },
      {
        subject: 'b',
        xdsn: '2',
        A: '1',
        B: 'B',
        C: '1',
        D: 'B',
      },
      {
        subject: 'c',
        xdsn: '3',
        A: '1',
        B: 'B',
        C: '1',
        D: 'B',
      },
      {
        subject: 'd',
        xdsn: '4',
        A: '1',
        B: 'B',
        C: '1',
        D: 'B',
      },
      {
        subject: 'e',
        xdsn: '5',
        A: '1',
        B: 'B',
        C: '1',
        D: 'B',
      },
      {
        subject: 'e',
        xdsn: '6',
        A: '1',
        B: 'B',
        C: '1',
        D: 'B',
      },
      {
        subject: 'e',
        xdsn: '7',
        A: '1',
        B: 'B',
        C: '1',
        D: 'B',
      },
      {
        subject: 'e',
        xdsn: '8',
        A: '1',
        B: 'B',
        C: '1',
        D: 'B',
      },
      {
        subject: 'e',
        xdsn: '9',
        A: '1',
        B: 'B',
        C: '1',
        D: 'B',
      },
      {
        subject: 'e',
        xdsn: '10',
        A: '1',
        B: 'B',
        C: '1',
        D: 'B',
      },
      {
        subject: 'e',
        xdsn: '11',
        A: '1',
        B: 'B',
        C: '1',
        D: 'B',
      },
      {
        subject: 'e',
        xdsn: '12',
        A: '1',
        B: 'B',
        C: '1',
        D: 'B',
      },
      {
        subject: 'e',
        xdsn: '13',
        A: '1',
        B: 'B',
        C: '1',
        D: 'B',
      },
      {
        subject: 'e',
        xdsn: '14',
        A: '1',
        B: 'B',
        C: '1',
        D: 'B',
      },
      {
        subject: 'e',
        xdsn: '15',
        A: '1',
        B: 'B',
        C: '1',
        D: 'B',
      },
      {
        subject: 'e',
        xdsn: '16',
        A: '1',
        B: 'B',
        C: '1',
        D: 'B',
      },


    ];
    return {
      columns,
      dataSource,
      list:dataSource,
      visible: false,
      pageNum:1,
      pageSize:10,
      current:0,
      loading: false,
      selectedRowKeys:[],
    }
  },
  props: {
    msg: String
  },
  methods:{
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleConfirm(selectRowkeys,record){
     console.log(record);
     this.visible = false;
    },
    onSelectChange(records){
      console.log(records);
    },
    // 分页：翻页change
    handlePageChange({ current, pageSize }, filters, sorter) {
      this.pageSize = pageSize;
      this.current = current;
      const { order } = sorter;
      if (order) {
        sorter.order = order.replace('end', '');
      }
    },
    onSearch(value){
      console.log(value);
      if(value.length!==0){
        this.list = this.dataSource.filter(item => item.xdsn===value);
      }else {
        this.list = this.dataSource;
      }
    },
  },
  computed: {
    pagination() {
      return {
        total: this.total,
        current: this.current,
        showSizeChanger: true,
        showQuickJumper: true,
        change: 'handlePageChange',
      };
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
