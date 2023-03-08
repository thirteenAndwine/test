<template>
  <div>
    <!-- 面包屑 -->
    <a-breadcrumb>
      <a-breadcrumb-item>用户列表</a-breadcrumb-item>
    </a-breadcrumb>
    <a-card class="box-card">

      <!-- 查询与添加用户 -->
      <a-row :gutter="20" class="searchAndAdd">
        <a-col :span="4">
          <a-input placeholder="输入手机号码" v-model="phoneNum" />
        </a-col>
        <!-- <a-col :span="3">
          <a-date-picker placeholder="注册日期" @change="onChange" />
        </a-col> -->
        <a-col :span="2">
          <a-button @click="selectUserInfo" type="primary">
            查询
          </a-button>
        </a-col>
      </a-row>

      <!-- 表格 -->
      <a-table :columns="columns" @change="tableChange" :data-source="data" :pagination="pagination"
        :rowKey="(record, index) => { return index }">
        <a slot="linesDetails" slot-scope="text">{{ text }}</a>
        <a slot="userType" slot-scope="text">{{ text }}</a>
        <a slot="frequency" slot-scope="text">{{ text }}</a>
      </a-table>
    </a-card>

    <!-- 台词列表弹框 -->
    <a-modal :visible="lineListVisible" :footer="null" :closable="false" @cancel="handleCancel" :width="1000">
      <a-row type="flex" justify="space-between" :gutter="15">
        <a-col>
          <p class="pStyle">用户:<span :style="{ color: '#d95858' }">{{ userPhone }}</span> 的台词</p>
        </a-col>
        <a-col>
          <a-icon type="close" :style="{ fontSize: '18px' }" @click="closeModal" />
        </a-col>
      </a-row>
      <div v-infinite-scroll="handleInfiniteOnLoad" class="demo-infinite-container" :infinite-scroll-disabled="busy"
        :infinite-scroll-distance="10">
        <a-list item-layout="horizontal" :data-source="lineListData" :pagination="LinePagination">
          <a-list-item slot="renderItem" class="lineListStyle" slot-scope="item, index">
            <a-list-item-meta>
              <a slot="title" class="titleStyle" @click="lookDetaile(item, index)">{{ item.title }}</a>
            </a-list-item-meta>
            {{ item.content }}
          </a-list-item>
        </a-list>
      </div>
    </a-modal>

    <!-- 台词详情对话框 -->
    <a-modal :visible="LineDetailsVisible" :closable="false" :footer="null">
      <a-row type="flex" justify="end" :gutter="15" class="rowStyle">
        <a-col>
          <a-icon type="copy" :style="{ fontSize: '18px' }" @click="copyLine" />
        </a-col>
        <a-col>
          <a-icon type="close" :style="{ fontSize: '18px' }" @click="closeLineDetail" />
        </a-col>
      </a-row>
      <p :style="{ fontWeight: '600', fontSize: '18px' }">{{ lineTitle }}</p>
      <div v-infinite-scroll="handleInfiniteOnLoad" class="demo-infinite-container" :infinite-scroll-disabled="busy"
        :infinite-scroll-distance="10">{{ lineContent }}</div>
    </a-modal>
  </div>
</template>

<script>
import { reqGetUserList, reqGetLineDetails,reqPhoneSelect } from "@/api/index"
import reqwest from 'reqwest';
import infiniteScroll from 'vue-infinite-scroll';
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

export default {
  directives: { infiniteScroll },
  name: "App",
  data() {
    return {
      // 表格标题
      columns: [
        {
          title: '用户ID',
          dataIndex: 'uid',
          // ellipsis: true,
          align: "center",
        },
        {
          title: '用户账号',
          dataIndex: 'username',
          ellipsis: true,
          align: "center",
        },
        {
          title: '台本内容',
          dataIndex: 'linesDetails',
          ellipsis: true,
          scopedSlots: { customRender: 'linesDetails' },
          customCell: this.renderTimeBackground,
          align: "center",
        },
        {
          title: '用户类型',
          dataIndex: 'userType',
          ellipsis: true,
          scopedSlots: { customRender: 'userType' },
          customCell: this.getUserType,
          align: "center",
        },
        {
          title: '剩余次数/总次数',
          dataIndex: 'frequency',
          scopedSlots: { customRender: 'frequency' },
          align: "center",
        },
        {
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
          ellipsis: true,
          align: "center",
        }
      ],
      data: [],
      visible: false,
      usermsg: "",
      userPhone: "",
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
      lineListVisible: false,
      lineListData: [],
      // 台词分页
      LinePagination: {
        current: 1,
        pageSize: 10,
        defaultPageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true, // 可以改变每页个数
        showQuickJumper: true,
        pageSizeOptions: ["5", "10", "20", "30", "40"],
        onShowSizeChange: (current, pageSize) => {
          // console.log(current, pageSize)
          this.LinePagination.current = current
          this.LinePagination.pageSize = pageSize
        },
        onChange: page => {
          // console.log(page)
          this.LinePagination.current = page
        }
      },
      busy: false,
      LineDetailsVisible: false,//台词详情的显示与隐藏
      lineTitle: "",
      lineContent: "",
      phoneNum:"",
    };
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 获取用户列表数据
    async getUserList() {
      let result = await reqGetUserList()
      if (result.status == 2000) {
        let userInfo = result.data.data

        for (let i = 0; i < userInfo.length; i++) {
          if(userInfo[i].vip_type==0){
            userInfo[i].userType = "普通会员"
          }else if(userInfo[i].vip_type==31){
            userInfo[i].userType = "月会员"
          }else if(userInfo[i].vip_type==366){
            userInfo[i].userType = "年会员"
          }else{
            userInfo[i].userType = "日会员"
          }
          userInfo[i].linesDetails = "查看台本"
          userInfo[i].frequency = "匀速提词" + userInfo[i].used_uniform_count + "/" + userInfo[i].uniform_count + " AI提词" + userInfo[i].used_ai_count + "/" + userInfo[i].ai_count
        }
        this.data = userInfo
      }
    },

    // 查看台本，获取用户台本信息
    async getlineDetails(uids) {
      let result = await reqGetLineDetails(uids)
      this.lineListData = result.data.data
    },

    // 分页、排序、筛选变化时的数据
    tableChange(e) {
      // console.log(e)  
      const { current, pageSize } = e;
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
    },

    // 点击时获取该行数据的key值
    renderTimeBackground(record) {
      return {
        on: {
          click: () => { //点击事件，也可以加其他事件
            // 解构该行数据的username,uid 
            let { username,uid } = record
            this.userPhone = username
            // 发起请求
            this.getlineDetails(uid)
            // 打开台词列表弹框
            this.lineListVisible = true
          }
        }
      }
    },

    getUserType(record) {
      return {
        on: {
          click: () => { //点击事件，也可以加其他事件
            let { uid } = record
            this.gotoUserType(uid)
          }
        }
      }
    },

    // 手机号查询用户信息
    async selectUserInfo(){
      let result = await reqPhoneSelect(this.phoneNum)
      if (result.status == 2000) {
        let userInfo = result.data.data

        for (let i = 0; i < userInfo.length; i++) {
          if(userInfo[i].vip_type==0){
            userInfo[i].userType = "普通会员"
          }else if(userInfo[i].vip_type==31){
            userInfo[i].userType = "月会员"
          }else if(userInfo[i].vip_type==366){
            userInfo[i].userType = "年会员"
          }else{
            userInfo[i].userType = "日会员"
          }
          userInfo[i].linesDetails = "查看台本"
          userInfo[i].frequency = "匀速提词" + userInfo[i].used_uniform_count + "/" + userInfo[i].uniform_count + " AI提词" + userInfo[i].used_ai_count + "/" + userInfo[i].ai_count
        }

        this.data = userInfo

      }

    },

    // 查看台词详情
    lookDetaile(item, index) {
      let { title, content } = item
      // console.log(content)
      this.LineDetailsVisible = true
      this.lineTitle = title
      this.lineContent = content
    },

    // 复制台词
    copyLine() {
      this.$copyText(this.lineContent).then((e) => {
        this.$message.success('复制成功', 1);
      }, (e) => {
        this.$message.error('复制失败', 1);
      })
    },

    // 关闭台词详情对话框
    closeLineDetail() {
      this.LineDetailsVisible = false
    },

    // 关闭弹窗
    handleCancel() {
      this.lineListVisible = false
    },

    fetchData(callback) {
      reqwest({
        url: fakeDataUrl,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: res => {
          callback(res);
        },
      });
    },

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

    // 关闭台词列表弹框
    closeModal() {
      this.lineListVisible = false
    },

    // 跳转至用户类型页面
    gotoUserType(uid) {
      // console.log()
      this.$router.push({ path: "/index/userType", query: { uid: uid } })
    },
    onChange() { },
  },
};
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 20px;
}

.pStyle {
  font-size: 18px;
  font-weight: 600;
  // background-color: antiquewhite;
}

.lineListStyle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #70778a;
}

.demo-infinite-container {
  // background-color: antiquewhite;
  border-radius: 4px;
  overflow: auto;
  // padding: 8px 10px;
  height: 500px;
}

.titleStyle {
  font-size: 16px;
  font-weight: 600;
}

.searchAndAdd {
  margin-bottom: 20px;
}
</style>