<template>
  <transition name="search">
    <div class="search">
      <header class="g-header-container">
        <search-header @query="getQuery" />
      </header>
      <div class="g-content-container">
        <me-scroll @scroll-end="updateScroll" ref="scroll">
          <search-hot v-show="!query" @loaded="updateScroll" />
          <search-history v-show="!query" ref="history" @show-confirm="showConfirm" @remove-item="updateScroll" />
          <search-result :query="query" v-show="query" />
        </me-scroll>
      </div>
      <me-confirm ref="confirm" @confirm="confirm" msg="确定要清空吗？"/>
    </div>
  </transition>
</template>

<script>
  import SearchHeader from './header';
  import MeScroll from 'base/scroll';
  import SearchHot from './hot';
  import SearchHistory from './history';
  import MeConfirm from 'base/confirm';
  import SearchResult from './result';

  export default {
    name: 'Search',
    components: {
      SearchHeader,
      MeScroll,
      SearchHot,
      SearchHistory,
      MeConfirm,
      SearchResult
    },
    data() {
      return {
        query: ''
      };
    },
    methods: {
      getQuery(query) {
        this.query = query;
      },
      showConfirm() {
        console.log('点击清空历史按钮 弹窗！');
        this.$refs.confirm && this.$refs.confirm.show();
      },
      confirm() {
        this.$refs.history && this.$refs.history.clearHistory();
      },
      updateScroll() {
        this.$refs.scroll && this.$refs.scroll.update();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .search{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $search-z-index;
    background-color: $bgc-theme;
  }
  .search-enter-active,
  .search-leave-active{
    transition: all .4s;
  }
  .search-enter,
  .search-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
