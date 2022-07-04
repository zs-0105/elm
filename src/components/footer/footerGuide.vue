<template>
  <div class="footer_container">
    <div
      class="foot_item"
      @click="changCurrent('/msite')"
      :class="$route.path.indexOf('msite') !== -1 ? 'item_active' : ''"
    >
      <span class="iconfont icon-elemo"></span>
      <span>外卖</span>
    </div>
    <div
      class="foot_item"
      @click="changCurrent('/search')"
      :class="$route.path.indexOf('search') !== -1 ? 'item_active' : ''"
    >
      <span class="iconfont icon-zhinanzhen"></span>
      <span>搜索</span>
    </div>
    <div
      class="foot_item"
      @click="changCurrent('/order')"
      :class="$route.path.indexOf('order') !== -1 ? 'item_active' : ''"
    >
      <span class="iconfont icon-dingdan"></span>
      <span>订单</span>
    </div>
    <div
      class="foot_item"
      @click="changCurrent('/profile')"
      :class="$route.path.indexOf('profile') !== -1 ? 'item_active' : ''"
    >
      <span class="iconfont icon-my"></span>
      <span>我的</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    changCurrent(path) {
      this.$router.push({
        path,
        query: {
          geohash: this.geohash,
        },
      });
    },
  },
  computed: {
    ...mapState(["geohash"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin.scss";
/* @import url(); 引入公共css类 */
.footer_container {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 45px;
  border-top: 1px solid $bc;
  display: flex;
  z-index: 100;
  background-color: #fff;
  .foot_item {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span:nth-of-type(1) {
      font-size: 20px;
      color: #666;
    }
    span:nth-of-type(2) {
      font-size: 15px;
      color: #666;
    }
  }
}
.item_active {
  span {
    color: $blue !important;
  }
}
</style>