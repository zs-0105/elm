 <template>
    <div class="rating_page">
        <head-top head-title="搜索地址" go-back='true'></head-top>
        <section>
            <div class="add-detail">
                <input type="text" placeholder="请输入小区/写字楼/学校等" v-model="inputAdress">
                <button @click="inputThing">确认</button>
            </div>
            <div class="warnpart">为了满足商家的送餐要求，建议您从列表中选择地址</div>
            <div class="point" v-show="warning">
                <p>找不到地址？</p>
                <p>请尝试输入小区、写字楼或学校名</p>
                <p>详细地址（如门牌号）可稍后输入哦。</p>
            </div>
        </section>
        <section class="poisearch-container" v-show="adressList">
            <ul>
                <li v-for="(item, index) in adressList" @click="listClick(index)" :key="index">
                    <p>{{ item.name }}</p>
                    <p>{{ item.address }}</p>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import { getImgPath } from '@/components/common/mixin'
import { searchNearby } from '@/api'
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            warning: true,
            inputAdress: '',
            adressList: [],			//地址列表
        }
    },
    created() {
        this.inputAdress = this.addAddress ? this.addAddress : this.inputAdress

    },
    mounted() {
    },
    mixins: [getImgPath],
    computed: {
        ...mapState([
            'addAddress'
        ])
    },
    props: [],
    methods: {
        ...mapMutations([
            'SAVE_ADDDETAIL'
        ]),
        //搜索地址
        async inputThing() {
            if (!this.inputAdress) {
                return
            }
            const res = await searchNearby(this.inputAdress)
            this.adressList = res;
            this.warning = true;
            if (this.adressList.length > 0) {
                this.warning = false;
                if (this.inputAdress == '') {
                    this.adressList = [];
                    this.warning = true;
                }
            }
        },
        //选择地址
        listClick(index) {
            this.SAVE_ADDDETAIL(this.adressList[index].name);
            this.$router.go(-1);
        }
    }
}
</script>
  
<style lang="scss" scoped>
@import 'assets/style/mixin.scss';

.rating_page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f2f2f2;
    z-index: 205;
    padding-top: 40px;
    width: 100vw;
    height: 100vh;
    overflow: auto;

    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.add-detail {
    @include fj(space-between);
    background: #fff;
    padding: 10px;

    input {
        display: block;
        width: 80%;
        padding: 10px;
        background: #f2f2f2;
        border: 1px solid #ddd;
        @include borderRadius(5px);
        font-size: 15px;
    }

    button {
        display: block;
        width: 60px;
        background: #3199e8;
        @include sc(15px, #fff);
        @include borderRadius(5px);
    }
}

.warnpart {
    background: #FFF6E4;
    @include sc(15px, #FF883F);
    text-align: center;
    padding: 5px 0;
}

.point {
    @include center;
    width: 100%;

    p {
        width: 100%;
        text-align: center;
        @include sc(15px, #969696);
        margin-bottom: 10px;
    }
}

.poisearch-container {
    background: #f2f2f2;

    li {
        border-bottom: 1px solid #ccc;
        padding: 10px;

        p {
            @include sc(15px, #969696);
        }

        p:first-child {
            margin-bottom: 5px;
        }
    }

    li:last-child {
        border: 0;
    }
}
</style>
