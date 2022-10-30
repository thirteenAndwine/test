<template>
  <div class="main">
    <div class="loginBox">
      <img
        src="http://localhost:10001/assets/logo.710d5090.svg"
        alt="hahha"
      >
      <span class="LoginName">TC</span>
    </div>
    <a-form
      layout="horizontal"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }">
        <a-tab-pane
          key="tab1"
          tab="账号密码登陆"
        >
          <a-form-item>
            <a-input
              v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入账号' }], validateTrigger: 'change'}
              ]"
              placeholder="账号"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color:rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              type="password"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
              placeholder="密码"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color:rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              :disabled="hasErrors(form.getFieldsError())"
              block
            >
              登录
            </a-button>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
    </a-form>
  </div>
</template>
<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: "horizontal_login" }),
    };
  },
  mounted() {
    this.$nextTick(() => {
      // 开始时禁用提交按钮
      // this.form.validateFields();
    });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
      this.$router.push("/index");
    },
  },
};
</script>
<style scoped lang="less">
.main {
  width: 300px;
  margin: 50px auto;
  .loginBox {
    width: 110px;
    margin: 0 auto;
    // background-color: antiquewhite;
    img {
      width: 42px;
      height: 42px;
    }
    .LoginName {
      color: #000;
      font-size: 33px;
      vertical-align: middle;
      font-weight: bold;
      margin-left: 15px;
    }
  }
}
</style>

