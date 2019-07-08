<template>
  <div class="cart">
    <div class="g-header-container">
      <cart-header />
    </div>
    <div class="g-content-container">
      <me-scroll>
        <me-navbar class="cart-editor">
          <div class="cart-editor-left" slot="left">
            <i class="iconfont icon-shouhuodizhi"></i>
            <span>朝阳区管庄</span>
          </div>
          <a class="cart-editor-right" href="javascript:;" slot="right">编辑商品</a>
        </me-navbar>
        <me-navbar class="cart-reduce">
          <i class="iconfont cart-reduce-left icon-dagou" slot="left"></i>
          <a href="javascript:;" class="cart-reduce-right" slot="right">优惠卷</a>
        </me-navbar>
        <cart-item />
      </me-scroll>
    </div>
  </div>
</template>

<script>
  import CartHeader from './header';
  import MeScroll from 'base/scroll';
  import MeNavbar from 'base/navbar';
  import CartTitle from './title';
  import CartItem from './item';

  export default {
    name: 'Cart',
    components: {
      CartHeader,
      MeScroll,
      MeNavbar,
      CartTitle,
      CartItem
    }
  };
</script>

<style lang="scss" scoped>
  $color-right-title: rgb(239, 57, 68);
  $color-border: rgb(247,246,247);

  .g-content-container{
    display: flex;
  }
  .cart{
    width: 100%;
    height: 100%;
    overflow: hidden;
    &-reduce{
      border: solid 1px $color-border;
    }
    &-reduce-right,
    &-editor-right{
      color: $color-right-title;
    }
    &-reduce-left,
    &-editor-left{
      color: rgb(129, 125, 129);
    }
    &-reduce-left{
      color: $color-right-title;
    }
  }
</style>
