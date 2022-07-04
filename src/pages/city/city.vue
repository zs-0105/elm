<template>
  <div class="city_container">
    <head-top goBack="true" :headTitle="cityname">
      <span slot="changecity" class="changecity" @click="$router.push('/home')"
        >切换城市</span
      >
    </head-top>
    <form class="city_form" v-on:submit.prevent>
      <div>
        <input
          type="search"
          name="city"
          placeholder="输入学校、商务楼、地址"
          class="city_input input_style"
          required
          v-model="inputVaule"
        />
      </div>
      <div>
        <input
          type="submit"
          name="submit"
          class="city_submit input_style"
          @click="postpois"
          value="提交"
        />
      </div>
    </form>
    <header v-if="historytitle" class="pois_search_history">搜索历史</header>
    <ul class="getpois_ul">
      <li
        v-for="(item, index) in placelist"
        @click="nextpage(index, item.geohash)"
        :key="index"
      >
        <h4 class="pois_name ellipsis">{{ item.name }}</h4>
        <p class="pois_address ellipsis">{{ item.address }}</p>
      </li>
    </ul>
    <footer
      v-if="historytitle && placelist.length"
      class="clear_all_history"
      @click="clearAll"
    >
      清空所有
    </footer>
    <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
  </div>
</template>

<script>
import { currentcity, searchplace } from "@/api";
import { getStore, setStore, removeStore } from "../../utils/mUtils";
export default {
  components: {},
  data() {
    return {
      inputVaule: "", // 搜索地址
      cityid: "", // 当前城市id
      cityname: "", // 当前城市名字
      placelist: [], // 搜索城市列表
      placeHistory: [], // 历史搜索记录
      historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
      placeNone: false, // 搜索无结果，显示提示信息
    };
  },
  mounted() {
    this.cityid = this.$route.params.cityid;
    //获取当前城市名字
    currentcity(this.cityid).then((res) => {
      this.cityname = res.name;
    });
    this.placelist = JSON.parse(getStore("placeHistory")) || [];
  },
  methods: {
    postpois() {
      //输入值不为空时才发送信息
      if (this.inputVaule) {
        searchplace(this.cityid, this.inputVaule).then((res) => {
          this.historytitle = false;
          this.placelist = res;
          this.placeNone = res.length ? false : true;
        });
      }
    },
    /**
     * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
     * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
     */
    nextpage(index, geohash) {
      let history = getStore("placeHistory");
      let choosePlace = this.placelist[index];
      if (history) {
        let checkrepeat = false;
        this.placeHistory = JSON.parse(history);
        this.placeHistory.forEach((item) => {
          if (item.geohash == geohash) {
            checkrepeat = true;
          }
        });
        if (!checkrepeat) {
          this.placeHistory.push(choosePlace);
        }
      } else {
        this.placeHistory.push(choosePlace);
      }
      setStore("placeHistory", this.placeHistory);
      this.$router.push({ path: "/msite", query: { geohash } });
    },
    clearAll() {
      removeStore("placeHistory");
      this.placelist = [];
    },
  },
};
</script>

<style lang="scss" scoped>
/* @import url(); 引入公共css类 */
@import "assets/style/mixin.scss";
.city_container {
  padding-top: 40px;
}
.changecity {
  right: 14px;
  color: aliceblue;
  font-size: 15px;
  @include ct;
}
.city_form {
  background-color: #fff;
  width: 100vw;
  height: 150px;
  position: relative;
  border-top: 1px solid $bc;
  border-bottom: 1px solid $bc;
  .city_input {
    border: 1px solid $bc;
    padding: 0 5px;
    @include sc(18px, #333);
    @include cl;
    top: 30px;
  }
  .city_submit {
    @include cl;
    bottom: 30px;
    background-color: $blue;
    @include sc(15px, #fff);
  }
  .input_style {
    border-radius: 2px;
    @include wh(80%, 30px);
  }
}
.pois_search_history {
  border-top: 1px solid $bc;
  border-bottom: 1px solid $bc;
  padding-left: 0.5rem;
  @include font(0.475rem, 0.8rem);
}
.getpois_ul {
  background-color: #fff;
  border-top: 1px solid $bc;
  li {
    margin: 0 auto;
    padding-top: 0.65rem;
    border-bottom: 1px solid $bc;
    .pois_name {
      margin: 0 auto 0.35rem;
      width: 90%;
      @include sc(15px, #333);
    }
    .pois_address {
      width: 90%;
      margin: 0 auto 0.55rem;
      @include sc(15px, #999);
    }
  }
}
.search_none_place {
  margin: 0 auto;
  @include font(0.65rem, 1.75rem);
  color: #333;
  background-color: #fff;
  text-indent: 0.5rem;
}
.clear_all_history {
  @include sc(15px, #666);
  text-align: center;
  line-height: 30px;
  background-color: #fff;
}
</style>