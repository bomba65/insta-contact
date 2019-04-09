import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const PagesView = () => import('@/views/PagesView/PagesView')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: 'pages',
      component: DefaultContainer,
      children: [
        {
          path: 'pages',
          name: 'Pages',
          component: PagesView
        },
      ]
    },
  ]
})
