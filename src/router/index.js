import Vue from 'vue'
import Router from 'vue-router'
import Index from '../../src/views/index.vue'
import Article from '../../src/views/article.vue'
import TopicList from '../../src/views/TopicList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    // 主题清单页
    {
      path: '/topic',
      name: 'TopicList',
      component: TopicList
    },
    // 分类页
    {
      path: '/topic/:name',
      name: 'Topic',
      component: Article
    },
    // 文章页
    {
      path: '/article/:name',
      name: 'Article',
      component: Article
    },
    // 用户文章清单页
    {
      path: '/user/:name',
      name: 'User',
      component: Index
    }
  ]
})
