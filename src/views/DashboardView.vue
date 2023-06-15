<template>
  <div class="app-wrapper openSidebar clearfix">
    <!-- sidebar -->
    <div class="sidebar-container">
      <div class="logo">
        <img src="@/images/login/login-logo.png" alt="" style="width: 116px; height: 32px"/>
      </div>
      <!-- 带有滚动条的容器-->
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
            :default-active="defAct"
            :unique-opened="false"
            :collapse-transition="false"
            background-color="#343744"
            text-color="#bfcbd9"
            active-text-color="#f4f4f5"
        >
          <div v-for="item in menuList" :key="item.index">
            <el-submenu :index="item.index" v-if="item.children && item.children.length>0">
              <template slot="title">
                <i class="iconfont" :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                  v-for="sub in item.children"
                  :index="sub.id"
                  :key="sub.id"
                  @click="menuHandle(sub,false)"
              >
                <i :class="iconfont + ' ' + sub.icon"></i>
                <span slot="title">{{ sub.title }}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item.index" @click="handleSelect(item,false)">
              <i class="iconfont" :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-scrollbar>
    </div>

    <div class="main-container">
      <!-- <navbar /> -->
      <div class="navbar">
        <div class="head-lable">
          <span v-if="goBackFlag" class="goBack" @click="goBack()"><img src="@/images/icons/btn_back@2x.png" alt=""/> 返回</span>
          <span>{{ pageTitle }}</span>
        </div>
        <div class="right-menu">
          <div class="avatar-wrapper" v-if="userInfo != null">{{ userInfo.name }}</div>
          <img src="@/images/icons/btn_close@2x.png" class="outLogin" alt="退出" @click="logout"/>
        </div>
      </div>
      <div class="app-main" v-loading="loading" style="overflow-y: auto; height: 90% " >
        <div class="divTmp" v-show="loading"></div>
        <router-view style="width: 100%;"></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import {logoutApi} from "@/api/login"
import {mapGetters, mapActions} from 'vuex';

export default {
  data() {
    return {
      pageTitle: "员工管理",
      route: '/dashboard/employee-management',
      defAct: '1',
      menuActived: '1',
      loading: true,
      goBackFlag: false,
      menuList: [
        {
          index: "1",
          icon: "icon-member",
          title: "员工管理",
          route: '/dashboard/employee-management',
        },
        {
          index: "2",
          icon: "icon-food",
          title: "菜品管理",
          route: '/dashboard/dish-management',
        },
        {
          index: "3",
          icon: "icon-combo",
          title: "套餐管理",
          route: '/dashboard/set-meal-management',
        },
        {
          index: "4",
          icon: "icon-category",
          title: "分类管理",
          route: '/dashboard/category-management',
        },
        {
          index: "5",
          icon: "icon-order",
          title: "订单管理",
          route: '/dashboard/order-management',
        },
      ],
      userInfo:'',
    };
  },
  computed: {
    ...mapGetters("employee", ["getUserInfo"]),
  },
  created() {

    if (this.getUserInfo) {
      this.userInfo = JSON.parse(this.getUserInfo)
    }
    this.closeLoading()
  },
  beforeDestroy() {
    this.timer = null
    clearTimeout(this.timer)
  },
  mounted() {
    window.handleSelect = this.handleSelect
    this.handleSelect(this.menuList[0], false)
  },
  methods: {
    ...mapActions('employee', ['clearUserInfo']),

    handleSelect(item, goBackFlag) {
      this.loading = true
      this.menuActived = item.index
      this.route = item.route
      this.pageTitle = item.title
      this.goBackFlag = goBackFlag
      if (typeof item.id === "undefined") {
        this.$router.push(this.route)
      } else {
        this.$router.push({path: this.route, query: {id: item.id}})
      }
      this.closeLoading()
    },
    goBack() {
      // 针对add，edit这些页面，返回上一页
      const menu = this.menuList.find(item => item.index === this.menuActived)
      this.handleSelect(menu, false)
    },
    closeLoading() {
      this.timer = null
      this.timer = setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    logout() {
      logoutApi().then((res) => {
        if (res.code === 1) {
          this.clearUserInfo();
          this.$router.push({name: "login"});
        }
      })
    },
  },
};
</script>

<style scoped>
@import "@/styles/index.css";
</style>
