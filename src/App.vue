<template>
  <div id="app">
    <comHead></comHead>
    <p class="tip">当前页面剩余请求次数：{{ this.$store.state.remainRequest }}</p>
    <router-view></router-view>
  </div>
</template>

<script>
  import comHead from './views/comHead.vue'
  export default {
    name: 'app',
    components: {
      comHead
    }
  }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

body {
  font-family: "Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif";
  line-height: 1.5;
  color: #333;
  background-color: #f2f2f2;
  font-size: .24rem;
}

/* 样式重置 */
* {
  box-sizing: border-box; /* 使用border为边界的盒模型 */
}
body {
  margin: 0;
}
ul,li,p {
  margin:0;
  padding: 0;
}
ol,ul {
  list-style-type: none;
}
a {
  text-decoration: none;  /* 移除下划线 */
  color: #333;
}
img {
  max-width: 100%;  /* 适配移动端 */
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 400;
  font-size: inherit;
  color: inherit;
}

em, strong {
  font-style: normal;
}

/* 默认样式 */
.blue {
  color: #2196f3;
}
.article-loading {
  width: 100%;
  height: 500px;
  text-align: center;
  line-height: 500px;
}

/* 文字选中时的样式 */
::selection {
  color: red;
  background-color: #fff;
}

.tip {
  background-color: #fff;
  text-align: center;
  color: #333;
}
</style>
