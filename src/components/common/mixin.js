import {getStyle,getWindowScrollTop} from '@/utils/mUtils'

export const loadMore= {
    directives:{
        'load-more':{
          bind:(el,binding)=>{
                    let windowHeight = window.screen.height;     
                    let requestFram;
                    let oldScrollTop;
                    let scrollEl;
                    let scrollType = el.attributes.type && el.attributes.type.value||1;
                    let scrollReduce = 2;
                    if (scrollType == 2) {
                        scrollEl = el;
                    } else {
                        scrollEl = document.body;
                    }
                    el.addEventListener('wheel',() => {
                        loadMore();
                     }, {passive: true})
                    el.addEventListener('touchmove', () => {
                        // 手动滑动到底部更新更多
                        loadMore();
                    }, {passive: true})
                    el.addEventListener('touchend', () => {
                        oldScrollTop=scrollType==1?getWindowScrollTop():scrollEl.scrollTop
                        // 惯性滑动到底部加载更多
                        moveEnd();
                    }, {passive: true})
    
                    const moveEnd = () => {
                        // 滑动之后的滚动回调
                        requestFram = requestAnimationFrame(() => {
                                const newScrollTop = scrollType==1?getWindowScrollTop():scrollEl.scrollTop;
                                // 将触摸滑动的时scrollTop与触摸滑动之后的惯性改变的scrolTop进行比较
                                if (newScrollTop != oldScrollTop) {
                                    oldScrollTop = newScrollTop;
                                    moveEnd()
                                } else {
                                    cancelAnimationFrame(requestFram);
                                    loadMore();
                                }
                        })
                    }
                    const loadMore = () => {
                        // 滚动元素为body
                        if(scrollType==1){
                             if (getWindowScrollTop() + windowHeight >=scrollEl.scrollHeight-scrollReduce) {
                                    binding.value();
                                }
                        }else{
                            // 滚动元素为非body
                            if(scrollEl.scrollTop+scrollEl.offsetHeight>=scrollEl.scrollHeight-scrollReduce){
                                binding.value();
                            }
                        }
                    }
          }
        }
      },
}

export const getImgPath = {
	methods: {
		//传递过来的图片地址需要处理后才能正常使用
		getImgPath(path) {
			let suffix;
			if (!path) {
				return '//elm.cangdu.org/img/default.jpg'
			}
			if (path.indexOf('jpeg') !== -1) {
				suffix = '.jpeg'
			} else {
				suffix = '.png'
			}
			let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
			return 'https://fuss10.elemecdn.com' + url
		},
	}

}