import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/manager/main',
    name: 'defaultLayout',
    component: () => import('@/layout/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'main',
        component: () => import('@/views/MainView.vue')
      },
      {
        path: '/manager/history',
        name: 'history',
        component: () => import('@/views/HistoryView.vue')
      },
      {
        path: '/manager/news',
        name: 'news',
        component: () => import('@/views/NewsView.vue')
      },
      {
        path: '/manager/news/upload',
        component: () => import('@/components/news/Upload.vue')
      },
      {
        path: '/manager/partners',
        name: 'partners',
        component: () => import('@/views/PartnersView.vue')
      },
      {
        path: '/manager/location',
        name: 'location',
        component: () => import('@/views/LocationView.vue')
      },
      {
        path: '/manager/questiontype',
        name: 'questiontype',
        component: () => import('@/views/question/QuestionTypeView.vue')
      },
      {
        path: '/manager/question',
        name: 'question',
        component: () => import('@/views/question/QuestionView.vue')
      },
      {
        path: '/manager/question/answer',
        name: 'answer',
        component: () => import('@/views/question/AnswerView.vue')
      },
      {
        path: '/manager/promotion',
        name: 'promotion',
        component: () => import('@/views/PromotionView.vue')
      },
      {
        path: '/manager/portfolio',
        name: 'portfolio',
        component: () => import('@/views/PortfolioView.vue')
      },
      {
        path: '/manager/contents',
        name: 'contents',
        component: () => import('@/views/ContentsView.vue')
      },
      {
        path: '/manager/workspace',
        name: 'workSpace',
        component: () => import('@/views/WorkSpaceView.vue')
      },
      {
        path: '/manager/employee',
        name: 'employee',
        component: () => import('@/views/management/EmployeeView.vue')
      },
      {
        path: '/manager/computer',
        name: 'computer',
        component: () => import('@/views/management/ComputerView.vue')
      },
      {
        path: '/manager/monitor',
        name: '/monitor',
        component: () => import('@/views/management/MonitorView.vue')
      },
      {
        path: '/manager/peripheral',
        name: 'peripheral',
        component: () => import('@/views/management/PeripheralsView.vue')
      },
      {
        path: '/manager/book',
        name: 'book',
        component: () => import('@/views/management/BookView.vue')
      },
      {
        path: '/manager/program',
        name: 'program',
        component: () => import('@/views/management/ProgramView.vue')
      },
      {
        path: '/manager/organization',
        name: 'organization',
        component: () => import('@/views/OrganizationView.vue')
      },
      {
        path: '/manager/cooperation',
        name: 'cooperation',
        component: () => import('@/views/CooperationView.vue')
      },
      {
        path: '/manager/toonflix',
        name: 'toonflix',
        component: () => import('@/views/ToonflixView.vue')
      }
    ]
  },
  {
    path: '/manager',
    name: 'loginLayout',
    component: () => import('@/layout/LoginLayout.vue'),
    children: [
      {
        path: '/manager',
        nama: 'login',
        component: () => import('@/views/LoginView.vue')
      }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/manager/main' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
