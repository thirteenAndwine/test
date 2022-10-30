<template>
  <a-layout
    id="components-layout-demo-top-side-2"
    style="min-height: 100vh"
  >
    <a-layout-header class="header">
      <div class="SystemName">
        TC用户中心
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        width="200"
        style="background: #fff"
      >
        <a-menu
          mode="inline"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="user" />用户管理
            </span>
            <a-menu-item
              key="1"
              @click="goToComment('userlist')"
            >
              用户列表
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="laptop" />subnav 2
            </span>
            <a-menu-item key="5">
              option5
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title">
              <a-icon type="notification" />subnav 3
            </span>
            <a-menu-item key="9">
              option9
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content :style="{ padding: '24px', margin: 0, minHeight: '280px' }">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    goToComment(path) {
      // console.log(path);
      this.$router.push("/" + path);
    },
  },
};
</script>

<style>
.SystemName {
  color: aliceblue;
  font-size: 20px;
}
</style>
