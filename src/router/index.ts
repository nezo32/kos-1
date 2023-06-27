import { usePermissionStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Программы',
      component: () => import('@/Bridge.vue'),
      redirect: '/main',
      meta: {
        breadcrumbs: "Программы"
      },
      children: [
        {
          path: 'main',
          name: 'Программы',
          component: () => import('@/views/HomeView.vue'),
          alias: '/'
        },
        {
          path: 'programs/:id',
          name: "Образовательная программа",
          component: () => import('@/Bridge.vue'),
          meta: {
            breadcrumbs: "Образовательная программа"
          },
          redirect: '/programs/:id/main',
          children: [
            {
              path: 'main',
              name: "Образовательная программа",
              component: () => import("@/views/EduProgramView.vue"),
              alias: '/programs/:id'
            },
            {
              path: 'work',
              name: "Рабочая программа дисциплины",
              component: () => import("@/views/WorkProgramView.vue"),
              meta: {
                breadcrumbs: "Рабочая программа дисциплины"
              },
            },
          ]
        },
      ]
    },
    {
      path: '/op_supervisors',
      name: 'Руководители ОП',
      component: () => import('@/views/OPSupervisorsView.vue'),
      meta: {
        breadcrumbs: "Руководители ОП"
      },
      beforeEnter: () => {
        const store = usePermissionStore()
        return store.permission == 'Оператор' ? true : "/"
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
