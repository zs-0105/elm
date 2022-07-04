<template>
  <div class="msite_container">
    <head-top signed="msite">
      <router-link :to="'/search/geohash'" class="link_search" slot="search">
        <span class="iconfont icon-search"></span>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite_title">
        <span class="title_text ellipsis">{{ msiteTitle }}</span>
      </router-link>
    </head-top>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide food_types_container"
          v-for="(item, index) in foodTypes"
          :key="index"
        >
          <router-link
            :to="{
              path: '/food',
              query: {
                geohash,
                title: foodItem.title,
                restaurant_category_id: getCategoryId(foodItem.link),
              },
            }"
            v-for="foodItem in item"
            :key="foodItem.id"
            class="link_to_food"
          >
            <figure>
              <img :src="imgBaseUrl + foodItem.image_url" />
              <figcaption>{{ foodItem.title }}</figcaption>
            </figure>
          </router-link>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <div class="shop_list_container">
      <header class="shop_header">
        <span class="iconfont icon-elemo"></span>
        <span class="shop_header_title">附近商家</span>
      </header>
      <shop-list  :geohash="geohash"></shop-list>
    </div>
    <footer-guide></footer-guide>
  </div>
</template>

<script>
import Swiper from "swiper";
import footerGuide from "components/footer/footerGuide";
import shopList from "components/common/shopList.vue"
import { mapMutations } from "vuex";
import { msiteAddress, msiteFoodTypes, cityGuess } from "@/api";
export default {

  mounted() {
    //获取导航食品类型列表
    msiteFoodTypes(this.geohash)
      .then((res) => {
        let resLength = res.length;
        let resArr = [...res]; // 返回一个新的数组
        let foodArr = [];
        for (let i = 0, j = 0; i < resLength; i += 8, j++) {
          foodArr[j] = resArr.splice(0, 8);
        }
        this.foodTypes = foodArr;
      }).then(()=>{
        new Swiper(".swiper-container", {
                    pagination: {
                      el: ".swiper-pagination",
                    },
                    loop: true,
                });
      })
      
  },
  components: {
    footerGuide,
    shopList,
  },
  data() {
    return {
      geohash: "", // city页面传递过来的地址geohash
      msiteTitle: "请选择地址...", // msite页面头部标题
      foodTypes: [], // 食品分类列表
      hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
      imgBaseUrl: "https://fuss10.elemecdn.com", //图片域名地址
    };
  },
  async beforeMount() {
    if (!this.$route.query.geohash) {
      const address = await cityGuess();
      this.geohash = address.latitude + "," + address.longitude;
    } else {
      this.geohash = this.$route.query.geohash;
    }
    this.SAVE_GEOHASH(this.geohash);
    //获取位置信息
    let res = await msiteAddress(this.geohash);
    this.msiteTitle = res.name;
    // 记录当前经度纬度
    this.RECORD_ADDRESS(res);
    this.hasGetData = true;
  },
  methods: {
    ...mapMutations(["RECORD_ADDRESS", "SAVE_GEOHASH"]),
    // 解码url地址，求去restaurant_category_id值
    getCategoryId(url) {
      let urlData = decodeURIComponent(
        url.split("=")[1].replace("&target_name", "")
      );
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id;
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* @import url(); 引入公共css类 */
@import "@/assets/style/mixin.scss";
@import "../../assets/style/swiper.min.css";
.msite_container {
  width: 100vw;
  height: 100vh;
  padding-top: 45px;
}
.msite_title {
  @include center;
  width: 50%;
  color: #fff;
  margin-left: -25px;
  .title_text {
    @include sc(15px, #fff);
    text-align: center;
    display: block;
  }
}
.icon-search {
  color: aliceblue;
  font-size: 30px;
  padding-left:14px;
}
.swiper-container {
  width: 100vw;
  height: 200px;
  background: #fff;
  border-bottom: 1px solid $bc;
}

.food_types_container {
  display: flex;
  flex-wrap: wrap;
  .link_to_food {
    width: 25%;
    padding: 0.3rem 0rem;
    @include fj(center);
    figure {
      text-align: center;
      img {
        margin-bottom: 0.3rem;
        @include wh(35px,35px);
      }
      figcaption {
        text-align: center;
        @include sc(14px, #666);
      }
    }
  }
}
.shop_list_container {
  margin-top: 0.4rem;
  border-top: 0.025rem solid $bc;
  background-color: #fff;
  .shop_header {
    .icon-elemo {
      fill: #999;
      margin-left: 0.6rem;
      @include wh(0.6rem, 0.6rem);
    }
    .shop_header_title {
      color: #999;
      @include font(0.55rem, 1.6rem);
    }
  }
}
</style>