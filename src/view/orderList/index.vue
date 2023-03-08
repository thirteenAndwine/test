<template>
    <div>
        <!-- 面包屑 -->
        <a-breadcrumb class="aBreadcrumbBox">
            <a-breadcrumb-item>订单列表</a-breadcrumb-item>
        </a-breadcrumb>

        <a-card class="box-card">
            <!-- 查询台本 -->
            <a-row :gutter="20" class="searchLine">
                <a-col :span="4">
                    <a-input placeholder="输入台本内容" />
                </a-col>
                <a-col :span="4">
                    <a-input placeholder="下单时间" />
                </a-col>
                <a-col :span="4">
                    <a-input-group compact>
                        <a-select style="width: 100%" default-value="week">
                            <a-select-option value="week">
                                周会员
                            </a-select-option>
                            <a-select-option value="mounth">
                                月会员
                            </a-select-option>
                            <a-select-option value="year">
                                年会员
                            </a-select-option>
                        </a-select>
                    </a-input-group>
                </a-col>
                <a-col :span="4">
                    <a-button type="primary">
                        查询
                    </a-button>
                </a-col>
            </a-row>

            <!-- 台本列表 -->
            <a-table :columns="columns" @change="tableChange" :data-source="data" :pagination="pagination"
                :rowKey="(record, index) => { return index }">
                <a slot="mobile" slot-scope="text" @click="gotoUserList">{{ text }}</a>
            </a-table>
        </a-card>

    </div>
</template>

<script>
const columns = [
    {
        title: '订单ID',
        dataIndex: 'uid',
        align: "center",
    },
    {
        title: '用户账号',
        dataIndex: 'mobile',
        scopedSlots: { customRender: 'mobile' },
        align: "center",
    },
    {
        title: '订单类型',
        dataIndex: 'order_type',
        align: "center",
    },
    {
        title: '支付金额',
        dataIndex: 'amount',
        align: "center",
    },
    {
        title: '下单时间',
        dataIndex: 'payment_time',
        align: "center",
    }
];
import { reqGetOrderList } from "@/api/index"
export default {
    data() {
        return {
            columns,
            data: [],
            all: "全部",
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
        this.getOrderList()
    },
    methods: {
        // 获取用户列表
        async getOrderList() {
            let result = await reqGetOrderList()
            if (result.code == 200) {
                this.data = result.data
            }
        },
        tableChange(e) {
            // console.log(e)  // 分页、排序、筛选变化时的数据
            const { current, pageSize } = e;
            this.pagination.current = current;
            this.pagination.pageSize = pageSize;
        },
        gotoUserList() {
            this.$router.push("/index/userList")
        }
    }
}
</script>

<style lang="less" scoped>
.aBreadcrumbBox {
    margin-bottom: 20px;
}

.searchLine {
    margin-bottom: 20px;
}
</style>