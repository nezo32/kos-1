import { usePermissionStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

const checkDocumentEdit = () => {
  const store = usePermissionStore()
  return store.permission == 'Руководитель ООП' ? true : "/"
}

const checkRPDEdit = () => {
  const store = usePermissionStore()
  return store.permission == 'Заведующий кафедры' || store.permission == 'Преподаватель' ? true : '/'
}

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
              alias: '/programs/:id',
            },
            {
              path: 'work_discipline',
              name: "Рабочая программа дисциплины",
              component: () => import("@/views/WorkProgramDisView.vue"),
              meta: {
                breadcrumbs: "Рабочая программа дисциплины"
              },
            },
            {
              path: 'work_practice',
              name: "Рабочая программа практики",
              component: () => import("@/views/WorkProgramPracView.vue"),
              meta: {
                breadcrumbs: "Рабочая программа практики"
              }
            },
            {
              path: 'work_discipline/edit',
              name: "Рабочая программа дисциплины - редактирование",
              component: () => import("@/views/EditWorkDisciplineView.vue"),
              meta: {
                breadcrumbs: "Рабочая программа дисциплины"
              },
              beforeEnter: checkRPDEdit
            },
            {
              path: 'work_practice/edit',
              name: "Рабочая программа практики - редактирование",
              component: () => import("@/views/EditWorkPracticeView.vue"),
              meta: {
                breadcrumbs: "Рабочая программа практики"
              },
              beforeEnter: checkRPDEdit
            },

            {
              path: 'oop_annotation/edit',
              name: 'Аннотация ООП - редактирование',
              component: () => import("@/views/EditDocumentView.vue"),
              meta: {
                breadcrumbs: "Аннотация ООП"
              },
              beforeEnter: checkDocumentEdit
            },
            {
              path: 'oop_description/edit',
              name: 'Описание ООП - редактирование',
              component: () => import("@/views/EditDocumentView.vue"),
              meta: {
                breadcrumbs: "Описание ООП"
              },
              beforeEnter: checkDocumentEdit
            },
            {
              path: 'training_program/edit',
              name: 'Учебный план - редактирование',
              component: () => import("@/views/EditDocumentView.vue"),
              meta: {
                breadcrumbs: "Учебный план"
              },
              beforeEnter: checkDocumentEdit
            },
            {
              path: 'study_schedule/edit',
              name: 'Календарный учебный график - редактирование',
              component: () => import("@/views/EditDocumentView.vue"),
              meta: {
                breadcrumbs: "Календарный учебный график"
              },
              beforeEnter: checkDocumentEdit
            },
            {
              path: 'сompetence_matrix/edit',
              name: 'Матрица компетенций - редактирование',
              component: () => import("@/views/EditDocumentView.vue"),
              meta: {
                breadcrumbs: "Матрица компетенций"
              },
              beforeEnter: checkDocumentEdit
            },
            {
              path: 'staffing/edit',
              name: 'Справка о кадровом обеспечении - редактирование',
              component: () => import("@/views/EditDocumentView.vue"),
              meta: {
                breadcrumbs: "Справка о кадровом обеспечении"
              },
              beforeEnter: checkDocumentEdit
            },
            {
              path: 'logistics/edit',
              name: 'Справка о материально-техническом обеспечении - редактирование',
              component: () => import("@/views/EditDocumentView.vue"),
              meta: {
                breadcrumbs: "Справка о материально-техническом обеспечении"
              },
              beforeEnter: checkDocumentEdit
            },
            {
              path: 'gia_program/edit',
              name: 'Программа ГИА - редактирование',
              component: () => import("@/views/EditDocumentView.vue"),
              meta: {
                breadcrumbs: "Программа ГИА"
              },
              beforeEnter: checkDocumentEdit
            },

            {
              path: 'oop_annotation',
              name: 'Аннотация ООП',
              component: () => import("@/views/ViewDocumentView.vue"),
              meta: {
                breadcrumbs: "Аннотация ООП"
              },
            },
            {
              path: 'oop_description',
              name: 'Описание ООП',
              component: () => import("@/views/ViewDocumentView.vue"),
              meta: {
                breadcrumbs: "Описание ООП"
              },
            },
            {
              path: 'training_program',
              name: 'Учебный план',
              component: () => import("@/views/ViewDocumentView.vue"),
              meta: {
                breadcrumbs: "Учебный план"
              },
            },
            {
              path: 'study_schedule',
              name: 'Календарный учебный график',
              component: () => import("@/views/ViewDocumentView.vue"),
              meta: {
                breadcrumbs: "Календарный учебный график"
              },
            },
            {
              path: 'сompetence_matrix',
              name: 'Матрица компетенций',
              component: () => import("@/views/ViewDocumentView.vue"),
              meta: {
                breadcrumbs: "Матрица компетенций"
              },
            },
            {
              path: 'staffing',
              name: 'Справка о кадровом обеспечении',
              component: () => import("@/views/ViewDocumentView.vue"),
              meta: {
                breadcrumbs: "Справка о кадровом обеспечении"
              },
            },
            {
              path: 'logistics',
              name: 'Справка о материально-техническом обеспечении',
              component: () => import("@/views/ViewDocumentView.vue"),
              meta: {
                breadcrumbs: "Справка о материально-техническом обеспечении"
              },
            },
            {
              path: 'gia_program',
              name: 'Программа ГИА',
              component: () => import("@/views/ViewDocumentView.vue"),
              meta: {
                breadcrumbs: "Программа ГИА"
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
