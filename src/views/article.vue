<template>
  <div>
    <div class="panel-container panel-container_access">
      <div class="panel-container__hd">文章</div>
      <div class="panel-container__bd">
        <div class="weui-media-box weui-media-box_text" v-for="topic in this.$store.state.latestJSON.article">
          <a :href="'/#/article/' + topic.id"><h4 class="weui-media-box__title">{{ topic.title }}</h4></a>
          <div class="cells-container">
            <div class="cell-item cell-item_access" style="padding: 0;">
              <div class="cell-item__hd">
                <img :src="topic.member.avatar_normal" :alt="topic.member.username+'的头像'">
              </div>
              <div class="cell-item__bd">
                <p><a :href="'/#/user/'+topic.member.username">{{ topic.member.username }}</a></p>
                <p>回复:&nbsp;{{ topic.replies }}</p>
              </div>
            </div>
          </div>
          <div class="weui-media-box__desc" v-html="compiledMarkdown(topic.content)" style="margin-top: .2rem;"></div>
        </div>
      </div>
      <div class="panel-container__ft"></div>
    </div>

    <!-- 评论状态 不加载 -->
    <div v-if="this.$store.state.latestJSON.comm === null"></div>
    <!-- 评论状态 加载中 -->
    <div v-else-if="this.$store.state.latestJSON.comm === 'loading'" class="comm-state">
      评论加载中
    </div>
    <!-- 评论状态 为空 -->
    <div v-else-if="this.$store.state.latestJSON.comm.length === 0" class="comm-state">
      评论为空
    </div>
    <!-- 评论状态 加载完成 -->
    <div v-else>
      <div class="cells-container">
        <!-- 从Vuex中加载评论 -->
        <div class="cell-item cell-item_access" v-for="comm in this.$store.state.latestJSON.comm">
          <div class="cell-item__hd">
            <!-- 渲染 头像 -->
            <img :src="comm.member.avatar_normal" :alt="comm.member.username+'的头像'">
          </div>
          <div class="cell-item__bd">
            <!-- 渲染 用户名 -->
            <p class="info-user"><a :href="'/#/user/'+comm.member.username">{{ comm.member.username }}</a></p>
            <!-- 渲染 评论 -->
            <p class="info-comm">{{ comm.content }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default{
    data () {
      return {

      }
    },
    created () {
      // 首屏加载
      this.updateVal()
    },
    updated () {
      // 执行图片懒加载
      this.$store.commit('imgLazyLoad')
    },
    watch: {
      // 路由改变则重新渲染页面
      '$route': 'updateVal'
    },
    methods: {
      // 传入markdown格式内容
      // 返回渲染后的HTML结构
      compiledMarkdown (txt) {
        return this.$marked(txt, {sanitize: true})
      },
      // 渲染页面
      updateVal () {
        // 执行之前先清空评论内容
        // 修复从文章页跳转到用户文章列表页时，最后会显示上一次的评论的问题
        this.$store.commit('setCommToNull')
        // 渲染页面
        if (this.$route.name === 'Article') {
          // 渲染文章页
          // 获取主题
          this.$store.dispatch('getTopicByParams', {
            name: this.$route.name,
            params: this.$route.params.name
          })
          // 获取评论
          this.$store.dispatch('getCommByArticle', {
            name: 'comm',
            params: this.$route.params.name
          })
          this.log('router')
        } else if (this.$route.path !== '/' && this.$route.params.name !== 'hot' && this.$route.params.name !== 'latest') {
          // 渲染首页以及热门和最新主题
          this.$store.dispatch('getTopicByParams', {
            name: this.$route.name,
            params: this.$route.params.name
          })
          this.val = this.$store.getters.getApiVal
          this.log('router')
        } else {
          // 渲染其他主题
          this.$store.dispatch('getTopic', this.$route.params.name)
          this.val = this.$store.getters.getApiVal
          this.log('router')
        }
      },
      // 调试代码
      log (type) {
        if (type === 'router') {
          console.log('router: ' + this.$route)
          console.log('paramsName: ' + this.$route.params.name)
        }
      }
    }
  }
</script>

<style>
  .header-left {
    position: absolute;
    top: .28rem;
    left: .36rem;
    display: block;
    font-size: .28rem;
    line-height: .42rem;
    color: #ccc;
  }

  .header-back {
    float: left;
    margin-right: .16rem;
    padding-left: .32rem;
    color: #ccc;
  }

  .left-arrow {
    position: absolute;
    width: .6rem;
    height: .6rem;
    top: -0.1rem;
    left: -0.1rem;
  }

  .left-arrow:before {
    content: "";
    position: absolute;
    width: .24rem;
    height: .24rem;
    border: .02rem solid #ccc;
    border-width: .02rem 0 0 .02rem;
    -webkit-transform: rotate(315deg);
    transform: rotate(315deg);
    top: .16rem;
    left: .14rem;
  }

  .weui-media-box {
    padding: .3rem;
    position: relative;
  }
  .weui-media-box__title {
    font-weight: 400;
    font-size: .34rem;
    width: auto;
    //overflow: hidden;
    //text-overflow: ellipsis;
    //white-space: nowrap;
    word-wrap: normal;
    word-wrap: break-word;
    word-break: break-all;
  }
  .weui-media-box_text .weui-media-box__title {
    margin-bottom: .16rem;
  }
  .weui-media-box__desc {
    color: #999999;
    font-size: .26rem;
    line-height: 1.2;
  }

  .weui-media-box__desc img{
    max-width: 100%;
    height: auto;
  }

  .weui-media-box__desc a {
    word-break: break-all;
  }

  .info-comm {
    word-break: break-all;
  }
</style>
