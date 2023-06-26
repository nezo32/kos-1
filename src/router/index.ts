import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Программы',
      component: () => import('@/Bridge.vue'),
      redirect: '/main',
      children: [
        {
          path: 'main',
          name: 'Программы',
          component: () => import('@/views/HomeView.vue'),
          meta: {
            breadcrumbs: "Программы"
          },
          alias: '/'
        },
        {
          path: 'programs/:id',
          name: "Образовательная программа",
          component: () => import("@/views/EduProgramView.vue")
        }
      ]
    },
    {
      path: '/op_supervisors',
      name: 'Руководители ОП',
      component: () => import('@/views/OPSupervisorsView.vue'),
      meta: {
        breadcrumbs: "Руководители ОП"
      }
    },
    {
      path: '/exit',
      name: 'Выход',
      component: () => import('@/views/ExitView.vue'),
      meta: {
        breadcrumbs: "Выход"
      }
    }
  ]
})

export default router
