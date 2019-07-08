<template>
  <div class="bottomfix">
    <div class="bottomfix-item">
      <div class="bottomfix-left">
        <a href="javascript:;" class="bottomfix-link">
          <i class="iconfont icon-shop"></i>
          <span class="bottomfix-name">店铺</span>
        </a>
        <a href="javascript:;" class="bottomfix-link">
          <i class="iconfont icon-service"></i>
          <span class="bottomfix-name">客服</span>
        </a>
        <a href="javascript:;" class="bottomfix-link">
          <i class="iconfont icon-collect"></i>
          <span class="bottomfix-name">收藏</span>
        </a>
      </div>
      <div class="bottomfix-right">
        <button @click="addShopCart" class="bottomfix-btn bottomfix-cart">加入购物车</button>
        <button class="bottomfix-btn bottomfix-away">马上抢</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProductBottomfix',
    props: {
      recommend: {
        type: Object,
        default: null
      }
    },
    methods: {
      addShopCart() {
        
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .bottomfix{
    position: absolute;
    bottom: 0;
    left: 0;
    height: $tabbar-height;
    width: 100%;
    z-index: $product-z-index;

    &-item{
      display: flex;
      flex-direction: row;
      height: 100%;
      align-items: center;
      background-color: #fff;
    }
    &-right,
    &-left{
      display: flex;
    }
    &-left{
      flex: 4;
      flex-direction: row;
    }
    &-link{
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &-right{
      flex: 6;
    }
    &-btn{
      flex: 1;
      display: flex;
      justify-content: center;
      height: 50px;
      color: #fff;
      font-size: 15px;
    }
    &-cart{
      background-color: rgb(255,149,0);
    }
    &-away{
      background-color: rgb(255,0,54);
    }
  }
</style>
