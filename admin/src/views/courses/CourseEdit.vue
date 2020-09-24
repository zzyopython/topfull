<template>
  <div>
    <h3>{{ isNew ? '创建' : '编辑' }}课程</h3>
    <ele-form
      :form-data="data"
      :form-desc="fields"
      :request-fn="submit"
    ></ele-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component({})
export default class CourseEdit extends Vue {
  @Prop(String) id!: string; // 用 id 接收路由传递过来的参数 ！ 为类型断言
  data = {};
  fields = {
    name: { label: '课程名称', type: 'input' },
    cover: { label: '课程封面图', type: 'input' },
  };

  // 操作是显示创建页面，还是编辑页面
  get isNew() {
    return !this.id;
  }

  // 从后端获取数据（根据id获取）
  async fetch() {
    const res = await this.$http.get(`courses/${this.id}`);

    // 这个data会展示到前端ele-form中
    this.data = res.data;
  }

  // 提交数据到后端， 参数：data 为我们提交的时候，在input中填写的数据。
  async submit(data) {
    const url = this.isNew ? `courses` : `courses/${this.id}`;

    // 编辑页面提交的数据，是使用后端的put接口（更新接口）
    // 而 创建页面，是使用后端的post接口（创建接口）
    const method = this.isNew ? 'post' : 'put';
    await this.$http[method](url, data);

    // 提示成功
    this.$message.success('保存成功');

    // 清空data
    this.data = {};

    // 路由跳转到上一步
    this.$router.go(-1);
  }
  created() {
    !this.isNew && this.fetch();
  }
}
</script>

<style></style>
