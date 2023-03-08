<template>
    <div>
        <!-- 面包屑 -->
        <a-breadcrumb class="aBreadcrumbBox">
            <a-breadcrumb-item>次数包列表</a-breadcrumb-item>
        </a-breadcrumb>

        <a-card>
            <!-- 查询台本 -->
            <a-row :gutter="20" class="searchLine" type="flex" justify="space-between">
                <a-col :span="8">
                    <a-row type="flex" :gutter="20">
                        <a-col :span="12">
                            <a-input placeholder="输入手机号码" />
                        </a-col>
                        <a-col>
                            <a-button type="primary">
                                查询
                            </a-button>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :span="4">
                    <a-button type="primary" @click="gotoReceiveLink">
                        创建领取链接
                    </a-button>
                </a-col>
            </a-row>

            <!-- 台本列表 -->
            <a-table :columns="columns" @change="tableChange" :pagination="pagination" :data-source="data"
                :rowKey="(record, index) => { return index }">
                <a slot="mobile" slot-scope="text" @click="gotoUserList">{{ text }}</a>
            </a-table>
        </a-card>


    </div>
</template>

<script>
const columns = [
    {
        title: '链接ID',
        dataIndex: 'link_id',
        align: "center",
    },
    {
        title: '用户账号',
        dataIndex: 'mobile',
        scopedSlots: { customRender: 'mobile' },
        align: "center",
    },
    {
        title: '次数包类型',
        dataIndex: 'time_type',
        align: "center",
    },
    {
        title: '下发次数',
        dataIndex: 'send_num',
        align: "center",
    },
    {
        title: '剩余次数/总次数',
        dataIndex: 'frequency',
        align: "center",
    }, {
        title: '下发时间',
        dataIndex: 'send_time',
        align: "center",
    }, {
        title: '链接状态',
        dataIndex: 'link_status',
        align: "center",
    }
];
import { reqGetfrequencyList } from "@/api/index"
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
        this.getFrequencyList()
    },
    methods: {
        // 获取次数包列表
        async getFrequencyList() {
            let result = await reqGetfrequencyList()
            if (result.code == 200) {
                for (let i = 0; i < result.data.length; i++) {
                    result.data[i].frequency = "匀速提词" + result.data[i].used_uniform_count + "/" + result.data[i].uniform_count + "    AI提词" + result.data[i].used_ai_count + "/" + result.data[i].ai_count
                }
                this.data = result.data
            }
        },
        tableChange(e) {
            // console.log(e)  // 分页、排序、筛选变化时的数据
            const { current, pageSize } = e;
            this.pagination.current = current;
            this.pagination.pageSize = pageSize;
        },
        gotoReceiveLink() {
            this.$router.push("/index/receiveLink")
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