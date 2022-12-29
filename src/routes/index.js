import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/main',
    name: 'defaultLayout',
    component: () => import('../layout/DefaultLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/MainView.vue')
      },
      {
        path: '/history',
        component: () => import('../views/HistoryView.vue')
      },
      {
        path: '/news',
        component: () => import('../views/NewsView.vue')
      },
      {
        path: '/news/upload',
        component: () => import('../components/news/Upload.vue')
      },
      {
        path: '/partners',
        component: () => import('../views/PartnersView.vue')
      },
      {
        path: '/location',
        component: () => import('../views/LocationView.vue')
      },
      {
        path: '/questionlist',
        component: () => import('../views/Question/QuestionListView.vue')
      },
      {
        path: '/question',
        component: () => import('../views/question/QuestionView.vue')
      },
      {
        path: '/promotion',
        component: () => import('../views/PromotionView.vue')
      },
      {
        path: '/employee',
        component: () => import('../views/management/EmployeeView.vue')
      },
      {
        path: '/computer',
        component: () => import('../views/management/ComputerView.vue')
      },
      {
        path: '/monitor',
        component: () => import('../views/management/MonitorView.vue')
      },
      {
        path: '/peripheral',
        component: () => import('../views/management/PeripheralsView.vue')
      },
      {
        path: '/book',
        component: () => import('../views/management/BookView.vue')
      },
      {
        path: '/program',
        component: () => import('../views/management/ProgramView.vue')
      },
      {
        path: '/organization',
        component: () => import('../views/OrganizationView.vue')
      },
      {
        path: '/cooperation',
        component: () => import('../views/CooperationView.vue')
      },
      {
        path: '/toonflix',
        component: () => import('../views/ToonflixView.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'loginLayout',
    component: () => import('../layout/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/LoginView.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
