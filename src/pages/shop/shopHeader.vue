<template>
    <div class='shop_header_wrap'>
        <nav class="goback" @click.stop="goBack">
            <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:3" />
            </svg>
        </nav>
        <div class="info_wrap" @click="$router.push('/shop/shopDetail')">
            <div class="top_wrap">
                <div class="left_img">
                    <img :src="imgBaseUrl + shopDetailData.image_path" alt="">
                </div>
                <div class="right_content">
                    <div class="shop_name">
                        <h2>{{ shopDetailData.name }}</h2>
                    </div>
                    <div class="shop_info">
                        <div class="ellipsis">
                            商家配送/{{ shopDetailData.order_lead_time }}分钟送达/配送费/{{ shopDetailData.float_delivery_fee }}￥
                        </div>
                        <div class="ellipsis">{{ promotionInfo }}</div>
                        <svg @click.stop="showClick" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
                            version="1.1" class="description_arrow">
                            <path d="M0 0 L8 7 L0 14" stroke="#fff" stroke-width="1" fill="none" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="bottom_activity" v-if="shopDetailData.activities.length">
                <div class="ellipsis">
                    <span class="tip_icon"
                        :style="{ backgroundColor: '#' + shopDetailData.activities[0].icon_color, borderColor: '#' + shopDetailData.activities[0].icon_color }">{{
                                shopDetailData.activities[0].icon_name
                        }}</span>
                    {{ shopDetailData.activities[0].description }}(app专项)
                </div>
                <div>&nbsp;&nbsp;{{ shopDetailData.activities.length }}个活动</div>
            </div>
        </div>
        <div class="cover_img">
            <img :src="imgBaseUrl + shopDetailData.image_path" alt="">
        </div>
        <transition name="fade">
            <div class="shop_info_detail_wrap" v-show="showActivities">
                <div class="shop_name">
                    <h2>{{ shopDetailData.name }}</h2>
                </div>
                <div class="mark">
                    <rating-star :rating="shopDetailData.rating" :width="140" :height="20"></rating-star>
                </div>
                <div class="info_btn">
                    优惠信息
                </div>
                <div class="info_detail_wrap">
                    <ul>
                        <li v-for="item in shopDetailData.activities" :key="item.id"><span class="activities_icon"
                                :style="{ backgroundColor: '#' + item.icon_color, borderColor: '#' + item.icon_color }">{{
                                        item.icon_name
                                }}</span>
                            <span>{{ item.description }}（APP专享）</span>
                        </li>
                    </ul>
                </div>
                <div class="info_btn">商家公告</div>
                <div class="bulletin">
                    {{ promotionInfo }}
                </div>
                <div class="close_btn" @click="showClick">
                    <svg width="60" height="60" class="close_activities">
                        <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none" />
                        <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2" />
                        <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2" />
                    </svg>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import RatingStar from '../../components/common/ratingStar.vue'
export default {
    components: {
        RatingStar,
    },
    props: ['shopDetailData'],
    data() {
        return {
            showActivities: false,
            imgBaseUrl: process.env.VUE_APP_ImgBaseUrl,
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        showClick() {
            this.showActivities = !this.showActivities
        },
    },
    mounted() {
        //获取商铺信息
    },
    computed: {
        promotionInfo: function () {
            return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。'
        },
    },
}
</script>

<style lang="scss" scoped>
/* @import url(); 引入公共css类 */
@import "assets/style/mixin.scss";

.shop_header_wrap {
    width: 100vw;
    height: 18vh;
    position: relative;
    z-index: 5;

    .cover_img {
        width: 100%;
        height: 18vh;
        position: absolute;
        top: 0;
        left: 0;

        img {
            width: 100%;
            height: 94%;
        }

        z-index: -1;
        filter: blur(10px);
    }

    .goback {
        position: fixed;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        z-index: 6;
        padding-top: 8px;
        padding-left: 8px;
    }

    .info_wrap {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        padding: 10px;

        .top_wrap {
            display: flex;

            .left_img {
                img {
                    width: 75px;
                    height: 75px;
                }

            }

            .right_content {
                padding-left: 10px;

                .shop_name {
                    h2 {
                        color: #fff;
                    }
                }

                .shop_info {
                    width: 280px;
                    font-size: 12px;
                    padding: 5px;
                    position: relative;

                    div {
                        color: #f6f6f6;
                    }

                    svg {
                        position: absolute;
                        width: 14px;
                        height: 14px;
                        bottom: 5px;
                        right: 0px;
                    }
                }
            }

        }

        .bottom_activity {
            font-size: 12px;
            padding-top: 10px;
            white-space: nowrap;

            div:nth-of-type(1) {
                width: 83%;
                vertical-align: middle;

                .tip_icon {
                    padding: 1px;
                    border: 1 solid #fff;
                    border-radius: 2px;
                    font-size: 8px;
                    display: inline-block;
                    color: #fff;
                }
            }

            div {
                color: #f6f6f6;
                display: inline-block;
                vertical-align: middle;

            }
        }
    }


    .shop_info_detail_wrap {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.8);
        z-index: 20;
        display: flex;
        align-items: center;
        flex-direction: column;

        .shop_name {
            h2 {
                color: #fff;
                padding: 20px;
            }
        }

        .info_btn {
            color: rgb(207, 202, 202);
            font-size: 20px;
            border: 1px solid rgb(207, 202, 202);
            padding: 5px 10px;
            border-radius: 20px;
            font-weight: 300;
            margin: 30px auto;
        }

        .info_detail_wrap {
            ul {
                padding: 0 15px;
                width: 100vw;

                li {
                    span {
                        color: rgb(207, 202, 202);
                        font-size: 14px;
                    }

                    .activities_icon {
                        margin: 0 5px;
                        padding: 1px;
                        border: 1 solid #fff;
                        border-radius: 2px;
                        font-size: 8px;
                        display: inline-block;
                        color: #fff;
                    }
                }
            }
        }

        .bulletin {
            color: rgb(207, 202, 202);
        }

        .close_btn {
            position: absolute;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
        }
    }

}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>