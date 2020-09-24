<template>
  <div>
    <avue-crud
      :data="data.data"
      :option="option"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
    ></avue-crud>
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

  option = {
    title: '课程管理',
    column: [
      { prop: 'name', label: '课程名称' },
      { prop: 'cover', label: '课程封面图' },
    ],
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

  async create(row, done) {
    await this.$http.post('courses', row);
    this.$message.success('创建成功');
    this.fetch();
    done();
  }

  async update(row, index, done) {
    // 我们使用avue编辑数据的时候，会在数据中添加一个$index
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    await this.$http.put(`courses/${row._id}`, data);
    this.$message.success('更新成功');
    this.fetch();
    done();
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
