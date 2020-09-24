<template>
  <div>
    <h3>课程列表</h3>
    <div class="titles">
      <el-button
        type="success"
        size="small"
        @click="$router.push('/courses/create')"
        >创建课程</el-button
      >
    </div>
    <!-- border：是否带有纵向边框，stripe：是否为斑马纹table -->
    <el-table :data="data.data" border stripe>
      <el-table-column
        v-for="(field, name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        :width="field.width"
      ></el-table-column>
      <el-table-column label="操作" :width="200">
        <!-- v-slot="{ row }" 是作用域，里面的row，表示这一行的数据 -->
        <!-- @click="$router.push(`/courses/edit/${row._id}`)" 表示点击跳转到这个路由（带参数） -->
        <template v-slot="{ row }">
          <el-button
            type="success"
            size="small"
            @click="$router.push(`/courses/edit/${row._id}`)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="remove(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({})
export default class CourseList extends Vue {
  data = {};

  // fields 表示字段标题
  fields = {
    _id: { label: 'ID' },
    name: { label: '课程名称' },
    cover: { label: '课程封面图' },
  };

  // 从后台服务端获取数据，涉及到跨域，所以是异步操作
  async fetch() {
    // 访问后端接口：courses,访问方式: Get
    const res = await this.$http.get('courses');

    // 如果不知道怎么使用res，可以将res打印出来看看
    console.log(res); // 就会发现，我们想要的获取的数据，存储在了res.data中

    // 将拿到的数据，存储到当前的data属性中，以便后面用这个属性进行前端渲染
    this.data = res.data;
  }

  // 删除数据
  async remove(row) {
    try {
      // confirm：element-UI中的一个方法，弹出一个确认框
      await this.$confirm('是否确认删除？');
    } catch (e) {
      return;
    }
    await this.$http.delete(`courses/${row._id}`);
    this.$message.success('删除成功');

    // 重新获取一遍数据
    this.fetch();
  }
  created() {
    this.fetch();
  }
}
</script>

<style>
.titles {
  margin-bottom: 20px;
}
</style>
