 <template>
    <div class="detail_page">
        <head-top :head-title="question.title" go-back='true'></head-top>
        <section id="scroll_section" class="scroll_container">
            <section v-html="markdownText" class="markdown"></section>
        </section>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import showdown from 'showdown'
import BScroll from 'better-scroll'

export default {
    data() {
        return {

        }
    },
    mounted() {
        this.$nextTick(() => {
            new BScroll('#scroll_section', {
                deceleration: 0.001,
                bounce: true,
                swipeTime: 1800,
                click: true,
            });
        })
    },
    computed: {
        ...mapState([
            'question',
        ]),
        markdownText: function () {
            //转换markDown格式
            let converter = new showdown.Converter();
            return converter.makeHtml(this.question.detail);
        }
    },
    methods: {

    }
}
</script>
  
<style lang="scss" scoped>
@import 'assets/style/mixin.scss';

.detail_page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 202;

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
    overflow-y: auto;
}

.markdown {
    font-size: 15px;
    padding: 0 15px;
    color: #666;
    padding-bottom: 40px;
}
</style>
