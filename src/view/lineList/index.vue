<template>
  <div>
    <!-- 面包屑 -->
    <a-breadcrumb class="aBreadcrumbBox">
      <a-breadcrumb-item>台词列表</a-breadcrumb-item>
    </a-breadcrumb>

    <a-card class="box-card">
      <!-- 查询台本 -->
      <a-row :gutter="20" class="searchLine">
        <a-col :span="4">
          <!-- <div v-for="(item,index) in users" :key="index">{{item.mobile}}</div> -->
          <a-mentions :value="mentionsValue" placeholder="请输入手机号" prefix="" @change="onChange" @select="onSelect">
            <a-mentions-option v-for="(item, index) in users" :key="index" :value="item.mobile">
              {{ item.mobile }}
            </a-mentions-option>
          </a-mentions>
        </a-col>
      </a-row>

      <!-- 台本列表 -->
      <a-table :columns="columns" :data-source="data" @change="tableChange" :pagination="pagination"
        :rowKey="(record, index) => { return index }">
        <a slot="content" slot-scope="text" @click="openModal(text)">{{ text }}</a>
        <a slot="lookUser" slot-scope="text">{{ text }}</a>
      </a-table>
    </a-card>

    <!-- 台词对话框 -->
    <a-modal :visible="visible" :confirm-loading="confirmLoading" :footer="null" width="1000px" :closable="false">
      <a-row type="flex" justify="end" :gutter="15" class="rowStyle">
        <a-col>
          <a-icon type="copy" :style="{ fontSize: '18px' }" @click="copyLine" />
        </a-col>
        <a-col>
          <a-icon type="close" :style="{ fontSize: '18px' }" @click="closeModal" />
        </a-col>
      </a-row>
      <div class="titleStyle">{{ title }}</div>
      <div v-infinite-scroll="handleInfiniteOnLoad" class="demo-infinite-container" :infinite-scroll-disabled="busy"
        :infinite-scroll-distance="10">
        <p>{{ lineDetail }}</p>
      </div>
    </a-modal>

    <!-- 用户详情对话话框 -->
    <a-modal :visible="userVisible" :confirmLoading="false" :footer="null" width="1300px" :closable="false">
      <a-row type="flex" justify="end" :gutter="15" class="rowStyle">
        <a-col>
          <a-icon type="close" :style="{ fontSize: '18px' }" @click="cancelModal" />
        </a-col>
      </a-row>
      <a-table :columns="userColumns" :data-source="userData" :rowKey="(record, index) => { return index }"
        size="small" />
    </a-modal>
  </div>
</template>

<script>

import { reqGetLineList, reqUserInfo, reqPhoneSelect, reqGetLineDetails } from "@/api/index"
import reqwest from 'reqwest';
import infiniteScroll from 'vue-infinite-scroll';
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
export default {
  directives: { infiniteScroll },
  data() {
    return {
      columns: [
        {
          title: '台本ID',
          dataIndex: 'id',
          align: "center",
          width: 200,
        },
        {
          title: '台本内容',
          dataIndex: 'content',
          ellipsis: true,
          scopedSlots: { customRender: 'content' },
          customCell: this.getLineTitle,
          align: "center",

        },
        {
          title: '查看用户',
          dataIndex: 'lookUser',
          scopedSlots: { customRender: 'lookUser' },
          customCell: this.lookUserInfo,
          align: "center",
          width: 200

        },
        {
          title: '创建日期',
          dataIndex: 'created_time',
          align: "center",
          width: 200


        },
        {
          title: '修改日期',
          dataIndex: 'updated_time',
          align: "center",
          width: 200
        }
      ],
      data: [],
      title: "",//台词标题
      visible: false,
      userVisible: false,//用户详情对话框是否显示
      confirmLoading: false,
      selectedRowKeys: [],
      lineDetail: "",
      pagination: {
        current: 1,
        pageSize: 10,
        defaultPageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true, // 可以改变每页个数
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "30", "40"],
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
      },
      busy: false,
      userColumns: [
        {
          title: '用户ID',
          dataIndex: 'uid',
          align: "center",
        }, {
          title: '用户账号',
          dataIndex: 'username',
          align: "center",
        }, {
          title: '用户类型',
          dataIndex: 'userType',
          align: "center",
        }, {
          title: '剩余次数/总次数',
          dataIndex: 'frequency',
          align: "center",
        }, {
          title: '注册日期',
          dataIndex: 'created_time',
          align: "center",
        }, {
          title: '最近一次登录日期',
          dataIndex: 'updated_time',
          align: "center",
        }, {
          title: '微信昵称',
          dataIndex: 'nickname',
          align: "center",
        }
      ],//用户详情表头
      userData: [],//用户详情数据
      loading: false,
      users: [],//联想框内容
      mentionsValue: ""
    }
  },
  created() {
    this.getLineList()
  },
  methods: {
    async getLineList() {
      let result = await reqGetLineList()
      // console.log(result)
      if (result.status == 2000) {
        let lineInfo = result.data.data
        for (let i = 0; i < lineInfo.length; i++) {
          lineInfo[i].lookUser = "查看"
        }
        this.data = lineInfo
      }
    },

    // 查看台本信息
    getLineTitle(record) {
      return {
        on: {
          click: () => { //点击事件，也可以加其他事件
            let { title } = record
            this.title = title
          }
        }
      }
    },

    async getUserInfo(user_uid) {
      let result = await reqUserInfo(user_uid)
      let userInfo = result.data
      if (userInfo.vip_type == 0) {
        userInfo.userType = "普通会员"
      } else if (userInfo.vip_type == 31) {
        userInfo.userType = "月会员"
      } else if (userInfo.vip_type == 366) {
        userInfo.userType = "年会员"
      } else {
        userInfo.userType = "日会员"
      }
      userInfo.frequency = "匀速提词" + userInfo.used_uniform_count + "/" + userInfo.uniform_count + " AI提词" + userInfo.used_ai_count + "/" + userInfo.ai_count


      this.userData.splice(0, 1, userInfo)
    },

    // 点击查看查看用户信息
    lookUserInfo(record) {
      return {
        on: {
          click: () => { //点击事件，也可以加其他事件
            let { user_uid } = record
            this.getUserInfo(user_uid)
            // console.log(user_uid)
            this.userVisible = true

          }
        }
      }
    },

    // 超出滚动
    handleInfiniteOnLoad() {
      const data = this.data;
      this.loading = true;
      if (data.length > 14) {
        this.$message.warning('Infinite List loaded all');
        this.busy = true;
        this.loading = false;
        return;
      }
      this.fetchData(res => {
        this.data = data.concat(res.results);
        this.loading = false;
      });
    },

    fetchData(callback) {
      reqwest({
        url: fakeDataUrl,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: res => {
          // callback(res);
        },
      });
    },

    tableChange(e) {
      // console.log(e)  // 分页、排序、筛选变化时的数据
      const { current, pageSize } = e;
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
    },

    // 根据手机号模糊查询手机号
    async getUserPhone(phoneNum) {
      let result = await reqPhoneSelect(phoneNum)
      this.users = result.data.data
    },

    // 输入框值改变时触发
    onChange(value) {
      this.getUserPhone(value)
      this.mentionsValue = value
      this.loading = true
    },

    // 根据user_id查询台本信息
    async getLineByUid(uid) {
      let result = await reqGetLineDetails(uid)
      // console.log(result)
      if (result.status == 2000) {
        let lineInfo = result.data.data
        for (let i = 0; i < lineInfo.length; i++) {
          lineInfo[i].lookUser = "查看"
        }
        this.data = lineInfo
      }
    },

    onSelect(options) {
      this.mentionsValue = options.value
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].mobile == options.value) {
          this.getLineByUid(this.users[i].uid)
        }
      }
    },

    // 关闭台词详情对话框
    handleCancel() {
      this.visible = false;
    },

    // 关闭用户详情对话框
    cancelModal() {
      this.userVisible = false
    },

    openModal(text) {
      this.visible = true
      this.lineDetail = text
    },
    closeModal() {
      this.visible = false
    },
    // 复制台词
    copyLine() {
      this.$copyText(this.ModalText).then((e) => {
        this.$message.success('复制成功', 1);
      }, (e) => {
        this.$message.error('复制失败', 1);
      })
    },
    gotoUserList() {
      // this.$router.push("/index/userList")
    }
  }
}
</script>

<style lang="less" scoped>
.aBreadcrumbBox {
  margin-bottom: 20px;
}

.rowStyle {
  margin-bottom: 10px;
}

.demo-infinite-container {
  // background-color: antiquewhite;
  border-radius: 4px;
  overflow: auto;
  // padding: 8px 10px;
  height: 500px;
}

.titleStyle {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}

.searchLine {
  margin-bottom: 20px;
}
</style>