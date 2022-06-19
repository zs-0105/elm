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
      <span class="iconfont icon-my"></span>
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
  line-height: 1.95rem;
  @include wh(100vw, 1.95rem);
  .header_back {
    position: absolute;
    left: 0.4rem;
    @include wh(0.6rem, 1rem);
    .icon-fenxiang {
      color: aliceblue;
      font-size: 28px;
    }
  }
  .header_login {
    position: absolute;
    @include wh(0.6rem, 1rem);
    right: 1.1rem;
    .icon-my {
      color: aliceblue;
      font-size: 28px;
    }
  }
  .title_head {
    width: 50%;
    @include center;
    text-align: center;
    color: #fff;
    .title_text {
      @include sc(0.8rem, aliceblue);
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>