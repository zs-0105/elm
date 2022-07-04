 <template>
	<div class="rating_container" :style="{'width':width+'px','height':height+'px'}">
        <section class="star_container" :style="'width:'+width+'px'">
            <svg class="grey_fill" v-for="num in 5" :key="num" :style="'height:'+height+'px'">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
            </svg>
        </section>
        <div :style="'width:' + rating*width/5 + 'px'" class="star_overflow">
            <section class="star_container" :style="'width:'+width+'px'">
                <svg class="orange_fill" v-for="num in 5" :key="num" :style="'height:'+height+'px'">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
                </svg>
            </section>
        </div>
    </div> 
</template>

<script>
    export default {
    	data(){
            return{
               
            }
        },
        mounted(){
        	
        },
        // props:['rating','height'],
        props:{
            width:{
                default:50
            },
            rating:{
                required:true
            },
            height:{
                default:10
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'assets/style/mixin';
	.rating_container{
        position: relative;
        .star_overflow{
            overflow: hidden;
            position: relative;
            height: 100%;
        }
        .star_container{
            position: absolute;
            display: flex;
            .grey_fill{
                fill: #d1d1d1;
            }
            .orange_fill{
                fill: #ff9a0d;
            }
        }
    }
</style>
