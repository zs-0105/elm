 <template>
    <div class="page">
        <head-top head-title="我的积分" go-back='true'></head-top>
        <section class="content_container">
            <section class="content">
                <header class="content_header">
                    <span class="content_title_style">当前积分</span>
                    <section class="contetn_description">
                        <img src="../../assets/images/description.png" height="24" width="24">
                        <router-link to="/points/detail" class="content_title_style">积分说明</router-link>
                    </section>
                </header>
                <p class="content_num">
                    <span>0</span>
                    <span>分</span>
                </p>
                <div class="promit_button" @click="usePoint">积分兑换商品</div>
            </section>
        </section>
        <p class="deal_detail">最近30天积分纪录</p>
        <div class="no_log">
            <img src="../../assets/images/no-log.png">
            <p>最近30天无积分纪录</p>
            <p>快去下单赚取大量积分吧</p>
        </div>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import alertTip from '@/components/common/alertTip'

export default {
    data() {
        return {
            showAlert: false,
            alertText: null,
        }
    },
    mounted() {

    },
    components: {
        alertTip,
    },
    computed: {

    },
    methods: {
        usePoint() {
            this.showAlert = true;
            this.alertText = '快去下单赚取大量积分吧';
        }
    }
}
</script>
  
<style lang="scss" scoped>
@import 'assets/style/mixin.scss';

.page {
    padding-top: 40px;

    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.content_container {
    padding: 6px;
    background-color: $blue;

    .content {
        padding: 8px;
        background-color: #fff;
        border-radius: 3px;

        .content_header {
            @include fj;
            font-size: 15px;

            .contetn_description {
                display: flex;
                align-items: center;

                img {
                    @include wh(15px, 15px);
                    margin-right: 4px;
                }

                .content_title_style {
                    color: $blue;
                }
            }

            .content_title_style {
                color: #666;
            }
        }

        .content_num {
            span:nth-of-type(1) {
                @include sc(40px, #333);
            }

            span:nth-of-type(2) {
                @include sc(15px, #333);
            }
        }

        .promit_button {
            @include wh(100%, 40px);
            @include sc(18px, #fff);
            border-radius: 3px;
            line-height: 40px;
            margin-top: 10px;
            text-align: center;
            background-color: #fe6d47;
        }
    }
}

.deal_detail {
    @include sc(15px, #999);
    line-height: 40px;
    padding-left: 10px;
}

.no_log {
    text-align: center;
    margin-top: 20px;

    img {
        @include wh(200px, 100px);
    }

    p {
        margin-top: 10px;
        @include sc(15px, #666);
    }

    p:nth-of-type(2) {
        @include sc(10px, #999);
    }
}

.router-slid-enter-active,
.router-slid-leave-active {
    transition: all .4s;
}

.router-slid-enter,
.router-slid-leave-active {
    transform: translate3d(40px, 0, 0);
    opacity: 0;
}
</style>
