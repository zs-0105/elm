<template>
    <section class="cart_module">
        <section v-if="!foods.specifications.length" class="cart_button">
            <transition name="showReduce">
                <span
                    @click.stop="removeOutCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, foods.specfoods[0].price, '', foods.specfoods[0].packing_fee, foods.specfoods[0].sku_id, foods.specfoods[0].stock)"
                    v-if="foodNum">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                    </svg>
                </span>
            </transition>
            <transition name="fade">
                <div class="cart_num"><span v-if="foodNum">{{ foodNum }}</span></div>
            </transition>
            <svg class="add_icon"
                @click.stop="addToCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, foods.specfoods[0].price, '', foods.specfoods[0].packing_fee, foods.specfoods[0].sku_id, foods.specfoods[0].stock, $event)">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
            </svg>
        </section>
        <section v-else class="choose_">
            <section class="choose_icon_container">
                <transition name="showReduce">
                    <svg class="specs_reduce_icon" v-if="foodNum" @click.stop="showReduceTip">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                    </svg>
                </transition>
                <transition name="fade">
                    <div class="cart_num"><span v-if="foodNum">{{ foodNum }}</span></div>
                </transition>
                <span class="show_chooselist" @click.stop="showChooseList(foods)">选规格</span>
            </section>
        </section>
    </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    components: {},
    data() {
        return {
            timer: undefined,
        }
    },
    mounted() {
    },
    methods: {
        ...mapMutations([
            'ADD_CART', 'REDUCE_CART',
        ]),
        //显示规格列表
        showChooseList(foodScroll) {
            this.$emit('showChooseList', foodScroll)
        },
        //点击多规格商品的减按钮，弹出提示
        showReduceTip() {
            this.$emit('showReduceTip')
        },
        //加入购物车，计算按钮位置。
        addToCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock, $event) {
            if (this.timer) {
                return
            } else {
                this.ADD_CART({ shopid: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock })
                const elLeft = $event.target.getBoundingClientRect().left;
                const elBottom = $event.target.getBoundingClientRect().bottom;
                this.$emit('showMoveDot', elLeft, elBottom);
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer)
                    this.timer = undefined
                }, 500)
            }

        },
        //移出购物车
        removeOutCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock) {
            if (this.foodNum > 0) {
                this.REDUCE_CART({ shopid: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock });
            }
        },
    },
    props: ['foods', 'shopId'],
    computed: {
        ...mapState([
            'cartList'
        ]),
        /**
         * 监听cartList变化，更新当前商铺的购物车信息shopCart，同时返回一个新的对象
         */
        shopCart: function () {
            return Object.assign({}, this.cartList[this.shopId]);
        },
        //shopCart变化的时候重新计算当前商品的数量
        foodNum: function () {
            let category_id = this.foods.category_id;
            let item_id = this.foods.item_id;
            if (this.shopCart && this.shopCart[category_id] && this.shopCart[category_id][item_id]) {
                let num = 0;
                Object.values(this.shopCart[category_id][item_id]).forEach((item, index) => {
                    num += item.num;
                })
                return num;
            } else {
                return 0;
            }
        },
    }
}
</script>

<style lang="scss" scoped>
/* @import url(); 引入公共css类 */
@import 'assets/style/mixin.scss';

.cart_module {
    .add_icon {
        position: relative;
    }

    .cart_button {
        display: flex;
        line-height: 13px;
    }

    svg {
        @include wh(20px, 20px);
        fill: #3190e8;
    }

    .specs_reduce_icon {
        fill: #999;
    }

    .cart_num {
        min-width: 20px;
        text-align: center;

        span {
            @include sc(13px, #666);
            font-family: Helvetica Neue, Tahoma;
        }
    }

    .choose_ {
        .choose_icon_container {
            display: flex;
            justify-content: center;
            align-items: center;



            .show_chooselist {
                display: block;
                @include sc(14px, #fff);
                padding: 2px 5px;
                background-color: $blue;
                border-radius: 5px;
                border: 1px solid $blue;
            }

            svg {
                padding-top: 4px;
            }
        }
    }
}


.showReduce-enter-active,
.showReduce-leave-active {
    transition: all .3s ease-out;
}

.showReduce-enter,
.showReduce-leave-active {
    opacity: 0;
    transform: translateX(20px);
}

.fade-enter-active,
.fade-leave-active {
    transition: all .3s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>