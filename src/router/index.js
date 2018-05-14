import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import IndexMain from '@/view/indexMain'
import List from '@/view/list'
import Cart from '@/view/cart'
import User from '@/view/user'
import Login from '@/view/login'
import Register from '@/view/register'
import listItem from '@/view/listItem'
import Detail from '@/view/detail'
import MemberIndex from '@/view/member/index'
//import notFound from '@/view/notFound';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '*',
    //   name:'notFound',
    //   component: notFound
    // },
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/',
          name:'IndexMain',
          component: IndexMain
        },{
          path: '/list',
          name: 'list',
          component: List
        },{
          path: '/cart',
          name: 'cart',
          component: Cart
        },{
          path: '/listItem',
          name: 'listItem',
          component: listItem
        },{
          path: 'member',
          name: 'memberIndex',
          component: MemberIndex
        }
      ]
    },{
      path: '/user',
      name: 'user',
      component: User
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/register',
      name: 'register',
      component: Register
    },{
      path: '/detail',
      name: 'detail',
      component: Detail
    }
  ]
})
