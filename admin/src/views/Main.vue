<template>
  <el-container>
    <el-aside width="200px">
      <!-- router 表示这个菜单是路由菜单-->
      <el-menu
        mode="vertical"
        style="height:100vh;"
        :default-active="$route.path"
        router
      >
        <el-submenu
          v-for="(item, index) in menu.items"
          :index="`menu-item-${index}`"
          :key="`menu-item-${index}`"
        >
          <template slot="title">{{ item.title }}</template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.items"
            :key="`menu-item-${index}-${subIndex}`"
            :index="subItem.path"
          >
            {{ subItem.title }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <h2>全栈之巅 - 后台管理</h2>
      </el-header>
      <el-main>
        <!--添加 :key="$route.path" 是为了防止编辑课程和创建课程使用同一个页面，导致数据不会更新的问题-->
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
  menu = {
    items: [
      {
        title: '内容管理',
        items: [
          { title: '首页', path: '/' },
          { title: '课程管理', path: '/courses/list' },
          { title: '课时管理', path: '/episodes/list' },
        ],
      },
      {
        title: '运营管理',
        items: [{ title: '用户管理', path: '/users/list' }],
      },
    ],
  };
}
</script>

<style></style>
