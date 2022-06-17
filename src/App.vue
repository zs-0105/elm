<template>
  <div id="app">
    <transition name="route-fade" mode="out-in" >
     <keep-alive>
       <router-view v-if="$route.meta.keepAlive"></router-view>
     </keep-alive>
    </transition>
    <transition name="route-fade" mode="out-in" >
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<style lang="scss">
@import url('./style/commen.scss');
    .route-fade-enter-active,.route-fade-leave-active{
      transition: opacity .3s;
    }
    .route-fade-enter,.route-fade-leave-active{
      opacity: 0;
    }
</style>
