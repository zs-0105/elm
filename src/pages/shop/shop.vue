<template>
    <div>
        <div class='shop_wrap' v-if="!showLoading" id="shop_wrap">
            <div class="inner_wrap">
                <shop-header :shopDetailData="shopDetailData"></shop-header>

                <!-- 列表切换 -->
                <section class="change_show_type" ref="chooseType">
                    <div>
                        <span :class='{ activity_show: changeShowType == "food" }'
                            @click="changeShowType = 'food'">商品</span>
                    </div>
                    <div>
                        <span :class='{ activity_show: changeShowType == "rating" }'
                            @click="changeShowType = 'rating'">评价</span>
                    </div>
                </section>

                <transition name="fade-choose">
                    <div class="shop_list_container" v-show="changeShowType == 'food'">
                        <!-- 复制一份分类标题，做吸顶效果 -->
                        <div class="food_category_title_clone">
                            <div class="left_info ellipsis">
                                <span>{{ cloneTitleInfo.name }}</span><span>{{ cloneTitleInfo.description }}</span>
                            </div>
                            <div class="right_btn"><span @click="showTitleDetail(menuIndex)">...</span>
                                <div class="info_tip" v-if="menuIndex == TitleDetailIndex">{{ cloneTitleInfo.name
                                }}&nbsp;{{
        cloneTitleInfo.description
}}</div>
                            </div>
                        </div>
                        <div class="category_nav" id="wrapper_menu" ref="wrapperMenu">
                            <ul>
                                <li class="ellipsis" v-for="(item, index) in menuList" :key="index"
                                    :class="{ active_item: index == menuIndex }" @click="chooseMenu(index)">{{ item.name
                                    }}
                                    <span class="category_num" v-if="categoryNum[index] && item.type == 1">{{
                                            categoryNum[index]
                                    }}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="category_list" ref="menuFoodList">
                            <ul>
                                <li v-for="(item, index) in menuList" :key="index">
                                    <div class="food_category_title">
                                        <div class="left_info ellipsis">
                                            <span>{{ item.name }}</span><span>{{ item.description }}</span>
                                        </div>
                                        <div class="right_btn"><span @click="showTitleDetail(index)">...</span>
                                            <div class="info_tip" v-if="index == TitleDetailIndex">{{ item.name
                                            }}&nbsp;{{
        item.description
}}</div>
                                        </div>
                                    </div>
                                    <div class="food_item" v-for="(foods, foodindex) in item.foods" :key="foodindex"
                                        @click="$router.push({ path: '/shop/foodDetail', query: { image_path: foods.image_path, description: foods.description, month_sales: foods.month_sales, name: foods.name, rating: foods.rating, rating_count: foods.rating_count, satisfy_rate: foods.satisfy_rate, foods, shopId } })">
                                        <ul v-if="foods.attributes[0]" class="attributes_ul">
                                            <li v-show="attribute" v-for="(attribute, foodindex) in foods.attributes"
                                                :key="foodindex"
                                                :style="{ color: '#' + attribute.icon_color, borderColor: '#' + attribute.icon_color }"
                                                :class="{ attribute_new: attribute.icon_name == '新', attribute_sign: attribute.icon_name !== '新' }">
                                                <p
                                                    :style="{ color: attribute.icon_name == '新' ? '#fff' : '#' + attribute.icon_color }">
                                                    {{ attribute.icon_name == '新' ? '新品' : attribute.icon_name }}
                                                </p>
                                            </li>
                                        </ul>
                                        <div class="left_img"><img :src="imgBaseUrl + foods.image_path"></div>
                                        <div class="right_detail ellipsis">
                                            <div class="top_wrap">
                                                <h3><strong>{{ foods.name }}</strong></h3>
                                            </div>
                                            <p class="food_description_content">{{ foods.description }}</p>
                                            <p class="food_description_sale_rating">
                                                {{ foods.month_sales }}&nbsp;&nbsp;好评率{{ foods.satisfy_rate }}%</p>
                                            <p class="food_activity" v-if="foods.activity"><span
                                                    :style="{ color: '#' + foods.activity.image_text_color, borderColor: '#' + foods.activity.icon_color }">{{
                                                            foods.activity.image_text
                                                    }}</span></p>
                                            <div class="botton_tool_bar">
                                                <div class="price"><span>￥</span><span>{{ foods.specfoods[0].price
                                                }}</span>
                                                    <span v-if="foods.specifications.length">起</span>
                                                </div>
                                                <div class="add_btn">
                                                    <buy-cart :shopId='shopId' :foods='foods' @moveInCart="listenInCart"
                                                        @showChooseList="showChooseList" @showReduceTip="showReduceTip"
                                                        @showMoveDot="showMoveDotFun"></buy-cart>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </transition>
                <transition name="fade-choose" v-show="changeShowType == 'rating'">
                    <section class="rating_container" id="ratingContainer" v-show="changeShowType == 'rating'">
                        <section v-load-more="loaderMoreRating" type="2">
                            <section>

                                <header class="rating_header">
                                    <section class="rating_header_left">
                                        <p>{{ shopDetailData.rating }}</p>
                                        <p>综合评价</p>
                                        <p>高于周边商家{{ (ratingScoresData.compare_rating * 100).toFixed(1) }}%</p>
                                    </section>
                                    <section class="rating_header_right">
                                        <p>
                                            <span>服务态度</span>
                                            <rating-star :rating='ratingScoresData.service_score'></rating-star>
                                            <span class="rating_num">{{ ratingScoresData.service_score.toFixed(1)
                                            }}</span>
                                        </p>
                                        <p>
                                            <span>菜品评价</span>
                                            <rating-star :rating='ratingScoresData.food_score'></rating-star>
                                            <span class="rating_num">{{ ratingScoresData.food_score.toFixed(1) }}</span>
                                        </p>
                                        <p>
                                            <span>送达时间</span>
                                            <span class="delivery_time">{{ shopDetailData.order_lead_time }}分钟</span>
                                        </p>
                                    </section>
                                </header>
                                <ul class="tag_list_ul">
                                    <li v-for="(item, index) in ratingTagsList" :key="index"
                                        :class="{ unsatisfied: item.unsatisfied, tagActivity: ratingTageIndex == index }"
                                        @click="changeTgeIndex(index, item.name)">{{ item.name }}({{ item.count }})</li>
                                </ul>
                                <ul class="rating_list_ul">
                                    <li v-for="(item, index) in ratingList" :key="index" class="rating_list_li">
                                        <img :src="getImgPath(item.avatar)" class="user_avatar">
                                        <section class="rating_list_details">
                                            <header>
                                                <section class="username_star">
                                                    <p class="username">{{ item.username }}</p>
                                                    <p class="star_desc">
                                                        <rating-star :rating='item.rating_star'></rating-star>
                                                        <span class="time_spent_desc">{{ item.time_spent_desc }}</span>
                                                    </p>
                                                </section>
                                                <time class="rated_at">{{ item.rated_at }}</time>
                                            </header>
                                            <ul class="food_img_ul">
                                                <li v-for="(item, index) in item.item_ratings" :key="index">
                                                    <img :src="getImgPath(item.image_hash)" v-if="item.image_hash">
                                                </li>
                                            </ul>
                                            <ul class="food_name_ul">
                                                <li v-for="(item, index) in item.item_ratings" :key="index"
                                                    class="ellipsis">
                                                    {{ item.food_name }}
                                                </li>
                                            </ul>
                                        </section>
                                    </li>
                                </ul>
                            </section>
                        </section>
                    </section>
                </transition>
            </div>
            <div class="shop_bootom_cart">
                <div class="cart_list_length"><span>{{ totalNum }}</span></div>
                <div class="cart_icon_wrap" :class="{ move_in_cart: receiveInCart }" ref="cartContainer">
                    <svg class="cart_icon" @click="toggleCartList">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
                    </svg>
                </div>
                <div class="cart_price_wrap"><span>￥&nbsp;{{ totalPrice }}</span><span>配送费￥{{ deliveryFee }}</span>
                </div>
                <div class="end_cart_btn" :class="{ green_bgc: minimumOrderAmount <= 0 }">
                    <span v-if="minimumOrderAmount > 0">还差￥{{ minimumOrderAmount }}元起送</span>
                    <span v-else @click="$router.push({ path: '/confirmOrder', query: { geohash, shopId } })">去结算</span>
                </div>
            </div>
            <section>
                <transition name="fade">
                    <div class="specs_cover" @click.stop="showChooseList" v-if="showSpecs"></div>
                </transition>
                <transition name="fadeBounce">
                    <div class="specs_list" v-if="showSpecs">
                        <header class="specs_list_header">
                            <h4 class="ellipsis">{{ choosedFoods.name }}</h4>
                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1"
                                class="specs_cancel" @click="showChooseList">
                                <line x1="0" y1="0" x2="16" y2="16" stroke="#666" stroke-width="1.2" />
                                <line x1="0" y1="16" x2="16" y2="0" stroke="#666" stroke-width="1.2" />
                            </svg>
                        </header>
                        <section class="specs_details">
                            <h5 class="specs_details_title">{{ choosedFoods.specifications[0].name }}</h5>
                            <ul>
                                <li v-for="(item, itemIndex) in choosedFoods.specifications[0].values" :key="itemIndex"
                                    :class="{ specs_activity: itemIndex == specsIndex }"
                                    @click.stop="chooseSpecs(itemIndex)">
                                    {{ item }}
                                </li>
                            </ul>
                        </section>
                        <footer class="specs_footer">
                            <div class="specs_price">
                                <span>¥ </span>
                                <span>{{ choosedFoods.specfoods[specsIndex].price }}</span>
                            </div>
                            <div class="specs_addto_cart"
                                @click="addSpecs(choosedFoods.category_id, choosedFoods.item_id, choosedFoods.specfoods[specsIndex].food_id, choosedFoods.specfoods[specsIndex].name, choosedFoods.specfoods[specsIndex].price, choosedFoods.specifications[0].values[specsIndex], choosedFoods.specfoods[specsIndex].packing_fee, choosedFoods.specfoods[specsIndex].sku_id, choosedFoods.specfoods[specsIndex].stock)">
                                加入购物车</div>
                        </footer>
                    </div>
                </transition>
                <transition name="fade">
                    <p class="show_delete_tip" v-if="showDeleteTip">多规格商品只能去购物车删除哦</p>
                </transition>
                <transition appear @after-appear='afterEnter' @before-appear="beforeEnter"
                    v-for="(item, index) in showMoveDot" :key="index">
                    <span class="move_dot" v-if="item">
                        <svg class="move_liner">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                        </svg>
                    </span>
                </transition>
                <transition name="fade">
                    <div class="screen_cover" v-show="showCartList && cartFoodList.length" @click="toggleCartList">
                    </div>
                </transition>
                <transition name="toggle-cart">
                    <section class="cart_food_list" v-show="showCartList && cartFoodList.length">
                        <header>
                            <h4>购物车</h4>
                            <div @click="clearCart">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>
                                </svg>
                                <span class="clear_cart">清空</span>
                            </div>
                        </header>
                        <section class="cart_food_details" id="cartFood">
                            <ul>
                                <li v-for="(item, index) in cartFoodList" :key="index" class="cart_food_li">
                                    <div class="cart_list_num">
                                        <p class="ellipsis">{{ item.name }}</p>
                                        <p class="ellipsis">{{ item.specs }}</p>
                                    </div>
                                    <div class="cart_list_price">
                                        <span>¥</span>
                                        <span>{{ item.price }}</span>
                                    </div>
                                    <section class="cart_list_control">
                                        <span
                                            @click="removeOutCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                                            <svg>
                                                <use xmlns:xlink="http://www.w3.org/1999/xlink"
                                                    xlink:href="#cart-minus">
                                                </use>
                                            </svg>
                                        </span>
                                        <span class="cart_num">{{ item.num }}</span>
                                        <svg class="cart_add"
                                            @click="addToCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add">
                                            </use>
                                        </svg>
                                    </section>
                                </li>
                            </ul>
                        </section>
                    </section>
                </transition>
            </section>

        </div>

        <div v-else>
            <loading></loading>
            <section class="animation_opactiy shop_back_svg_container" v-if="showLoading">
                <img src="../../assets/images/shop_back_svg.svg">
            </section>
        </div>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import shopHeader from './shopHeader.vue'
import { mapState, mapMutations } from 'vuex'
import { msiteAddress, shopDetails, foodMenu, getRatingList, ratingScores, ratingTags } from '@/api'
import loading from '@/components/common/loading'
import buyCart from '@/components/common/buyCart'
import ratingStar from '@/components/common/ratingStar'
import { loadMore, getImgPath } from '@/components/common/mixin'
import BScroll from 'better-scroll'
export default {
    components: {
        shopHeader, loading,
        buyCart,
        ratingStar
    },
    created() {
        this.geohash = this.$route.query.geohash;
        this.shopId = this.$route.query.id;
        // this.$router.push('/shop/foodDetail')
        this.INIT_BUYCART();
    },
    mounted() {
        this.initData();
        this.windowHeight = window.innerHeight;
    },
    computed: {
        ...mapState([
            'latitude', 'longitude', 'cartList'
        ]),
        //配送费
        deliveryFee: function () {
            if (this.shopDetailData) {
                return this.shopDetailData.float_delivery_fee;
            } else {
                return null;
            }
        },
        //还差多少元起送，为负数时显示去结算按钮
        minimumOrderAmount: function () {
            if (this.shopDetailData) {
                return this.shopDetailData.float_minimum_order_amount - this.totalPrice;
            } else {
                return null;
            }
        },
        //当前商店购物信息
        shopCart: function () {
            return { ...this.cartList[this.shopId] };
        },
        //购物车中总共商品的数量
        totalNum: function () {
            let num = 0;
            this.cartFoodList.forEach(item => {
                num += item.num
            })
            return num
        },
        cloneTitleInfo: function () {
            return { name: this.menuList[this.menuIndex].name, description: this.menuList[this.menuIndex].description }
        }
    },

    data() {
        return {
            geohash: '', //geohash位置信息
            shopId: null, //商店id值
            showLoading: true, //显示加载动画
            changeShowType: 'food',//切换显示商品或者评价
            shopDetailData: null, //商铺详情
            showActivities: false, //是否显示活动详情
            menuList: [], //食品列表
            menuIndex: 0, //已选菜单索引值，默认为0
            menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
            shopListTop: [], //商品列表的高度集合
            TitleDetailIndex: null, //点击展示列表头部详情
            categoryNum: [], //商品类型右上角已加入购物车的数量
            totalPrice: 0, //总共价格
            cartFoodList: [], //购物车商品列表
            showCartList: false,//显示购物车列表
            receiveInCart: false, //购物车组件下落的圆点是否到达目标位置
            ratingList: null, //评价列表
            ratingOffset: 0, //评价获取数据offset值
            ratingScoresData: null, //评价总体分数
            ratingTagsList: null, //评价分类列表
            ratingTageIndex: 0, //评价分类索引
            preventRepeatRequest: false,// 防止多次触发数据请求
            ratingTagName: '',//评论的类型
            loadRatings: false, //加载更多评论是显示加载组件
            showSpecs: false,//控制显示食品规格
            specsIndex: 0, //当前选中的规格索引值
            choosedFoods: null, //当前选中视频数据
            showDeleteTip: false, //多规格商品点击减按钮，弹出提示框
            showMoveDot: [], //控制下落的小圆点显示隐藏
            windowHeight: null, //屏幕的高度
            elLeft: 0, //当前点击加按钮在网页中的绝对top值
            elBottom: 0, //当前点击加按钮在网页中的绝对left值
            ratingScroll: null, //评论页Scroll
            imgBaseUrl: process.env.VUE_APP_ImgBaseUrl,
            menuScroll: null,//menu导航栏scroll
            foodScroll: null,  //食品列表scroll
            wrapperScroll: null,//整个shop页scroll
        }
    },
    mixins: [loadMore, getImgPath],
    methods: {
        ...mapMutations([
            'RECORD_ADDRESS', 'ADD_CART', 'REDUCE_CART', 'INIT_BUYCART', 'CLEAR_CART', 'RECORD_SHOPDETAIL'
        ]),
        //初始化时获取基本数据
        async initData() {
            if (!this.latitude) {
                //获取位置信息
                let res = await msiteAddress(this.geohash);
                // 记录当前经度纬度进入vuex
                this.RECORD_ADDRESS(res);
            }
            this.shopDetailData = await shopDetails(this.shopId, this.latitude, this.longitude);

            //获取商铺食品列表
            this.menuList = await foodMenu(this.shopId);
            //评论列表
            this.ratingList = await getRatingList(this.shopId, this.ratingOffset);
            //商铺评论详情
            this.ratingScoresData = await ratingScores(this.shopId);
            //评论Tag列表
            this.ratingTagsList = await ratingTags(this.shopId);
            this.RECORD_SHOPDETAIL(this.shopDetailData)
            //隐藏加载动画
            this.hideLoading();
        },
        //获取食品列表的高度，存入shopListTop
        getFoodListHeight() {
            const listContainer = this.$refs.menuFoodList
            let temp = 0;
            if (listContainer) {
                this.wrapScroll = new BScroll('#shop_wrap', {
                    probeType: 3,
                    deceleration: 0.001,
                    bounce: false,
                    swipeTime: 2000,
                    click: true,
                });

                Array.from(listContainer.children[0].children).forEach((item, index) => {
                    this.shopListTop[index] = temp
                    temp += item.clientHeight
                })
                this.listenScroll(listContainer)
            }

        },
        //记录当前所选规格的索引值
        chooseSpecs(index) {
            this.specsIndex = index;
        },
        //多规格商品加入购物车
        addSpecs(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock) {
            this.ADD_CART({ shopid: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock });
            this.showChooseList();
        },
        //显示规格列表
        showChooseList(foods) {
            if (foods) {
                this.choosedFoods = foods;
            }
            this.showSpecs = !this.showSpecs;
            this.specsIndex = 0;
        },
        //显示提示，无法减去商品
        showReduceTip() {
            this.showDeleteTip = true;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                clearTimeout(this.timer);
                this.showDeleteTip = false;
            }, 3000);
        },
        //监听圆点是否进入购物车
        listenInCart() {
            if (!this.receiveInCart) {
                this.receiveInCart = true;
                this.$refs.cartContainer.addEventListener('animationend', () => {
                    this.receiveInCart = false;
                })
                this.$refs.cartContainer.addEventListener('webkitAnimationEnd', () => {
                    this.receiveInCart = false;
                })
            }
        },
        //隐藏动画
        hideLoading() {
            this.showLoading = false;
        },
        chooseMenu(index) {
            this.menuIndex = index
            this.menuIndexChange = false;
            this.foodScroll.scrollTo(0, -this.shopListTop[index], 400);
            this.foodScroll.on('scrollEnd', () => {
                this.menuIndexChange = true;
            })
        },
        showTitleDetail(index) {
            if (this.TitleDetailIndex == index) {
                this.TitleDetailIndex = -1
            } else {
                this.TitleDetailIndex = index
            }
        },
        //当滑动食品列表时，监听其scrollTop值来设置对应的食品列表标题的样式
        listenScroll(element) {
            this.foodScroll = new BScroll(element, {
                probeType: 3,
                deceleration: 0.001,
                bounce: false,
                swipeTime: 2000,
            });
            this.menuScroll = new BScroll('#wrapper_menu', {
                click: true,
            });

            const wrapMenuHeight = this.$refs.wrapperMenu.clientHeight;
            this.foodScroll.on('scroll', (pos) => {

                if (!this.$refs.wrapperMenu) {
                    return
                }
                this.shopListTop.forEach((item, index) => {
                    if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
                        this.menuIndex = index;
                        const menuList = this.$refs.wrapperMenu.querySelectorAll('.active_item');
                        const el = menuList[0];
                        // 使选择的菜单始终处于菜单中间位置
                        this.menuScroll.scrollToElement(el, 800, 0, -(wrapMenuHeight / 2 - 50));
                    }
                })
            })
        },
        //显示下落圆球
        showMoveDotFun(elLeft, elBottom) {
            this.showMoveDot.push(true)
            this.elLeft = elLeft;
            this.elBottom = elBottom;
        },
        beforeEnter(el) {
            el.children[0].style.opacity = 1;
            el.style.transform = `translate3d(0,${40 + this.elBottom - this.windowHeight}px,0)`;
            el.children[0].style.transform = `translate3d(${this.elLeft - 30}px,0,0)`;
        },
        afterEnter(el) {
            this.$nextTick(() => {
                el.style.transform = `translate3d(0,0,0)`;
                el.children[0].style.transform = `translate3d(0,0,0)`;
                el.style.transition = 'transform .25s cubic-bezier(0.3, -0.25, 0.7, -0.15)';//
                el.children[0].style.transition = 'transform .25s linear';
                this.showMoveDot = this.showMoveDot.map(item => false);
                el.children[0].style.opacity = 1;
                el.children[0].addEventListener('transitionend', () => {
                    this.listenInCart();
                })
                el.children[0].addEventListener('webkitAnimationEnd', () => {
                    this.listenInCart();
                })
            })

        },
        /**
        * 初始化和shopCart变化时，重新获取购物车改变过的数据，赋值 categoryNum，totalPrice，cartFoodList，整个数据流是自上而下的形式，所有的购物车数据都交给vuex统一管理，包括购物车组件中自身的商品数量，使整个数据流更加清晰
        */
        initCategoryNum() {
            let newArr = [];
            let cartFoodNum = 0;
            this.totalPrice = 0;
            this.cartFoodList = [];
            this.menuList.forEach((item, index) => {
                if (this.shopCart && this.shopCart[item.foods[0].category_id]) {
                    let num = 0;
                    Object.keys(this.shopCart[item.foods[0].category_id]).forEach(itemid => {
                        Object.keys(this.shopCart[item.foods[0].category_id][itemid]).forEach(foodid => {
                            let foodItem = this.shopCart[item.foods[0].category_id][itemid][foodid];
                            num += foodItem.num;
                            if (item.type == 1) {
                                this.totalPrice += foodItem.num * foodItem.price;
                                if (foodItem.num > 0) {

                                    this.cartFoodList[cartFoodNum] = {};
                                    this.cartFoodList[cartFoodNum].category_id = item.foods[0].category_id;
                                    this.cartFoodList[cartFoodNum].item_id = itemid;
                                    this.cartFoodList[cartFoodNum].food_id = foodid;
                                    this.cartFoodList[cartFoodNum].num = foodItem.num;
                                    this.cartFoodList[cartFoodNum].price = foodItem.price;
                                    this.cartFoodList[cartFoodNum].name = foodItem.name;
                                    this.cartFoodList[cartFoodNum].specs = foodItem.specs;
                                    cartFoodNum++;
                                }
                            }
                        })
                    })
                    newArr[index] = num;
                } else {
                    newArr[index] = 0;
                }
            })
            this.totalPrice = this.totalPrice.toFixed(2);
            this.categoryNum = [...newArr];
        },
        //清除购物车
        clearCart() {
            this.toggleCartList();
            this.CLEAR_CART(this.shopId);
        },
        //控制购物列表是否显示
        toggleCartList() {
            this.cartFoodList.length ? this.showCartList = !this.showCartList : true;
        },
        async loaderMoreRating() {
            if (this.preventRepeatRequest) {
                return
            }
            this.loadRatings = true;
            this.preventRepeatRequest = true;
            this.ratingOffset += 10;
            let ratingDate = await getRatingList(this.shopId, this.ratingOffset, this.ratingTagName);
            this.ratingList = [...this.ratingList, ...ratingDate];
            this.loadRatings = false;
            if (ratingDate.length >= 10) {
                this.preventRepeatRequest = false;
            }
        },
        //获取不同类型的评论列表
        async changeTgeIndex(index, name) {
            this.ratingTageIndex = index;
            this.ratingOffset = 0;
            this.ratingTagName = name;
            let res = await getRatingList(this.shopId, this.ratingOffset, name);
            this.ratingList = [...res];
            this.$nextTick(() => {
                this.ratingScroll.refresh();
            })
        },
    },
    watch: {
        //showLoading变化时说明组件已经获取初始化数据，在下一帧nextTick进行后续操作
        showLoading: function (value) {
            if (!value) {
                this.$nextTick(() => {
                    this.getFoodListHeight();
                    this.initCategoryNum();
                })
            }
        },
        cartList: function () {
            this.initCategoryNum()
        },
        //购物车列表发生变化，没有商铺时，隐藏
        cartFoodList: function (value) {
            if (!value.length) {
                this.showCartList = false;
            }
        },
        shopCart: function (value) {
            this.initCategoryNum();
        },
        changeShowType: function (value) {
            if (value === 'rating') {
                this.$nextTick(() => {
                    this.ratingScroll = new BScroll('#ratingContainer', {
                        probeType: 3,
                        deceleration: 0.003,
                        bounce: false,
                        swipeTime: 2000,
                        click: true,
                    });
                    this.ratingScroll.on('scroll', (pos) => {
                        if (Math.abs(Math.round(pos.y)) >= Math.abs(Math.round(this.ratingScroll.maxScrollY))) {
                            this.loaderMoreRating();
                            this.ratingScroll.refresh();
                        }
                    })
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
/* @import url(); 引入公共css类 */
@import 'assets/style/mixin.scss';

.shop_wrap {
    width: 100vw;
    // height: 74vh;
    height: 100vh;
    overflow: auto;
}

.shop_list_container {
    width: 100vw;
    // height: 74vh;
    height: 95vh;
    display: flex;
    z-index: 1;
    position: relative;
    overflow: hidden;
    transform: none;

    .food_category_title_clone {
        position: absolute;
        width: 282px;
        height: 45px;
        background-color: #f5f5f5;
        display: flex;
        align-items: center;
        top: 0;
        right: 0;
        z-index: 1;

        .left_info {
            flex: 9;

            span:nth-of-type(1) {
                font-size: 14px;
                font-weight: 600;
                padding: 10px;
            }

            span:nth-of-type(2) {
                font-size: 11px;
                font-weight: 300;
            }
        }

        .right_btn {
            flex: 1;
            padding-bottom: 10px;
            position: relative;

            .info_tip {
                position: absolute;
                width: 190px;
                background-color: #434144;
                left: -170px;
                top: 25px;
                color: #f6f6f6;
                border-radius: 5px;
                font-size: 13px;
                padding: 10px 20px;

                &::after {
                    content: '';
                    width: 15px;
                    height: 15px;
                    background-color: #434144;
                    position: absolute;
                    top: -5px;
                    right: 5px;
                    transform: rotate(45deg);
                }
            }
        }


    }

    .category_nav {
        width: 25%;
        height: 100%;
        // overflow: auto;
        background-color: #f5f5f5;

        ul {
            li {
                text-align: center;
                line-height: 50px;
                color: #777;
                border-bottom: 1px solid $bc;
                padding: 5px;
                font-size: 14px;
                position: relative;

                .category_num {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    display: inline-block;
                    line-height: 14px;
                    width: 14px;
                    height: 14px;
                    font-size: 12px;
                    // padding: 3px 0;
                    border-radius: 50%;
                    background-color: red;
                    color: #fff;
                }
            }
        }

        .active_item {
            border-left: 3px solid $blue;
            background-color: #fff;
            font-weight: 600;
        }
    }

    .category_list {
        width: 75%;
        height: 100%;
        // overflow: auto;
        background-color: #fff;

        ul {
            li {
                // position: relative;

                .food_category_title {
                    width: 100%;
                    height: 45px;
                    background-color: #f5f5f5;
                    display: flex;
                    align-items: center;
                    // position: fixed;
                    // position: absolute;
                    // top: 200;
                    // right: 0;
                    // z-index: 30;
                    // transform: none;

                    .left_info {
                        flex: 9;

                        span:nth-of-type(1) {
                            font-size: 14px;
                            font-weight: 600;
                            padding: 10px;
                        }

                        span:nth-of-type(2) {
                            font-size: 11px;
                            font-weight: 300;
                        }
                    }

                    .right_btn {
                        flex: 1;
                        padding-bottom: 10px;
                        position: relative;

                        .info_tip {
                            position: absolute;
                            width: 190px;
                            background-color: #434144;
                            left: -170px;
                            top: 25px;
                            color: #f6f6f6;
                            border-radius: 5px;
                            font-size: 13px;
                            padding: 10px 20px;

                            &::after {
                                content: '';
                                width: 15px;
                                height: 15px;
                                background-color: #434144;
                                position: absolute;
                                top: -5px;
                                right: 5px;
                                transform: rotate(45deg);
                            }
                        }
                    }


                }

                .food_item {
                    position: relative;
                    display: flex;
                    padding: 10px;
                    overflow: hidden;
                    border-bottom: 1px solid #f8f8f8;

                    .attributes_ul {


                        li {
                            position: absolute;

                            display: flex;
                            align-items: flex-end;
                            justify-content: center;
                            border: none;
                            width: 40px;
                            height: 40px;

                            p {
                                @include sc(8px, #fff);
                                transform: scale(0.8) translate(0, -0.33333vw);
                            }
                        }

                        .attribute_new {
                            top: 0;
                            left: 0;
                            transform: rotate(-45deg) translate(-0.33333vw, -7.3333vw);
                            background-color: #4cd964;
                        }

                        .attribute_sign {
                            top: 5px;
                            right: 5px;
                            width: 30px;
                            height: 20px;
                            line-height: 20px;
                            text-align: center;
                            font-size: 10px;
                            color: rgb(240, 115, 115);
                            border: 1px solid rgb(240, 115, 115);
                            border-radius: 10px;
                            display: inline-block;
                        }

                    }

                    .left_img {
                        img {
                            width: 46px;
                            height: 46px;
                        }
                    }

                    .right_detail {
                        padding: 0 10px;
                        width: 230px;

                        .top_wrap {
                            display: flex;
                            justify-content: space-between;

                            h3 {
                                font-size: 15px;
                            }
                        }

                        .food_description_content {
                            font-size: 10px;
                            color: #999;
                        }

                        .food_description_sale_rating {
                            font-size: 10px;
                        }

                        .food_activity {

                            span {
                                font-size: 10px;
                                color: rgb(241, 136, 79);
                                border: 1px solid rgb(241, 136, 79);
                                border-radius: 10px;
                                font-weight: 400;
                                padding: 0;
                                display: inline-block;
                                transform: scale(.7);
                                margin-left: -7px;
                            }
                        }

                        .botton_tool_bar {
                            display: flex;
                            justify-content: space-between;

                            .price {
                                span {
                                    font-size: 15px;
                                    color: #f60;
                                    font-weight: 600;
                                }

                                span:nth-of-type(1) {
                                    font-size: 10px;
                                    color: #f60;
                                }

                                span:nth-of-type(3) {
                                    font-weight: 500;
                                    padding-left: 5px;
                                    font-size: 10px;
                                    color: #3D3D3F;
                                }


                                .add_btn {
                                    width: 20px;
                                    height: 20px;
                                }
                            }
                        }
                    }
                }

            }
        }

    }
}

.shop_bootom_cart {
    position: fixed;
    width: 100vw;
    height: 8vh;
    bottom: 0;
    left: 0;
    background-color: #3D3D3F;
    display: flex;
    z-index: 9;

    .move_in_cart {
        animation: mymove .4s ease-in-out;
    }

    .cart_icon_wrap {
        position: absolute;
        width: 55px;
        height: 55px;
        background-color: $blue;
        padding: 10px;
        border-radius: 50%;
        border: 5px solid #444;
        top: -20px;
        left: 20px;

        svg {
            width: 24px;
            height: 24px;
        }

    }

    .cart_list_length {
        position: absolute;
        top: -25px;
        left: 60px;
        z-index: 30;

        span {
            text-align: center;
            display: inline-block;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            line-height: 18px;
            background-color: red;
            color: #fff;
            transform: scale(0.8);
        }
    }

    .cart_price_wrap {
        margin-left: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;

        span {
            color: #fff;
        }

        span:nth-of-type(1) {
            font-size: 18px;
            font-weight: 700;
            padding: 5px 0;
        }

        span:nth-of-type(2) {
            font-size: 12px;
            color: #fff;
        }
    }

    .end_cart_btn {
        position: absolute;
        top: 0;
        right: 0;
        width: 32vw;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
            font-weight: 700;
            color: #fff;
        }

        background-color: #535356;
    }

    .green_bgc {
        background-color: #4CD964;
    }
}

.shop_back_svg_container {
    position: fixed;
    @include wh(100vw, 100vh);


    img {
        @include wh(100%, 100%);
    }
}

.show_delete_tip {
    position: fixed;
    top: 50%;
    left: 15%;
    width: 70%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, .8);
    z-index: 18;
    @include sc(15px, #fff);
    text-align: center;
    padding: 10px 0;
    border: 1px;
    border-radius: 5px;
}

.specs_cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 17;
}

.specs_list {
    position: fixed;
    top: 35%;
    left: 15%;
    width: 70%;
    background-color: #fff;
    z-index: 18;
    border: 1px;
    border-radius: 5px;

    .specs_list_header {
        h4 {
            @include sc(15px, #222);
            font-weight: normal;
            text-align: center;
            padding: 10px;
        }

        .specs_cancel {
            position: absolute;
            right: 10px;
            top: 10px;
        }
    }

    .specs_details {
        padding: 10px;

        .specs_details_title {
            @include sc(15px, #666);
        }

        ul {
            display: flex;
            flex-wrap: wrap;
            padding: 10px 0;

            li {
                font-size: 15px;
                padding: 7px 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                margin-right: 10px;
                margin-bottom: 5px;
            }

            .specs_activity {
                border-color: #3199e8;
                color: #3199e8;
            }
        }
    }

    .specs_footer {
        @include fj;
        align-items: center;
        background-color: #f9f9f9;
        padding: 10px;
        border: 1px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;

        .specs_price {
            span {
                color: #ff6000;
            }

            span:nth-of-type(1) {
                font-size: 12px;
            }

            span:nth-of-type(2) {
                font-size: 18px;
                font-weight: bold;
                font-family: Helvetica Neue, Tahoma;
            }
        }

        .specs_addto_cart {
            @include wh(90px, 30px);
            background-color: #3199e8;
            border: 1px;
            border-radius: 5px;
            @include sc(15px, #fff);
            text-align: center;
            line-height: 30px;
        }
    }
}

.move_dot {
    position: fixed;
    bottom: 30px;
    left: 30px;

    svg {
        @include wh(20px, 20px);
        fill: #3190e8;
    }
}

// 购物车样式
.cart_food_list {
    position: fixed;
    width: 100%;
    padding-bottom: 60px;
    z-index: 8;
    bottom: 0;
    left: 0;
    background-color: #fff;

    header {
        @include fj;
        align-items: center;
        padding: 6px 12px;
        background-color: #eceff1;

        svg {
            @include wh(14px, 14px);
            vertical-align: middle;
        }

        h4 {
            @include sc(15px, #666);
        }

        .clear_cart {
            @include sc(14px, #666);
        }
    }

    .cart_food_details {
        background-color: #fff;
        max-height: 400px;
        overflow-y: auto;

        .cart_food_li {
            @include fj;
            padding: 12px 10px;

            .cart_list_num {
                width: 55%;

                p:nth-of-type(1) {
                    @include sc(15px, #666);
                    font-weight: bold;
                }

                p:nth-of-type(2) {
                    @include sc(10px, #666);
                }
            }

            .cart_list_price {
                font-size: 0;

                span:nth-of-type(1) {
                    @include sc(12px, #f60);
                    font-family: Helvetica Neue, Tahoma;

                }

                span:nth-of-type(2) {
                    @include sc(15px, #f60);
                    font-family: Helvetica Neue, Tahoma;
                    font-weight: bold;
                }
            }

            .cart_list_control {
                display: flex;
                align-items: center;

                span {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                svg {
                    @include wh(20px, 20px);
                    fill: #3190e8;
                }

                .specs_reduce_icon {
                    fill: #999;
                }

                .cart_num {
                    @include sc(14px, #666);
                    min-width: 20px;
                    text-align: center;
                    font-family: Helvetica Neue, Tahoma;
                }
            }
        }
    }
}

.change_show_type {
    display: flex;
    background-color: #fff;
    padding: 6px 12px;
    border-bottom: 1px solid #ebebeb;

    div {
        flex: 1;
        text-align: center;

        span {
            @include sc(15px, #666);
            padding: 5px 2px;
            border-bottom: 2.2px solid #fff;
        }

        .activity_show {
            color: #3190e8;
            border-color: #3190e8;
        }
    }
}

.rating_container {
    flex: 1;
    overflow-y: hidden;
    flex-direction: column;
    height: 95vh;

    p,
    span,
    li,
    time {
        font-family: Helvetica Neue, Tahoma, Arial;
    }

    .rating_header {
        display: flex;
        background-color: #fff;
        padding: 16px 10px;
        margin-bottom: 10px;

        .rating_header_left {
            flex: 3;
            text-align: center;

            p:nth-of-type(1) {
                @include sc(24px, #f60);
            }

            p:nth-of-type(2) {
                @include sc(15px, #666);
                margin-bottom: 2px;
            }

            p:nth-of-type(3) {
                @include sc(10px, #999);
            }
        }

        .rating_header_right {
            flex: 4;

            p {
                font-size: 15px;
                line-height: 20px;
                display: flex;
                align-items: center;
                justify-content: flex-start;

                span:nth-of-type(1) {
                    color: #666;
                    margin-right: 10px;
                }

                .rating_num {
                    width: 60px;
                    @include sc(12px, #f60);
                }

                .delivery_time {
                    @include sc(10px, #999);
                }
            }
        }
    }

    .tag_list_ul {
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        padding: 10px;

        li {
            @include sc(13px, #6d7885);
            padding: 6px 6px;
            background-color: #ebf5ff;
            border-radius: 5px;
            border: 1px;
            margin: 0 8px 5px 0;
        }

        .unsatisfied {
            background-color: #f5f5f5;
            color: #aaa;
        }

        .tagActivity {
            background-color: #3190e8;
            color: #fff;
        }
    }

    .rating_list_ul {
        background-color: #fff;
        padding: 0 10px;

        .rating_list_li {
            border-top: 1px solid #f1f1f1;
            display: flex;
            padding: 12px 0;

            .user_avatar {
                @include wh(30px, 30px);
                border: 1px;
                border-radius: 50%;
                margin-right: 16px;
            }

            .rating_list_details {
                flex: 1;

                header {
                    display: flex;
                    flex: 1;
                    justify-content: space-between;
                    margin-bottom: 6px;

                    .username_star {
                        @include sc(12px, #666);

                        .username {
                            color: #666;
                            margin-bottom: 5px;
                        }

                        .star_desc {
                            display: flex;
                            align-items: center;

                            .time_spent_desc {
                                @include sc(12px, #666);
                                margin-left: 3px;
                            }
                        }
                    }

                    .rated_at {
                        @include sc(8px, #999);
                    }
                }

                .food_img_ul {
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom: 8px;

                    li {
                        img {
                            @include wh(60px, 60px);
                            margin-right: 8px;
                            display: block;
                        }
                    }
                }

                .food_name_ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        @include sc(12px, #999);
                        width: 44px;
                        padding: 5px;
                        border: 1 solid #ebebeb;
                        border-radius: 3px;
                        margin-right: 6px;
                        margin-bottom: 4px;
                    }
                }
            }
        }
    }
}

.fade-choose-enter-active,
.fade-choose-leave-active {
    transition: opacity .5s;
}

.fade-choose-leave,
.fade-choose-leave-active {
    display: none;
}

.fade-choose-enter,
.fade-choose-leave-active {
    opacity: 0;
}

.router-slid-enter-active,
.router-slid-leave-active {
    transition: all .4s;
}

.router-slid-enter,
.router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}

.toggle-cart-enter-active,
.toggle-cart-leave-active {
    transition: all .3s ease-out;
}

.toggle-cart-enter,
.toggle-cart-leave-active {
    transform: translateY(100%);
}

.screen_cover {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .3);
    z-index: 7;
}

//购物车缩放动画
@keyframes mymove {
    0% {
        transform: scale(1)
    }

    25% {
        transform: scale(.8)
    }

    50% {
        transform: scale(1.1)
    }

    75% {
        transform: scale(.9)
    }

    100% {
        transform: scale(1)
    }
}

@-moz-keyframes mymove {
    0% {
        transform: scale(1)
    }

    25% {
        transform: scale(.8)
    }

    50% {
        transform: scale(1.1)
    }

    75% {
        transform: scale(.9)
    }

    100% {
        transform: scale(1)
    }
}

@-webkit-keyframes mymove {
    0% {
        transform: scale(1)
    }

    25% {
        transform: scale(.8)
    }

    50% {
        transform: scale(1.1)
    }

    75% {
        transform: scale(.9)
    }

    100% {
        transform: scale(1)
    }
}

@-o-keyframes mymove {
    0% {
        transform: scale(1)
    }

    25% {
        transform: scale(.8)
    }

    50% {
        transform: scale(1.1)
    }

    75% {
        transform: scale(.9)
    }

    100% {
        transform: scale(1)
    }
}
</style>