<template>

      <!-- 内容状态 加载中 -->
      <div v-if="!this.$store.state.latestJSON.article" class="article-loading" v-html="this.$store.state.articleLoadState.current">
      </div>
      <!-- 内容状态 加载完成 -->
      <div v-else class="panel-container panel-container_access">
        <div class="panel-container__hd" v-text="renderTopicName() || '最新'"></div>
        <div class="panel-container__bd">
          <div class="content-box">
            <div class="cells-container">
              <a :href="'/#/article/' + topic.id" class="cell-item cell-item_access" v-for="topic in this.$store.state.latestJSON.article">
                <div class="cell-item__hd">
                  <img :src="topic.member.avatar_normal" :alt="topic.member.username+'的头像'">
                </div>
                <div class="cell-item__bd">
                  <p>{{ topic.title }}</p>
                  <p><a :href="'/#/user/'+topic.member.username">提问:&nbsp;{{ topic.member.username }}</a>&nbsp;<span>回复:&nbsp;{{ topic.replies }}</span></p>
                </div>
                <span class="cell-item__ft"></span>
              </a>
            </div>
          </div>
        </div>
        <div class="panel-container__ft"></div>
      </div>
</template>

<script>
  export default{
    data () {
      return {
        // 设置主题的中文别名（这里只设置了部分别名）
        topicAlias: {
          latest: '最新',
          hot: '热门',
          programmer: '程序员',
          jobs: '酷工作'
        }
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
      // 渲染主题的中文别名
      renderTopicName () {
        if (this.$route.name === 'Article') {
          return '文章'
        } else if (this.$route.name === 'User') {
          return this.$route.params.name + '的所有文章'
        } else {
          return this.topicAlias[this.$route.params.name] || this.$route.params.name
        }
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
  .header-container {
    position: relative;
    padding: .03rem 0;
    box-sizing: border-box;
    background-color: #35495e;
  }

  .header-container h1{
    margin: 0 1.76rem;
    line-height: .8rem;
    text-align: center;
    height: .8rem;
    font-size: .36rem;
    font-weight: 400;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #fff;
  }

  .nav {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    background-color: #fff;
    height: .88rem;
    position: relative;
  }
  .nav-item {
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: -webkit-linear-gradient(top, #e5e5e5, #e5e5e5, rgba(229, 229, 229, 0)) bottom left no-repeat;
    background: linear-gradient(180deg, #e5e5e5, #e5e5e5, rgba(229, 229, 229, 0)) bottom left no-repeat;
    background-size: 100% .02rem;
    font-size: .28rem;
    text-align: center;
    line-height: .88rem;
    color: #666;
  }

  .nav-item.selected {
    border-bottom: 2px solid rgb(252, 55, 140);
    color: rgb(252, 55, 140);
  }

  .ver-hor-center{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;

    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;

    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .panel-container {
    background-color: #FFFFFF;
    margin-top: .2rem;
    position: relative;
    overflow: hidden;
  }

  .panel-container:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: .02rem solid #E5E5E5;
    color: #E5E5E5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .panel-container:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: .02rem;
    border-bottom: .02rem solid #E5E5E5;
    color: #E5E5E5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .panel-container__hd {
    padding: .28rem .3rem .1rem;
    color: #999999;
    font-size: .26rem;
    position: relative;
  }

  .panel-container__hd:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: .02rem solid #E5E5E5;
    color: #E5E5E5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: .3rem;
  }

  .panel-container__ft {

  }

  .content-box {
    padding:0;
    position: relative;
  }

  .content-box:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #E5E5E5;
    color: #E5E5E5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
  }

  .content-box:first-child:before {
    display: none;
  }

  .cells-container {
    margin-top: 0;
    background-color: #FFFFFF;
    line-height: 1.41176471;
    font-size: .34rem;
    overflow: hidden;
    position: relative;
  }

  .cell-item {
    padding: .2rem .3rem;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .cell-item:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: .02rem;
    border-top: .02rem solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: .3rem;
  }

  .cell-item:first-child:before {
    display: none;
  }

  .cell-item_access {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    color: inherit;
  }

  .cell-item__bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }

  .cell-item__bd a{
    color: #333;
  }

  .cell-item__hd img{
    display: block;
    width: .96rem;
    margin-right: .1rem;
  }

  .cell-item__ft {
    text-align: right;
    color: #999999;
  }

  .cell-item_access .cell-item__ft:after {
    content: " ";
    display: inline-block;
    height: .12rem;
    width: .12rem;
    border-width: .04rem  .04rem 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -0.04rem;
    position: absolute;
    top: 50%;
    margin-top: -0.04rem;
    right:  .04rem;
  }

  .cell-item_access .cell-item__ft {
    padding-right: .26rem;
    position: relative;
  }

  .comm-state {
    background-color: #fff;
    padding: 1rem 0;
    text-indent: 5.5em;
  }
</style>
