<template>
  <div>
    <a-layout id="components-layout-demo-top-side-2" style="min-height: 100vh">
      <a-layout>
        <a-layout-sider width="200" style="background: #fff">
          <a-menu mode="inline" :default-selected-keys="menuKey" theme="dark" :style="{ height: '100%' }">
            <a-menu-item key="1" @click="goToComment">
              用户列表
            </a-menu-item>
            <a-menu-item key="2" @click="gotolineList">
              台本列表
            </a-menu-item>
            <a-menu-item key="3" @click="gotoOrderList">
              订单列表
            </a-menu-item>
            <a-menu-item key="4" @click="gotoFrequencyList">
              次数包列表
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px">
          <a-layout-content :style="{ padding: '24px', margin: 0, minHeight: '280px' }">
            <router-view></router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
      menuKey: ['1']
    };
  },

  methods: {
    goToComment() {
      this.$router.replace("/index/userList");
    },
    gotolineList() {
      this.$router.replace("/index/lineList")
    },
    gotoOrderList() {
      this.$router.replace("/index/orderList")
    },
    gotoFrequencyList() {
      this.$router.replace("/index/frequencyList")
    }
  },

  // watch: {
  //   $route: {
  //     handler(val, oldVal) {
  //       if (val.query.keys) {
  //         this.menuKey = ['2']
  //         console.log(this.menuKey)

  //       }
  //       // val.path.split("/")
  //       // console.log(val.path.split("/")[2])
  //     }
  //   }
  // }

};
</script>

<style lang="less" scoped>
.SystemName {
  color: aliceblue;
  font-size: 20px;
}
</style>
