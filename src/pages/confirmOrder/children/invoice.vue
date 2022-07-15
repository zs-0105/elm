 <template>
    <div class="rating_page">
        <head-top head-title="选择发票抬头" go-back='true'></head-top>
        <section class="choose_invoice">
            <span>不需要开发票</span>
            <svg @click="chooseInvoice" :class="{ choosed: invoice }">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
            </svg>
        </section>
        <div class="determine" @click="confrimInvoice">确定</div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            invoice: false, //是否需要发票
        }
    },
    components: {
    },
    props: [],
    methods: {
        ...mapMutations([
            'CONFIRM_INVOICE'
        ]),
        //是否选择发票
        chooseInvoice() {
            this.invoice = !this.invoice;
        },
        //保存发票信息
        confrimInvoice() {
            this.CONFIRM_INVOICE(this.invoice);
            this.$router.go(-1);
        },
    }
}
</script>
  
<style lang="scss" scoped>
@import '@/assets/style/mixin.scss';

.rating_page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 204;
    padding-top: 40px;

    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.choose_invoice {
    @include fj;
    align-items: center;
    background-color: #fff;
    line-height: 50px;
    margin-top: 10px;
    padding: 0 14px;

    span {
        @include sc(15px, #333);
    }

    svg {
        @include wh(16px, 16px);
        fill: #999;
    }

    .choosed {
        fill: #4cd964;
    }
}

.determine {
    background-color: #4cd964;
    @include sc(14px, #fff);
    text-align: center;
    margin: 0 14px;
    line-height: 36px;
    border-radius: 5px;
    margin-top: 10px;
}
</style>
