<template>
    <div class='tip_wrap'>
        <section class="tip_text_container">
            <div class="tip_icon">
                <span></span>
                <span></span>
            </div>
            <p class="tip_text">{{ alertText }}</p>
            <div class="confrim" @click="closeTip">确认</div>
        </section>
    </div>
</template>

<script>
export default {
    components: {},
    props: ['alertText'],
    data() {
        return {}
    },
    methods: {
        closeTip() {
            this.$emit('closeTip')
        }
    },
}
</script>

<style lang="scss" scoped>
/* @import url(); 引入公共css类 */
@keyframes tipMove {
    0% {
        transform: scale(1);
    }

    35% {
        transform: scale(.8);
    }

    70% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

.tip_wrap {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 200;
}

.tip_text_container {
    width: 250px;
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -125px;
    background-color: #fff;
    border-radius: 5px;
    animation: tipMove .4s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 20px;

    .tip_icon {
        width: 70px;
        height: 70px;
        border: 0.15rem solid #f8cb86;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        span:nth-of-type(1) {
            width: 2.5px;
            height: 35px;
            background-color: #f8cb86;
        }

        span:nth-of-type(2) {
            width: 5px;
            height: 5px;
            border: 1px;
            border-radius: 50%;
            margin-top: .2rem;
            background-color: #f8cb86;
        }
    }

    .tip_text {
        padding: 10px 0;
        color: #333;
    }

    .confrim {
        font-size: 20px;
        color: #fff;
        font-weight: bold;
        margin-top: 26px;
        background-color: #4cd964;
        width: 100%;
        text-align: center;
        line-height: 38px;
        border: 1px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
}
</style>