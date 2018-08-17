import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import IndexMain from '@/view/indexMain'
import List from '@/view/list'
import Cart from '@/view/cart'
import User from '@/view/user'
import Login from '@/view/member/login'
import Register from '@/view/member/register'
import listItem from '@/view/listItem'
import Detail from '@/view/detail'
import MemberIndex from '@/view/member/index'
import MemberOrderIndex from '@/view/member/order/index'
import MemberOrderList from '@/view/member/order/orderList'
import MemberPendingPayment from '@/view/member/order/pendingPayment'
import MemberPendingShipment from '@/view/member/order/pendingShipment'
import MemberReceiverList from '@/view/member/receiver/list'
import MemberReceiverAdd from '@/view/member/receiver/add'
import MemberReceiverModify from '@/view/member/receiver/modify'
import MemberProfile from '@/view/member/profile'
import MemberContact from '@/view/member/contact'
import Checkout from '@/view/checkout/index'
import Payment from '@/view/payment'
import CheckoutReceiverList from '@/view/checkout/receiver/list'
import CheckoutReceiverAdd from '@/view/checkout/receiver/add'
import CheckoutReceiverModify from '@/view/checkout/receiver/modify'
import notFound from '@/view/notFound';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/',
          name:'IndexMain',
          component: IndexMain,
        },{
          path: '/list',
          name: 'list',
          component: List
        },{
          path: '/cart',
          name: 'cart',
          component: Cart,
          meta:{requiresAuth:true}
        },{
          path: '/listItem',
          name: 'listItem',
          component: listItem
        },{
          path: 'member',
          name: 'memberIndex',
          component: MemberIndex,
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
    },
    {
      path: '/order',
      name: 'orderIndex',
      component: MemberOrderIndex,
      children: [
        {
          path: '/',
          name: 'orderList',
          component: MemberOrderList
        },{
          path: '/pendingPayment',
          name: 'pendingPayment',
          component: MemberPendingPayment
        },{
          path: '/pendingShipment',
          name: 'pendingShipment',
          component: MemberPendingShipment
        }
      ]
    },{
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },{
      path: '/payment',
      name: 'payment',
      component: Payment
    },
    // {
    //   path: '/member/order/orderList',
    //   name: 'orderList',
    //   component: MemberOrderList
    // },{
    //   path: '/member/order/pendingPayment',
    //   name: 'pendingPayment',
    //   component: MemberPendingPayment
    // },{
    //   path: '/member/order/pendingShipment',
    //   name: 'pendingShipment',
    //   component: MemberPendingShipment
    // },
    {
      path: '/member/receiver/list',
      name: 'receiverList',
      component: MemberReceiverList
    },{
      path: '/member/receiver/add',
      name: 'receiverAdd',
      component: MemberReceiverAdd
    },{
      path: '/member/receiver/modify',
      name: 'receiverModify',
      component: MemberReceiverModify
    },{
      path: '/checkout/receiver/list',
      name: 'checkoutReceiverList',
      component: CheckoutReceiverList
    },{
      path: '/checkout/receiver/add',
      name: 'checkoutReceiverAdd',
      component: CheckoutReceiverAdd
    },{
      path: '/checkout/receiver/modify',
      name: 'checkoutReceiverModify',
      component: CheckoutReceiverModify
    },{
      path: '/member/profile',
      name: 'profile',
      component: MemberProfile
    },{
      path: '/member/contact',
      name: 'contact',
      component: MemberContact
    },
    // {path: "*", redirect: "/"},
    // {path: "*", redirect: {name: 'index'}},
    {
      path: '*',
      name:'notFound',
      component: notFound
    },
  ]
})
