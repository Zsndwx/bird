<template>
  <me-navbar class="header" :titleFontSize="14" title="商品详情">
    <i @click="goToBack" class="iconfont icon-back" slot="left"></i>
    <i class="iconfont icon-cart" slot="right"></i>
  </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';

  export default {
    name: 'ProductHeader',
    components: {
      MeNavbar
    },
    methods: {
      goToBack() {
        this.$emit('go-back');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .header{
    &.mine-navbar{
      background-color: $header-bgc-translucent;
      // background-color: transparent;
      color: #fff;
    }
  }
</style>
