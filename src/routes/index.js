import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/main',
    name: 'defaultLayout',
    component: () => import('@/layout/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'main',
        component: () => import('@/views/MainView.vue')
      },
      {
        path: '/history',
        name: 'history',
        component: () => import('@/views/HistoryView.vue')
      },
      {
        path: '/news',
        name: 'news',
        component: () => import('@/views/NewsView.vue')
      },
      {
        path: '/news/upload',
        component: () => import('@/components/news/Upload.vue')
      },
      {
        path: '/partners',
        name: 'partners',
        component: () => import('@/views/PartnersView.vue')
      },
      {
        path: '/location',
        name: 'location',
        component: () => import('@/views/LocationView.vue')
      },
      {
        path: '/questiontype',
        name: 'questiontype',
        component: () => import('@/views/question/QuestionTypeView.vue')
      },
      {
        path: '/question',
        name: 'question',
        component: () => import('@/views/question/QuestionView.vue')
      },
      {
        path: '/question/answer',
        name: 'answer',
        component: () => import('@/views/question/AnswerView.vue')
      },
      {
        path: '/promotion',
        name: 'promotion',
        component: () => import('@/views/PromotionView.vue')
      },
      {
        path: '/portfolio',
        name: 'portfolio',
        component: () => import('@/views/PortfolioView.vue')
      },
      {
        path: '/contents',
        name: 'contents',
        component: () => import('@/views/ContentsView.vue')
      },
      {
        path: '/workspace',
        name: 'workSpace',
        component: () => import('@/views/WorkSpaceView.vue')
      },
      {
        path: '/employee',
        name: 'employee',
        component: () => import('@/views/management/EmployeeView.vue')
      },
      {
        path: '/computer',
        name: 'computer',
        component: () => import('@/views/management/ComputerView.vue')
      },
      {
        path: '/monitor',
        name: 'monitor',
        component: () => import('@/views/management/MonitorView.vue')
      },
      {
        path: '/peripheral',
        name: 'peripheral',
        component: () => import('@/views/management/PeripheralsView.vue')
      },
      {
        path: '/book',
        name: 'book',
        component: () => import('@/views/management/BookView.vue')
      },
      {
        path: '/program',
        name: 'program',
        component: () => import('@/views/management/ProgramView.vue')
      },
      {
        path: '/organization',
        name: 'organization',
        component: () => import('@/views/OrganizationView.vue')
      },
      {
        path: '/cooperation',
        name: 'cooperation',
        component: () => import('@/views/CooperationView.vue')
      },
      {
        path: '/toonflix',
        name: 'toonflix',
        component: () => import('@/views/ToonflixView.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'loginLayout',
    component: () => import('@/layout/LoginLayout.vue'),
    children: [
      {
        path: '/',
        nama: 'login',
        component: () => import('@/views/LoginView.vue')
      }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/main' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
