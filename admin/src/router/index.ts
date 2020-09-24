import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Main from '../views/Main.vue';
import CourseList from '../views/courses/CourseList.vue';
import CourseEdit from '../views/courses/CourseEdit.vue';
import CourseCrud from '../views/courses/CourseCrud.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      { name: 'home', path: '/', component: Home },
      { name: 'courses-list', path: '/courses/list', component: CourseList },
      {
        name: 'courses-edit',
        path: '/courses/edit/:id',
        component: CourseEdit,
        props: true,
      },
      {
        name: 'courses-create',
        path: '/courses/create',
        component: CourseEdit,
      },
      // { name: 'courses-crud', path: '/courses/list', component: CourseCrud },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;