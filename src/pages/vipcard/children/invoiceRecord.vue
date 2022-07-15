 <template>
    <div class="page_container">
        <head-top head-title="购买记录" go-back='true'></head-top>
        <!-- 没有办过会员卡，获取不到数据，只好写死 -->
        <section class="invoice_contianer">
            <img src="../../../assets/images/no-log.png">
            <p>没有购买记录</p>
        </section>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {

        }
    },
    mounted() {

    },
    computed: {
        ...mapState([
            'userInfo',
        ]),
    },
    methods: {

    }
}
</script>
  
<style lang="scss" scoped>
@import 'assets/style/mixin.scss';

.page_container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 202;
    padding-top: 40px;

    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.invoice_contianer {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        @include wh(160px, 100px);
        margin-top: 100px;
    }

    p {
        @include sc(15px, #999);
        margin-top: 16px;
    }
}
</style>
