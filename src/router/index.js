import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView
    },
    {
      path: '/forgot-password',
      name: 'forgot',
      component: () => import('../views/Forgot.vue')
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/pages/Dashboard.vue')
    },
    {
      path: '/user-manage',
      name: 'Users',
      component: () => import('../views/pages/UserManage.vue')
    },
    {
      path: '/add-cateygory',
      name: 'AddCateygory',
      component: () => import('../views/pages/Category/CateygoryAdd.vue')
    },
    {
      path: '/list-cateygory',
      name: 'ListCateygory',
      component: () => import('../views/pages/Category/CateygoryList.vue')
    },
    {
      path: '/add-budget',
      name: 'AddBudget',
      component: () => import('../views/pages/Budget/BudgetAdd.vue')
    },
    {
      path: '/list-budget',
      name: 'ListBudget',
      component: () => import('../views/pages/Budget/BudgetList.vue')
    }
  ]
})

export default router
