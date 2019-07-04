import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store/modules/auth'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')
const PagesContainer = () => import('@/containers/PagesContainer')

// Views
const PagesView = () => import('@/views/PagesView/PagesView')
const LinksView = () => import('@/views/LinksView/LinksView')
const SettingsView = () => import('@/views/SettingsView/SettingsView')
const ShopView = () => import('@/views/ShopView/ShopView')

// Views - Pages
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')
const Forgot = () => import('@/views/pages/Forgot')
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')

// Template
const Main = () => import('@/views/Template/Main')
const Basket = () => import('@/views/Template/Basket')
const Product = () => import('@/views/Template/Product')
const Shop = () => import('@/views/Template/Shop')

Vue.use(Router)

export const unrequireAuth = (to, from, next)  => {
  const isLogged = store.getters['isLogged']
  console.log(isLogged)
  if (!isLogged) {
    next('/login')
  } else {
    next()
  }
}

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: 'links',
      beforeEnter: unrequireAuth,
      component: DefaultContainer,
      children: [
        {
          path: 'links',
          name: 'Links',
          component: LinksView
        },
        {
          path: ':link/pages/:page',
          name: 'Pages',
          redirect: '',
          component: PagesContainer,
          children: [
            {
              path: '',
              name: 'Pages',
              component: PagesView
            },
            {
              path: 'shop',
              name: 'Shop',
              component: ShopView
            },
            {
              path: 'settings',
              name: 'Settings',
              component: SettingsView
            },
          ]
        },
      ]
    },
    {
      path: '/template',
      name: 'Template',
      component: Main,
    },
    {
      path: '/template/shop',
      name: 'ShopTemplate',
      component: Shop,
    },
    {
      path: '/template/shop/basket',
      name: 'BasketTemplate',
      component: Basket,
    },
    {
      path: '/template/shop/product',
      name: 'ProductTemplate',
      component: Product,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/forgot',
      name: 'Forgot',
      component: Forgot,
    },
    {
      path: '/500',
      name: 'Page500',
      component: Page500,
    },
    {
        path: '**',
        name: 'Page404',
        component: Page404
    },
  ]
})
