 <template>
    <div class="info_page">
        <head-top head-title="账户信息" go-back='true'></head-top>
        <section class="profile-info">
            <section class="headportrait">
                <input type="file" class="profileinfopanel-upload" @change="uploadAvatar">
                <h2>头像</h2>
                <div class="headportrait-div">
                    <img v-if="userInfo" :src="imgBaseUrl + userInfo.avatar" class="headportrait-div-top">
                    <span class="headportrait-div-top" v-else>
                        <svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                    </span>
                    <span class="headportrait-div-bottom">
                        <svg fill="#d8d8d8">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </div>
            </section>
            <router-link to="/profile/info/setusername" class="info-router">
                <section class="headportrait headportraitwo">
                    <h2>用户名</h2>
                    <div class="headportrait-div">
                        <p>{{ username }}</p>
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </section>
            </router-link>
            <router-link to="/profile/info/address" class="info-router">
                <section class="headportrait headportraitwo headportraithree">
                    <h2>收货地址</h2>
                    <div class="headportrait-div">
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </section>
            </router-link>
            <section class="bind-phone">
                账号绑定
            </section>
            <section class="info-router" @click="changePhone">
                <section class="headportrait headportraitwo headportraithree">
                    <h2><img src="../../../assets/images/bindphone.png" style="display:inline-block;margin-right:.4rem;"
                            alt="">手机</h2>
                    <div class="headportrait-div">
                        <p>{{ infotel }}</p>
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </section>
            </section>
            <section class="bind-phone">
                安全设置
            </section>
            <router-link to="/forget" class="info-router">
                <section class="headportrait headportraitwo headportraithree">
                    <h2>登录密码</h2>
                    <div class="headportrait-div">
                        <p>修改</p>
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </section>
            </router-link>
            <section class="exitlogin" @click="exitlogin">退出登录</section>
        </section>

        <section class="coverpart" v-if="show">
            <section class="cover-background"></section>
            <section class="cover-content " :class="{ 'cover-animate': isEnter, 'cover-animate-leave': isLeave }">
                <div class="sa-icon">
                    <span class="sa-body"></span>
                    <span class="sa-dot"></span>
                </div>
                <h2>是否退出登录</h2>
                <div class="sa-botton">
                    <button class="waiting" @click="waitingThing">再等等</button>
                    <div style="display:inline-block;">
                        <button class="quitlogin" @click="outLogin">退出登录</button>
                    </div>
                </div>
            </section>
        </section>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { signout, upAvatar } from '@/api'
import alertTip from '@/components/common/alertTip'
import { getImgPath } from '@/components/common/mixin'
import { removeStore } from '@/utils/mUtils'

export default {
    data() {
        return {
            username: '',    //用户名
            resetname: '', //重置用户名
            infotel: '',     //用户手机
            avatar: '',      //用户头像
            show: false,     //显示提示框
            isEnter: true,  //是否登录
            isLeave: false, //是否退出
            showAlert: false,
            alertText: null,
            imgBaseUrl: process.env.VUE_APP_ImgBaseUrl,
        }
    },
    beforeDestroy() {
        clearTimeout(this.timer)
    },
    components: {
        alertTip,
    },
    mixins: [getImgPath],
    computed: {
        ...mapState([
            'userInfo', 'imgPath'
        ]),
    },
    methods: {
        ...mapMutations([
            'OUT_LOGIN', 'SAVE_AVANDER'
        ]),

        exitlogin() {
            this.show = true;
            this.isEnter = true;
            this.isLeave = false;
        },
        waitingThing() {
            //取消推出
            clearTimeout(this.timer)
            this.isEnter = false;
            this.isLeave = true;
            this.timer = setTimeout(() => {
                clearTimeout(this.timer)
                this.show = false;
            }, 200)
        },
        //退出登录
        async outLogin() {
            this.OUT_LOGIN();
            this.waitingThing();
            this.$router.go(-1);
            removeStore('user_id')
            await signout();
        },
        changePhone() {
            this.showAlert = true;
            this.alertText = '请在手机APP中设置';
        },
        async uploadAvatar() {
            //上传头像
            if (this.userInfo) {
                let input = document.querySelector('.profileinfopanel-upload')
                let data = new FormData();
                data.append('file', input.files[0]);
                try {
                    let res = await upAvatar(data, this.userInfo.user_id)
                    if (res.status == 1) {
                        this.userInfo.avatar = res.image_path;
                    }
                } catch (error) {
                    this.showAlert = true;
                    this.alertText = '上传失败';
                    throw new Error(error);
                }
            }
        }
    },
    watch: {
        userInfo: function (value) {
            if (value && value.user_id) {
                this.username = value.username;
                this.infotel = value.mobile;
                this.avatar = value.avatar;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/mixin.scss';

.info_page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f2f2f2;
    z-index: 202;
    padding-top: 36px;

    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.profile-info {
    @include wh(100%, 70px);

    .profileinfopanel-upload {
        display: block;
        position: absolute;
        opacity: 0;
        top: 48px;
        left: 0;
        @include wh(100%, 70px);
    }

    .headportrait {
        margin-top: 8px;
        padding: 10px 9px;
        @include fj(space-between);
        align-items: center;
        border-top: 1px solid #ddd;
        background: #fff;

        h2 {
            @include sc(15px, #333);
            font-weight: 500;
            display: flex;
            align-items: center;
        }

        .headportrait-div {
            span {
                display: inline-block;

                svg {
                    @include wh(100%, 100%);
                }
            }

            .headportrait-div-top {
                @include wh(40px, 40px);
                @include borderRadius(50%);
                vertical-align: middle;
            }

            .headportrait-div-bottom {
                @include wh(15px, 30px);
                position: relative;
                top: 7px;
            }
        }
    }

    .headportraitwo {
        margin-top: 0;
        padding: 6px 8px;

        .headportrait-div {
            @include fj(left);

            p {
                text-align: left;
                line-height: 28px;
                @include sc(15px, #999);
                margin-right: 4px;
                font-weight: 100;
                font-family: Arial;
            }

            .headportrait-div-bottom {
                top: 0;
            }
        }
    }

    .headportraithree {
        border-bottom: 1px solid #ddd;
    }

    .bind-phone {
        padding: 8px 8px;
        @include sc(15px, #666);
    }

    .exitlogin {
        width: 96%;
        margin: 28px auto 0;
        line-height: 40px;
        @include borderRadius(5px);
        text-align: center;
        background: #d8584a;
        @include sc(15px, #fff);

    }

    .exitlogin:active {
        opacity: .8;
        background: #C1C1C1;
    }
}

.info-router {
    display: block;
}

.coverpart {
    @include wh(100%, 100%);
    @include allcover;

    .cover-background {
        @include wh(100%, 100%);
        @include allcover;
        background: #000;
        z-index: 100;
        opacity: .2;
    }

    .cover-content {
        width: 94%;
        background: $fc;
        padding: 17px;
        position: absolute;
        top: 20%;
        left: 3%;
        z-index: 1000;
        @include borderRadius(5px);

        .sa-icon {
            @include wh(90px, 90px);
            border: 4px solid #f8bb86;
            @include borderRadius(50%);
            margin: 20px auto;
            position: relative;

            .sa-body {
                @include wh(5px, 47px);
                @include borderRadius(2px);
                background: #f8bb86;
                @include cl;
                top: 10px;
            }

            .sa-dot {
                @include wh(7px, 7px);
                @include borderRadius(50%);
                background: #f8bb86;
                @include cl;
                bottom: 10px;
            }
        }

        h2 {
            width: 100%;
            text-align: center;
            @include sc(25px, #575757);
            font-weight: 500;
            margin: 25px 0;
        }

        .sa-botton {
            width: 100%;
            text-align: center;

            button {
                display: inline-block;
                padding: 8px 20px;
                @include borderRadius(5px);
                @include sc(15px, $fc);
                letter-spacing: 1px;
                margin-top: 26px;
            }

            .waiting {
                background: #C1C1C1;
                margin-right: 10px;
            }

            .quitlogin {
                background: rgb(221, 107, 85);
            }
        }

    }
}

@-webkit-keyframes bounceIn {

    from,
    20%,
    40%,
    60%,
    80%,
    100% {
        -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    0% {
        opacity: 0;
        -webkit-transform: scale3d(.3, .3, .3);
        transform: scale3d(.3, .3, .3);
    }

    20% {
        -webkit-transform: scale3d(1.1, 1.1, 1.1);
        transform: scale3d(1.1, 1.1, 1.1);
    }

    40% {
        -webkit-transform: scale3d(.9, .9, .9);
        transform: scale3d(.9, .9, .9);
    }

    60% {
        opacity: 1;
        -webkit-transform: scale3d(1.03, 1.03, 1.03);
        transform: scale3d(1.03, 1.03, 1.03);
    }

    80% {
        -webkit-transform: scale3d(.97, .97, .97);
        transform: scale3d(.97, .97, .97);
    }

    100% {
        opacity: 1;
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }
}

@keyframes bounceIn {

    from,
    20%,
    40%,
    60%,
    80%,
    100% {
        -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    0% {
        opacity: 0;
        -webkit-transform: scale3d(.3, .3, .3);
        transform: scale3d(.3, .3, .3);
    }

    20% {
        -webkit-transform: scale3d(1.1, 1.1, 1.1);
        transform: scale3d(1.1, 1.1, 1.1);
    }

    40% {
        -webkit-transform: scale3d(.9, .9, .9);
        transform: scale3d(.9, .9, .9);
    }

    60% {
        opacity: 1;
        -webkit-transform: scale3d(1.03, 1.03, 1.03);
        transform: scale3d(1.03, 1.03, 1.03);
    }

    80% {
        -webkit-transform: scale3d(.97, .97, .97);
        transform: scale3d(.97, .97, .97);
    }

    100% {
        opacity: 1;
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }
}

@-webkit-keyframes zoomOut {
    from {
        opacity: 1;
    }

    50% {
        opacity: 0;
        -webkit-transform: scale3d(.3, .3, .3);
        transform: scale3d(.3, .3, .3);
    }

    100% {
        opacity: 0;
    }
}

@keyframes zoomOut {
    from {
        opacity: 1;
    }

    50% {
        opacity: 0;
        -webkit-transform: scale3d(.3, .3, .3);
        transform: scale3d(.3, .3, .3);
    }

    100% {
        opacity: 0;
    }
}

body .coverpart .cover-animate {
    transition: all 1s;
    animation: bounceIn .6s;
}

body .coverpart .cover-animate-leave {
    animation: zoomOut .4s;
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
