<template>
    <!-- 内容状态 加载中 -->
    <div v-if="!this.$store.state.latestJSON.article" class="article-loading" v-html="this.$store.state.articleLoadState.current">
    </div>
    <!-- 内容状态 加载完成 -->
    <div v-else class="weui-grids" >
        <a target="_self" :href="'/#/topic/' + item.name" class="weui-grid" v-for="item in this.$store.state.latestJSON.article">
          <div class="weui-grid__icon">
            {{item.name}}
          </div>
          <div class="weui-grid__label" v-html="item.header !== null ? item.header : '介绍为空'" :title="item.header !== null ? item.header : '介绍为空'"></div>
        </a>
    </div>
</template>

<script>
  export default {
    name: 'topic-list',
    created () {
      this.$store.dispatch('getTopic', 'nodeAll')
    }
  }
</script>

<style>
  .weui-grids {
    position: relative;
    overflow: hidden;
  }

  .weui-grids:before {
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
  }
  .weui-grid {
    position: relative;
    float: left;
    padding: .4rem .2rem;
    width: 33.33333333%;
    box-sizing: border-box;
  }

  .weui-grid:before {
    content: " ";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-right: .02rem solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
    -webkit-transform: scaleX(0.5);
    transform: scaleX(0.5);
  }

  .weui-grid:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: .02rem;
    border-bottom: .02rem solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .weui-grid__icon {
    border-bottom: 1px solid #35495e;
    text-align: center;
    color: #000000;
    font-size: .28rem;
  }

  .weui-grid__label {
    display: block;
    text-align: center;
    color: #000000;
    font-size: .28rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
