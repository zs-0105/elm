<template>
  <div id="app">
    <transition name="route-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="route-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <svg-icon></svg-icon>	
  </div>
</template>
<script>
	import svgIcon from './components/common/svg';
  	export default {
    	components:{
            svgIcon
        },
  	}

</script>
<style lang="scss">
@import url("assets/style/commen.scss");
@import url("assets/font/iconfont.css");

.route-fade-enter-active,
.route-fade-leave-active {
  transition: opacity 0.15s;
}
.route-fade-enter,
.route-fade-leave-active {
  opacity: 0;
}
</style>
