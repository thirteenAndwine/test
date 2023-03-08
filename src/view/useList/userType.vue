<template>
  <div>
    <!-- 面包屑 -->
    <a-breadcrumb>
      <a-breadcrumb-item>
        <router-link to="/index/userList">用户列表</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>用户类型</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- 表格 -->
    <a-card class="cardBox">
      <a-table tableLayout="auto" :rowKey="(record, index) => { return index }" @change="tableChange"
        :pagination="pagination" :columns="columns" :data-source="data">
      </a-table>
    </a-card>

  </div>
</template>

<script>
const columns = [
  {
    title: '用户ID',
    dataIndex: 'uid',
    align: "center",
  },
  {
    title: '用户账号',
    dataIndex: 'username',
    align: "center",
  },
  {
    title: '用户类型',
    dataIndex: 'vip_type',
    align: "center"
  },
  {
    title: '下单金额/领取次数',
    dataIndex: 'is_active',
    align: "center",

  },
  {
    title: '下单/领取日期',
    dataIndex: 'vip_expiry_date',
    align: "center",
  }
];

import { reqGetUserType } from "@/api/index"
export default {
  data() {
    return {
      columns,
      data: [],
      pagination: {
        current: 1,
        pageSize: 10,
        defaultPageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true, // 可以改变每页个数
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "30", "40"],
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize)
      },
    }
  },
  created() {
    this.getUserType()
  },
  methods: {
    async getUserType() {
      let uid = this.$route.query.uid
      let result = await reqGetUserType(uid)
      this.data = result.data.data
    },
    tableChange(e) {
      // console.log(e)  // 分页、排序、筛选变化时的数据
      const { current, pageSize } = e;
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
    },
  }
}
</script>

<style lang="less" scoped>
.cardBox {
  margin-top: 20px;
}
</style>