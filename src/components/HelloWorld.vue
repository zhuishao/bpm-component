<!--
 * @Author: ningbo.kang
 * @Date: 2020-01-13 15:20:02
 * @LastEditors  : ningbo.kang
 * @LastEditTime : 2020-01-13 17:57:57
 * @Description: 描述
 -->
<template>
  <div class="hello">
    <a-button type="primary"
      @click="showModal">
      选择商铺
    </a-button>
    <ec-button-modal-box title="一个名字"
      :visible="visible"
      :columns="columns"
      :multiple="true"
      action="http://rap2api.taobao.org/app/mock/232772/demo/list/tableList/getServiceList"
      @cancel="handleCancel"
      @confirm="handleConfirm"
      rowKey="key"></ec-button-modal-box>
  </div>
</template>

<script>
import EcButtonModalBox from './ecButtonModalBox/ecButtonModalBox';
export default {
  name: 'HelloWorld',
  components: { EcButtonModalBox },
  data() {
    const columns = [
      {
        title: '序号',
        align: 'center',
        width: 70,
      },
      {
        title: '问题主题',
        dataIndex: 'subject',
      },
      {
        title: 'No',
        dataIndex: 'no',
      },
      {
        title: 'description',
        dataIndex: 'description',
      },
      {
        title: 'updatedAt',
        dataIndex: 'updatedAt',
      },
      {
        title: 'editable',
        dataIndex: 'editable',
      },
      {
        title: 'XDSN号',
        dataIndex: 'xdsn',
      },
    ];

    return {
      columns,
      visible: false,
      loading: false,
      selectedRowKeys: [],
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleConfirm(selectRowkeys, record) {
      console.log('selectRowkeys', selectRowkeys);
      console.log('record', record);
      this.visible = false;
    },
    onSelectChange(records) {
      console.log(records);
    },
  },
};
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
