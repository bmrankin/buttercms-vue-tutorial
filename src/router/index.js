import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CustomersHome from '@/components/CustomersHome'
import CustomerPage from '@/components/CustomerPage'
import FAQ from '@/components/FAQ'
import BlogHome from '@/components/BlogHome'
import BlogPost from '@/components/BlogPost'
import RssAtomSitemap from '@/components/RssAtomSitemap'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/customers/',
      name: 'customers-home',
      component: CustomersHome
    },
    {
      path: '/customers/:slug',
      name: 'customer-page',
      component: CustomerPage
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQ
    },
    {
      path: '/blog/',
      name: 'blog-home',
      component: BlogHome
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: BlogPost
    },
    {
      path: '/rss',
      name: 'rss',
      component: RssAtomSitemap
    },
  ]
})
