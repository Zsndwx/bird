<template>
    <div class="home">
        <header class="g-header-container">
          <home-header ref="header" :class="{'header-transtion': headerTransition}" />
        </header>
        <me-scroll @pull-down-transition-end="pullDownTransitionEnd" @scroll="scroll" @scroll-end="scrollEnd" :data="recommends" pullDown pullUp @pull-down="pullToRefresh" @pull-up="pullToLoadMore" ref="scroll">
          <home-slider ref="slider" />
          <home-nav />
          <home-recommend @loaded="getRecommends" ref="recommend"/>
        </me-scroll>
        <div class="g-backtop-container">
          <me-backtop :visible="isVisible" @backtop="backToTop" />
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
  import HomeHeader from './header';
  import HomeSlider from './slider';
  import HomeNav from './nav';
  import HomeRecommend from './recommend';
  import MeScroll from 'base/scroll';
  import MeBacktop from 'base/backtop';
  import { HEADER_TRANSITION_HEIGHT } from './config';

  export default {
    name: 'Home',
    components: {
      MeBacktop,
      MeScroll,
      HomeHeader,
      HomeSlider,
      HomeNav,
      HomeRecommend
    },
    data() {
      return {
        recommends: [],
        isVisible: false,
        headerTransition: false
      };
    },
    methods: {
      getRecommends(recommends) {
        this.recommends = recommends;
      },
      pullToRefresh(end) {
        this.$refs.slider.update().then(end);
      },
      pullToLoadMore(end) {
        this.$refs.recommend.update().then(end).catch(err => {
          if (err) {
            console.log(err);
            end('没有更多数据了');
          } else {
            end();
          }
        });
        // setTimeout(() => {
        //   end();
        // }, 1000);
      },
      backToTop() {
        // 点击时触发回到顶部事件
        this.$refs.scroll && this.$refs.scroll.scrollToTop();
      },
      scrollEnd(translate, scroll) {
        this.isVisible = translate < 0 && -translate > scroll.height;
        this.changeHeaderStatue(translate);
      },
      scroll(translate) {
        this.changeHeaderStatue(translate);
      },
      changeHeaderStatue(translate) {
        if (translate > 0) {
          this.$refs.header.hide();
          return;
        }

        this.headerTransition = -translate > HEADER_TRANSITION_HEIGHT; // css动画类添加
      },
      pullDownTransitionEnd() {
        // 幻灯片刷新完成后 显示header头部
        this.$refs.header.show();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .home{
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;
  }
</style>
