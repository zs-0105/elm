 <template>
    <div class="page">
        <head-top head-title="我的余额" go-back='true'></head-top>
        <section class="content_container">
            <section class="content">
                <header class="content_header">
                    <span class="content_title_style">当前余额</span>
                    <section class="contetn_description">
                        <img src="../../assets/images/description.png" height="24" width="24">
                        <router-link to="/balance/detail" class="content_title_style">余额说明</router-link>
                    </section>
                </header>
                <p class="content_num">
                    <span>0.00</span>
                    <span>元</span>
                </p>
                <div class="promit_button">提现</div>
            </section>
        </section>
        <p class="deal_detail">交易明细</p>
        <div class="no_log">
            <img src="../../assets/images/no-log.png">
            <p>暂无明细记录</p>
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
        padding: .4rem;
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
                    margin-right: 5px;
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
            border-radius: 4px;
            line-height: 40px;
            margin-top: 20px;
            text-align: center;
            background-color: #ccc;
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
        @include wh(160px, 100px);
    }

    p {
        margin-top: 10px;
        @include sc(15px, #666);
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
