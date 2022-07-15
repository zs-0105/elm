<template>
    <div class='loginContainer'>
        <header-top goBack='true' headTitle="登录"></header-top>
        <!-- <div slot="changeLogin" class="change_login" @click="changeLoginWay">{{ loginWay ? "密码登录" : "短信登录" }}</div> -->
        <alert-tip v-show="showAlert" :alertText="alertText" @closeTip="closeTip"></alert-tip>
        <form class="loginForm" v-if="loginWay">
            <section class="input_container phone_number">
                <input type="text" placeholder="账号密码随便输入" name="phone" maxlength="11" v-model="phoneNumber">
                <button @click.prevent="getVerifyCode" :class="{ right_phone_number: rightPhoneNumber }"
                    v-show="!computedTime">获取验证码</button>
                <button @click.prevent v-show="computedTime">已发送({{ computedTime }}s)</button>
            </section>
            <section class="input_container">
                <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
            </section>
        </form>
        <form class="loginForm" v-else>
            <section class="input_container">
                <input type="text" placeholder="账号" v-model.lazy="userAccount">
            </section>
            <section class="input_container">
                <input v-if="!showPassword" type="password" placeholder="密码" v-model="passWord">
                <input v-else type="text" placeholder="密码" v-model="passWord">
                <div class="button_switch" :class="{ change_to_text: showPassword }">
                    <div class="circle_button" :class="{ trans_to_right: showPassword }" @click="changePassWordType">
                    </div>
                    <span>abc</span>
                    <span>...</span>
                </div>
            </section>
            <section class="input_container captcha_code_container">
                <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
                <div class="img_change_img">
                    <img v-show="captchaCodeImg" :src="captchaCodeImg">
                    <div class="change_img" @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </form>
        <p class="login_tips">
            温馨提示：未注册过的账号，登录时将自动注册
        </p>
        <p class="login_tips">
            注册过的用户可凭账号密码登录
        </p>
        <div class="login_container" @click="mobileLogin">登录</div>
        <router-link to="/forget" class="to_forget" v-if="!loginWay">重置密码？</router-link>
    </div>
</template>

<script>
import headerTop from '@/components/header/header.vue'
import alertTip from '@/components/common/alertTip.vue'
import { mapMutations } from 'vuex'
import { mobileCode, checkExsis, sendLogin, getcaptchas, accountLogin } from '../../api'
export default {
    components: {
        headerTop,
        alertTip
    },
    created() {
        this.getCaptchaCode();
    },
    data() {
        return {
            loginWay: false, //登录方式，默认短信登录
            showPassword: false, // 是否显示密码
            phoneNumber: null, //电话号码
            mobileCode: null, //短信验证码
            validate_token: null, //获取短信时返回的验证值，登录时需要
            computedTime: 0, //倒数记时
            userInfo: null, //获取到的用户信息
            userAccount: null, //用户名
            passWord: null, //密码
            captchaCodeImg: null, //验证码地址
            codeNumber: null, //验证码
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
        }
    },
    methods: {
        ...mapMutations([
            'RECORD_USERINFO',
        ]),
        closeTip() {
            this.showAlert = false
        },
        // 改变登录方式
        changeLoginWay() {
            this.loginWay = !this.loginWay
        },
        //是否显示密码
        changePassWordType() {
            this.showPassword = !this.showPassword;
        },
        // 获取验证码
        async getVerifyCode() {
            if (this.rightPhoneNumber) {
                this.computedTime = 30
                const timer = setInterval(() => {
                    this.computedTime--
                    if (this.computedTime == 0) {
                        clearInterval(timer)
                    }
                }, 1000)
                let exsis = await checkExsis(this.phoneNumber, 'mobile')
                if (exsis.message) {
                    this.showAlert = true;
                    this.alertText = exsis.message;
                    return
                } else if (!exsis.is_exists) {
                    this.showAlert = true;
                    this.alertText = '您输入的手机号尚未绑定';
                    return
                }
                const res = await mobileCode(this.phoneNumber);
                if (res.message) {
                    this.showAlert = true;
                    this.alertText = res.message;
                    return
                }
                this.validate_token = res.validate_token;
            } else {
                this.showAlert = true;
                this.alertText = '手机号码不正确';
            }
        },
        // 获取图形码
        async getCaptchaCode() {
            let res = await getcaptchas();
            this.captchaCodeImg = res.code;
            document.cookie = res.code

        },
        async mobileLogin() {
            if (this.loginWay) {
                if (!this.rightPhoneNumber) {
                    this.showAlert = true;
                    this.alertText = '手机号码不正确';
                    return
                } else if (!(/^\d{6}$/gi.test(this.mobileCode))) {
                    this.showAlert = true;
                    this.alertText = '短信验证码不正确';
                    return
                }
                //手机号登录
                this.userInfo = await sendLogin(this.mobileCode, this.phoneNumber, this.validate_token);
            } else {
                if (!this.userAccount) {
                    this.showAlert = true;
                    this.alertText = '请输入手机号/邮箱/用户名';
                    return
                } else if (!this.passWord) {
                    this.showAlert = true;
                    this.alertText = '请输入密码';
                    return
                } else if (!this.codeNumber) {
                    this.showAlert = true;
                    this.alertText = '请输入验证码';
                    return
                }
                //用户名登录
                this.userInfo = await accountLogin(this.userAccount, this.passWord, this.codeNumber);
            }
            //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
            if (!this.userInfo.user_id) {
                this.showAlert = true;
                this.alertText = this.userInfo.message;
                if (!this.loginWay) this.getCaptchaCode();
            } else {
                this.RECORD_USERINFO(this.userInfo);
                this.$router.go(-1);
            }
        }
    },
    computed: {
        //判断手机号码
        rightPhoneNumber: function () {
            return /^1\d{10}$/gi.test(this.phoneNumber)
        }
    }
}
</script>

<style lang="scss" scoped>
/* @import url(); 引入公共css类 */
@import 'assets/style/mixin.scss';

.loginContainer {
    padding-top: 40px;

    p,
    span,
    input {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.change_login {
    position: absolute;
    @include ct;
    right: 20px;
    @include sc(20px, #fff);
}

.loginForm {
    background-color: #fff;
    margin-top: 15px;

    .input_container {
        display: flex;
        justify-content: space-between;
        padding: 12px 20px;
        border-bottom: 1px solid #f1f1f1;

        input {
            @include sc(15px, #666);
            border: none;
            outline: none;
        }

        button {
            @include sc(15px, #fff);
            font-family: Helvetica Neue, Tahoma, Arial;
            padding: 8px 10px;
            border: 1px;
            border-radius: 5px;
        }

        .right_phone_number {
            background-color: #4cd964;
        }
    }

    .phone_number {
        padding: 10px, 20px;
    }

    .captcha_code_container {
        height: 45px;

        .img_change_img {
            display: flex;
            align-items: center;

            img {
                @include wh(70px, 35px);
                margin-right: 5px;
            }

            .change_img {
                display: flex;
                flex-direction: 'column';
                flex-wrap: wrap;
                width: 40px;
                justify-content: center;

                p {
                    @include sc(12px, #666);
                }

                p:nth-of-type(2) {
                    color: #3b95e9;
                    margin-top: 5px;
                }
            }
        }
    }
}

.login_tips {
    @include sc(10px, red);
    margin-left: 15px;
    line-height: 30px;

    a {
        color: #3b95e9;
    }
}

.login_container {
    margin: 0 10px 20px;
    @include sc(15px, #fff);
    background-color: #4cd964;
    padding: 10px 0;
    border: 1px;
    border-radius: 5px;
    text-align: center;
}

.button_switch {
    background-color: #ccc;
    display: flex;
    justify-content: center;
    @include wh(40px, 15px);
    padding: 5px;
    border: 1px;
    border-radius: 10px;
    position: relative;

    .circle_button {
        transition: all .3s;
        position: absolute;
        top: -5px;
        z-index: 1;
        left: -6px;
        @include wh(25px, 25px);
        box-shadow: 0 .6px 1.2px 0 rgba(0, 0, 0, .1);
        background-color: #f1f1f1;
        border-radius: 50%;
    }

    .trans_to_right {
        transform: translateX(30px);
    }

    span {
        @include sc(.45rem, #fff);
        transform: translateY(10px);
        line-height: .6rem;
    }

    span:nth-of-type(2) {
        transform: translateY(-2px);
    }
}

.change_to_text {
    background-color: #4cd964;
}

.to_forget {
    float: right;
    @include sc(15px, #3b95e9);
    margin-right: 6px;
}
</style>