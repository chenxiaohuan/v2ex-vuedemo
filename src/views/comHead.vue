<template>
    <div>
      <header class="header-container">
        <div v-if="this.$route.path !== '/'" class="header-left" @click="$router.go(-1)"><a class="header-back">返回</a><div class="left-arrow"></div></div>
        <h1>V2EX</h1>
      </header>
      <div class="nav">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/topic/hot" class="nav-item">热门</router-link>
        <router-link to="/topic/programmer" class="nav-item">程序员</router-link>
        <router-link to="/topic/jobs" class="nav-item">酷工作</router-link>
        <router-link to="/topic" class="nav-item">全部</router-link>
      </div>
    </div>
</template>

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

  .nav-item.router-link-exact-active {
    border-bottom: 2px solid rgb(252, 55, 140);
    color: rgb(252, 55, 140);
  }

  .nav-item.router-link-active {
    color: #a9a9a9;
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
</style>
