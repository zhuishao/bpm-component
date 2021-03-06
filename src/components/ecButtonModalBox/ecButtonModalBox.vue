<template>
  <div>
    <a-modal :class="modalClass"
      :title="title"
      :visible="visible"
      @cancel="() => { $emit('cancel') }"
      @ok="handleConfirm"
      width="800px"
      okText="确认"
      cancelText="取消">
      <div align="right">
        <a-input-search placeholder="请输入搜索内容"
          @search="onSearch"
          style="width:300px;"
          allowClear
          enterButton />
      </div>
      <a-table style="margin-top:8px;"
        :scroll="{ x:700, y: 380 }"
        :dataSource="dataSource"
        :pagination="pagination"
        :columns="columns"
        :loading="loading"
        size="small"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: multiple ? 'checkbox' : 'radio'}"
        @change="handlePageChange"
        :rowKey="rowKey">
      </a-table>
    </a-modal>
  </div>
</template>

<script>
// import db from '@/api/db';

export default {
  name: 'ecButtonModalBox',
  props: {
    modalClass: String,
    width: String,
    rowSelection: Object,
    rowKey: String,
    columns: Array,
    // 是否多选
    multiple: {
      type: Boolean,
      default: true,
    },
    // 是否打开
    visible: {
      type: Boolean,
      default: false,
    },
    // 标题
    title: String,
    // 获取数据的接口地址
    action: String,

    customRequest: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      tableSource: this.dataSource,
      selectedRowKeys: [],
      records: [],
      dataSource: [],
      keyword: '',
      loading: false,
      total: 0,
      current: 1,
      pageSize: 10,
      query: {},
    };
  },
  watch: {
    visible(val) {
      this.selectedRowKeys = [];
      // 打开时，搜索数据
      if (val) {
        this.fetchData({ current: this.current });
      }
    },
  },
  computed: {
    // 表格分页配置
    pagination() {
      return {
        total: this.total,
        showSizeChanger: true,
        showQuickJumper: false,
        change: 'handlePageChange',
      };
    },
  },

  created() {},
  mounted() {
    this.columns[0].customRender = (text, record, index) => (this.current - 1) * this.pageSize + index + 1;
  },
  methods: {
    fetchData({ current, sort }) {
      const { pageSize, query } = this;
      this.current = current;
      this.query.planType = this.planType;
      this.query.version = this.version;
      this.loading = true;

      this.customRequest(
        {
          pageNum: current,
          pageSize,
          sort,
          ...query,
        },
        ({ dataSource, total, loading }) => {
          this.dataSource = dataSource;
          this.total = total;
          this.loading = loading;
        }
      );

      // db.get(this.action, {
      //   pageNum: current,
      //   pageSize,
      //   sort,
      //   ...query,
      // })
      //   .then(resp => {
      //     const { list, total } = resp.page;
      //     this.dataSource = list;
      //     this.total = total;
      //     this.loading = false;
      //   })
      //   .catch(() => {
      //     this.loading = false;
      //   });
    },

    handlePageChange({ current, pageSize }, filters, sorter) {
      this.pageSize = pageSize;
      const { order } = sorter;
      if (order) {
        sorter.order = order.replace('end', '');
      }
      this.current = current;
      this.fetchData({
        current,
        sort: sorter,
      });
    },

    handleConfirm() {
      this.$emit('confirm', this.selectedRowKeys, this.records);
    },
    onSelectChange(selectedRowKeys, records) {
      this.selectedRowKeys = selectedRowKeys;
      this.records = records;
    },
    onSearch(value) {
      // 准备过滤条件
      this.query = {
        keyword: value,
      };
      // 查询
      this.fetchData({ current: 1 });
    },
  },
};
</script>

<style>
.large-modal {
  min-width: 800px;
}
</style>
