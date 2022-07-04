<template>
  <header id="top-header">
    <slot name="logo"></slot>
    <slot name="search"></slot>
    <section class="header_back" v-if="goBack" @click="$router.go(-1)">
      <span class="iconfont icon-fenxiang"></span>
    </section>
    <section class="title_head ellipsis" v-if="headTitle">
      <span class="title_text">{{ headTitle }}</span>
    </section>
    <router-link
      :to="userInfo ? '/profile' : 'login'"
      v-if="signed"
      class="header_login"
    >
      <span class="iconfont icon-my" v-if="userInfo"></span>
      <span class="login_span" v-else>登录|注册</span>
    </router-link>
    <slot name="edit"></slot>
    <slot name="msite-title"></slot>
    <slot name="changecity"></slot>
    <slot name="changeLogin"></slot>
  </header>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  components: {},
  props: ["signed", "headTitle", "goBack"],
  mounted() {
    this.getUserInfo();
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    ...mapActions(["getUserInfo"]),
  },
};
</script>

<style lang="scss" scoped>
/* @import url(); 引入公共css类 */
@import "../../assets/style/mixin";
#top-header {
  background-color: $blue;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  line-height: 45px;
  @include wh(100vw, 45px);
  .header_back {
    position: absolute;
    left: 10px;
    @include wh(10px, 30px);
    .icon-fenxiang {
      color: aliceblue;
      font-size: 25px;
    }
  }
  .header_login {
    position: absolute;
    right: 14px;
    .icon-my {
      @include wh(10px,30px);
      color: aliceblue;
      font-size:25px;
    }
    .login_span {
      color: #fff;
      font-size: 15px;
      @include wh(20px,20px);
    }
  }
  .title_head {
    width: 50%;
    @include center;
    text-align: center;
    color: #fff;
    .title_text {
      @include sc(20px, aliceblue);
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>