<template>
  <div class="login" id="login-app">
    <div class="login-box">
      <img src="@/images/login/login-l.png" alt="">
      <div class="login-form">
        <div class="login-container">
          <!--
                <el-form>标签：这是一个Element UI中的表单组件，用于收集用户输入数据。
                ref:用于引用的实体对象；
                model:绑定表单组件的数据模型；
                rules:表单组件的验证规则
          -->
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
            <div class="login-form-title">
              <img src="@/images/login/logo.png" style="width:139px;height:42px;" alt=""/>
            </div>
            <!--
                  <el-form-item>标签：这是一个Element UI中的表单项组件，用于包装输入框和标签。
                  prop属性：这个属性用于指定表单项组件的属性名称，这个属性名称将用于验证。
            -->
            <el-form-item prop="username">
              <!--
                  v-model指令：这个指令用于绑定输入框组件的数据模型。
                  type属性：这个属性用于指定输入框的类型（例如文本框、密码框等）。
                  auto-complete属性：这个属性用于控制输入框的自动完成功能。
                  placeholder属性：这个属性用于指定输入框的占位符文本。
                  maxlength属性：这个属性用于指定输入框允许输入的最大长度。
                  prefix-icon属性：这个属性用于在输入框前面添加一个图标。
               -->
              <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号" maxlength="20"
                        prefix-icon="iconfont icon-user"/>
            </el-form-item>
            <el-form-item prop="password">
              <!-- @keyup.enter.native 属性：这个属性用于指定当用户按下回车键时触发的函数。
                   @是事件绑定符。native表示监听的是DOM原生事件-->
              <el-input v-model="loginForm.password" type="password" placeholder="密码" prefix-icon="iconfont icon-lock"
                        maxlength="20" @keyup.enter.native="handleLogin"/>
            </el-form-item>
            <el-form-item style="width: 100%">
              <!--
                    prevent 是 Vue.js 指令中的一种修饰符，用于阻止浏览器默认事件的发生。
              -->
              <el-button :loading="loading" class="login-btn" size="medium" type="primary" style="width: 100%"
                         @click.native.prevent="handleLogin">
                <span v-if="!loading">登录</span>
                <span v-else>登录中...</span>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import {loginApi} from '@/api/login'
import {mapState, mapActions} from 'vuex';

export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        // password: '123456'
        password: ''
      },
      loading: false,
      // apiBaseUrl: process.env.VUE_APP_API_BASE_URL
    };
  },
  computed: {
    ...mapState('employee', ['userInfo']),
    loginRules() {
      const validateUsername = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码必须在6位以上'))
        } else {
          callback()
        }
      }
      return {
        'username': [{'validator': validateUsername, 'trigger': 'blur'}],
        'password': [{'validator': validatePassword, 'trigger': 'blur'}]
      }
    },
  },
  methods: {
    ...mapActions('employee', ['updateUserInfo', 'clearUserInfo']),

    async handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          let res = await loginApi(this.loginForm)
          if (String(res.code) === '1') {//1表示登录成功

            console.log(JSON.stringify(res.data))
            // 设置全局变量
            // localStorage.setItem('userInfo', JSON.stringify(res.data))
            this.updateUserInfo(JSON.stringify(res.data))
            // this.$store.commit('setUserInfo',JSON.stringify(res.data))
            // console.log("这是获取的userinfo:"+this.$store.state.employee.userInfo)
            // console.log("这是获取的userinfo:"+this.userInfo)

            await this.$router.push('/dashboard')
          } else {
            this.$message.error(res.msg)
            this.loading = false
          }
        }
      })
    },
  }
};
</script>


<style scoped>
@import "@/styles/login.css";
</style>
