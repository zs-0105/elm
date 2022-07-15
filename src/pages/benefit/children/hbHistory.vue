 <template>
    <div class="rating_page">
        <head-top head-title="历史红包" go-back='true'></head-top>
        <section v-if="!showLoading" id="scroll_section" class="scroll_container">
            <ul class="hongbao_list_ul">
                <li class="hongbao_list_li" v-for="item in expiredList" :key="item.id">
                    <section class="list_item">
                        <div class="list_item_left">
                            <span>¥</span>
                            <span>{{ String(item.amount).split('.')[0] }}</span>
                            <span>.</span>
                            <span>{{ String(item.amount).split('.')[1] || 0 }}</span>
                            <p>{{ item.description_map.sum_condition }}</p>
                        </div>
                        <div class="list_item_right">
                            <h4>{{ item.name }}</h4>
                            <p>{{ item.description_map.validity_periods }}</p>
                            <p>{{ item.description_map.phone }}</p>
                        </div>
                    </section>
                    <footer class="list_item_footer" v-if="item.limit_map">
                        <p>{{ item.limit_map.restaurant_flavor_ids }}</p>
                    </footer>
                    <svg class="expired">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#expired"></use>
                    </svg>
                </li>
            </ul>
        </section>
        <loading v-if="showLoading"></loading>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getExpired } from '@/api'
import loading from '@/components/common/loading'
import BScroll from 'better-scroll'

export default {
    data() {
        return {
            showAlert: false,
            alertText: null,
            showLoading: true,
            expiredList: null, //历史红包列表
        }
    },
    mounted() {
        this.initData();
    },
    components: {
        loading,
    },
    computed: {
        ...mapState([
            'userInfo',
        ]),
    },
    methods: {
        ...mapMutations([
            'CLEAR_CART'
        ]),
        async initData() {
            //获取历史红包
            if (this.userInfo) {
                this.expiredList = await getExpired(this.userInfo.user_id);
                this.showLoading = false;
                this.$nextTick(() => {
                    new BScroll('#scroll_section', {
                        deceleration: 0.001,
                        bounce: true,
                        swipeTime: 1800,
                        click: true,
                    });
                })
            }
        }
    },
    watch: {
        userInfo: function (value) {
            this.initData();
        }
    }
}
</script>
  
<style lang="scss" scoped>
@import 'assets/style/mixin.scss';

.rating_page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 40px;
    z-index: 203;
    background-color: #f1f1f1;

    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.scroll_container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 40px;
}

.hongbao_list_ul {
    padding: 20px 10px;

    .hongbao_list_li {
        background: #fff url(../../../assets/images/expired.png) repeat-x;
        background-size: 10px 5px;
        margin-bottom: 10px;
        border-radius: 5px;
        position: relative;

        .list_item {
            @include fj;
            padding: 20px 10px 16px;

            .list_item_left {
                font-size: 0;
                border-right: 1 dotted #ccc;
                flex: 1;

                span:nth-of-type(1) {
                    @include sc(15px, #ccc);
                    font-weight: bold;
                }

                span:nth-of-type(2) {
                    @include sc(40px, #ccc);
                }

                span:nth-of-type(3),
                span:nth-of-type(4) {
                    @include sc(20px, #ccc);
                    font-weight: bold;
                }

                p {
                    @include sc(10px, #999);
                }
            }

            .list_item_right {
                flex: 2;
                margin-left: 30px;

                h4 {
                    @include sc(15px, #666);
                    margin-left: -15px;
                }

                p {
                    list-style-type: disc;
                    margin-left: -15px;
                    @include sc(10px, #999);
                }
            }
        }

        .list_item_footer {
            background-color: #f9f9f9;
            padding: 10px 10px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;

            p {
                list-style-type: disc;
                @include sc(10px, #999);
                margin-left: 10px;
            }
        }

        .expired {
            fill: #ddd;
            @include wh(60px, 60px);
            top: 12px;
            right: 5px;
            position: absolute;
        }
    }
}
</style>
