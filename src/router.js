import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./components/MovieList.vue')
  },
  {
    path: '/movie/:id',
    name: 'detail',
    component: () => import('./components/MovieDetail.vue'),
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from) => {
  console.log("페이지 이동 시도:", to.path);
  return true
});

export default router;