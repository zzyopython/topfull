<template>
  <div>
    <avue-crud
      v-if="option.column"
      :page.sync="page"
      :data="data.data"
      :option="option"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="changePage"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource: string;

  data = {};
  option = {};
  page = {
    // pageSize: 2,
    // pageSizes: [2, 4, 6],

    total: 0,
  };

  query: any = {
    limit: 2,
  };

  async fetchOption() {
    // 访问后端接口：courses,访问方式: Get
    const res = await this.$http.get(`${this.resource}/option`);

    // 将拿到的数据，存储到当前的data属性中，以便后面用这个属性进行前端渲染
    this.option = res.data;
  }

  async changePage({ pageSize, currentPage }) {
    this.query.page = currentPage;
    this.query.limit = pageSize;
    this.fetch();
  }

  // 从后台服务端获取数据，涉及到跨域，所以是异步操作
  async fetch() {
    // 访问后端接口：courses,访问方式: Get
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query,
      },
    });

    // 分页的total
    this.page.total = res.data.total;

    // 将拿到的数据，存储到当前的data属性中，以便后面用这个属性进行前端渲染
    this.data = res.data;
  }

  async create(row, done) {
    await this.$http.post(`${this.resource}`, row);
    this.$message.success('创建成功');
    this.fetch();
    done();
  }

  async update(row, index, done) {
    // 我们使用avue编辑数据的时候，会在数据中添加一个$index
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    await this.$http.put(`${this.resource}/${row._id}`, data);
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
    await this.$http.delete(`${this.resource}/${row._id}`);
    this.$message.success('删除成功');

    // 重新获取一遍数据
    this.fetch();
  }
  created() {
    this.fetchOption();
    this.fetch();
  }
}
</script>

<style>
.titles {
  margin-bottom: 20px;
}
</style>
