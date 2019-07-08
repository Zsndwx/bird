<template>
  <div class="seller">
    <div class="seller-loading" v-if="!recommend || !recommend.seller">
      <me-loading />
    </div>
    <div class="seller-content" v-else>
      <div class="seller-title">
        <div class="seller-title-left">
          <img :src="recommend.seller.shopIcon" alt="" class="seller-title-img">
        </div>
        <div class="seller-title-right">
          <h1 class="seller-title-name">{{recommend.seller.shopName}}</h1>
          <img :src="recommend.seller.creditLevelIcon" alt="" class="seller-title-icon">
        </div>
      </div>
      <ul class="seller-list">
        <li class="seller-item" v-for="(item, index) in recommend.seller.evaluates" :key="index">{{item.title}} {{item.score}}</li>
      </ul>
      <div class="seller-btns">
        <a :href="recommend.seller.taoShopUrl" class="seller-btn all-product">全部商品</a>
        <a :href="recommend.seller.taoShopUrl" class="seller-btn go-shop">进入店铺</a>
      </div>
    </div>
  </div>
</template>

<script>
  import MeLoading from 'base/loading';

  export default {
    name: 'ProductSeller',
    props: {
      recommend: {
        type: Object,
        default: null
      }
    },
    components: {
      MeLoading
    }
  };
</script>

<style lang="scss" scoped>
  .seller{
    margin-top: 12px;
    &-loading{
      height: 50px;
    }
    &-content{
      padding: 10px;
      background-color: #fff;
    }
    &-title{
      display: flex;
      flex-direction: row;
      &-left{
        margin-right: 10px;
      }
      &-img{
        width: 60px;
        height: 60px;
      }
      &-right{
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      &-name{
        margin-bottom: 6px;
        font-size: 16px;
        font-weight: bold;
      }
      &-icon{
        width: 40px;
      }
    }
    &-list{
      display: flex;
      text-align: center;
      margin: 12px 0 10px;
    }
    &-item{
      display: block;
      flex: 1;
      color: #999;
      font-size: 12px;
    }
    &-btns{
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
    }
    &-btn{
      flex: 1;
      border: 1px solid rgba(255,0,54,.5);
      height: 24px;
      line-height: 22px;
      font-size: 13px;
      color: rgba(255,0,54,.8);
      border-radius: 12px;
      text-align: center;
      display: block;
      max-width: 96px;
    }
    .all-product{
      margin-right: 10px;
    }
  }
</style>
