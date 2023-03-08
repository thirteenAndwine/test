<template>
  <div class="main">
    <div class="loginBox">
      <span class="LoginName">TC</span>
    </div>
    <a-form layout="horizontal" :form="form" @submit="handleSubmit">
      <a-tabs :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }">
        <a-tab-pane key="tab1" tab="账号密码登陆">
          <a-form-item>
            <a-input v-decorator="[
              'username',
              { rules: [{ required: true, message: '请输入账号' }], validateTrigger: 'change' }
            ]" placeholder="账号">
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input type="password" v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' }
            ]" placeholder="密码">
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())" block>
              登录
            </a-button>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
    </a-form>
  </div>
</template>
<script>
import { reqUserLogin } from '@/api/index'
import { encrypt } from '@/utils/encryption'


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
      this.form.validateFields(async (err, values) => {
        const loginParams = { username: values.username, password: encrypt(values.password) }
        // console.log(loginParams)
        let result = await reqUserLogin(loginParams)
        if (result.status == 2000) {
          // 弹出提示框：登录成功
          this.$message.success('登录成功')
          // 解构data中的token
          let { access } = result.data
          // 将token存入sessionStorage
          window.sessionStorage.setItem('token', access)

          // 跳转至用户列表
          this.$router.replace('/index/userlist')
        }else{
          this.$message.error('登录失败')
        }
      });
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

