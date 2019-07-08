<template>
    <swiper :options="swiperOptions" ref="swiper">
      <!-- 下拉 -->
        <div class="mine-scroll-down" v-if="pullDown">
          <me-loading :text="pullDownText" inline ref="pullDownLoading"></me-loading>
        </div>
        <swiper-slide>
            <slot></slot>
        </swiper-slide>
        <!-- 上拉 -->
        <div class="mine-scroll-up" v-if="pullUp">
          <me-loading :text="pullUpText" inline ref="pullUpLoading" />
        </div>
        <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
    </swiper>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import MeLoading from 'base/loading';
  import {
    PULL_DOWN_HEIGHT,
    PULL_DOWN_TEXT_INIT,
    PULL_DOWN_TEXT_START,
    PULL_DOWN_TEXT_ING,
    PULL_DOWN_TEXT_END,

    PULL_UP_HEIGHT,
    PULL_UP_TEXT_INIT,
    PULL_UP_TEXT_START,
    PULL_UP_TEXT_ING,
    PULL_UP_TEXT_END
  } from './config';

  export default {
    name: 'MeScroll',
    components: {
      swiper,
      swiperSlide,
      MeLoading
    },
    props: {
      scrollbar: {
        type: Boolean,
        default: true
      },
      data: {
        type: [Array, Object]
      },
      pullDown: {
        type: Boolean,
        default: false
      },
      pullUp: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      data() {
        console.log('watch data scroll');
        this.update();
      }
    },
    created() {
      this.init();
    },
    methods: {
      // API
      update() {
        this.$nextTick(() => {
          this.$refs.swiper && this.$refs.swiper.swiper.update();
        });
      },

      scrollEnd() {
        this.$emit('scroll-end', this.$refs.swiper.swiper.translate, this.$refs.swiper.swiper);
      },
      scrollToTop(need, runCallBacks) {
        this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0, need, runCallBacks);
      },
      init() {
        this.pulling = false;
        this.pullDownText = PULL_DOWN_TEXT_INIT;
        this.pullUpText = PULL_UP_TEXT_INIT;
        this.swiperOptions = {
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          setWrapperSize: true,
          scrollbar: {
            el: this.scrollbar ? '.swiper-scrollbar' : null,
            hide: true
          },
          on: {
            sliderMove: this.scroll,
            touchEnd: this.touchEnd,
            transitionEnd: this.scrollEnd
          }
        };
      },
      scroll() {
        if (this.pulling) return;

        const swiper = this.$refs.swiper.swiper;

        // 用于监听 是否显示 回到顶部的按钮
        this.$emit('scroll', swiper.translate, this.$refs.swiper.swiper);

        if (swiper.translate > 0) { // 下拉
          if (!this.pullDown) return;

          this.pulling = true;
          if (swiper.translate > PULL_DOWN_HEIGHT) {
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
          } else {
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT);
          }
        } else if (swiper.isEnd) { // 上拉
          if (!this.pullUp) return;

          this.pulling = true;
          const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css('height'));
          if (isPullUp) {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START);
          } else {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT);
          }
        }
      },
      touchEnd() {
        const swiper = this.$refs.swiper.swiper;

        if (swiper.translate > PULL_DOWN_HEIGHT) { // 下拉
          if (!this.pullDown) return;

          swiper.allowTouchMove = false; // 禁止触摸
          swiper.setTransition(swiper.params.speed); // 设置动画的执行 时间
          swiper.setTranslate(PULL_DOWN_HEIGHT); // 设置下拉回弹的高度
          swiper.params.virtualTranslate = true; // 定住不给回弹
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING);
          this.$emit('pull-down', this.pullDownEnd);
        } else if (swiper.isEnd) { // 底部
          if (!this.pullUp) return;

          const totalHeight = parseInt(swiper.$wrapperEl.css('height'));
          const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight;
          if (!isPullUp) return;

          swiper.allowTouchMove = false; // 禁止触摸
          swiper.setTransition(swiper.params.speed); // 设置动画的执行 时间
          swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height)); // 设置上拉回弹的高度
          swiper.params.virtualTranslate = true; // 定住不给回弹
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING);
          this.$emit('pull-up', this.pullUpEnd);
        }
      },
      pullDownEnd() {
        const swiper = this.$refs.swiper.swiper;

        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END);
        swiper.params.virtualTranslate = false; // 给回弹
        swiper.allowTouchMove = true; // 不禁止触摸
        swiper.setTransition(swiper.params.speed); // 设置动画的执行 时间
        swiper.setTranslate(0); // 设置下拉回弹的高度
        this.pulling = false;
        setTimeout(() => {
          this.$emit('pull-down-transition-end');
        }, swiper.params.speed);
      },
      pullUpEnd(loadingText) {
        const swiper = this.$refs.swiper.swiper;

        this.$refs.pullUpLoading.setText(loadingText || PULL_UP_TEXT_END);
        swiper.params.virtualTranslate = false; // 给回弹
        swiper.allowTouchMove = true; // 不禁止触摸
        if (loadingText) {
          setTimeout(() => {
            swiper.setTransition(swiper.params.speed); // 设置动画的执行 时间
            swiper.setTranslate(-(parseInt(swiper.$wrapperEl.css('height')) - swiper.height)); // 设置下拉回弹的高度
            this.pulling = false;
          }, 1000);
        } else {
          this.pulling = false;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
    .swiper-container{
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
    .swiper-slide{
      height: auto;
    }

    .mine-scroll-down,
    .mine-scroll-up{
      position: absolute;
      left: 0;
      width: 100%;
    }
    .mine-scroll-down{
      bottom: 100%;
      height: 80px;
    }
    .mine-scroll-up{
      top: 100%;
      height: 30px;
    }
</style>
