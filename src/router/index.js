import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const PagesView = () => import('@/views/PagesView/PagesView')
const LinksView = () => import('@/views/LinksView/LinksView')

// Views - Pages
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: 'links',
      component: DefaultContainer,
      children: [
        {
          path: 'links',
          name: 'Links',
          component: LinksView
        },
        {
          path: 'pages/:link',
          name: 'Pages',
          component: PagesView
        },
      ]
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
      path: '/500',
      name: 'Page500',
      component: Page500,
    },
    {
        path: '**',
        name: 'Page404',
        component: Page404
    }
  ]
})
