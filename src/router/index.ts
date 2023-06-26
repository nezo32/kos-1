import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Программы',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/op_supervisors',
      name: 'Руководители ОП',
      component: () => import('@/views/OPSupervisorsView.vue')
    },
    {
      path: '/exit',
      name: 'Выход',
      component: () => import('@/views/ExitView.vue')
    }
  ]
})

export default router
