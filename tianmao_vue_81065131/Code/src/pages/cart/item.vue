<template>
  <div class="item">
    <div class="item-content" v-for="(item, index) in cartItems" :key="index">
      <cart-title :attach="attachTitle(item.bid)" :content="item.sidText" />
      <ul class="item-list">
        <li class="item-left">
          <i class="iconfont item-icon icon-dagou"></i>
          <div class="item-pic">
            <img class="item-img" :src="item.imgUrl">
          </div>
        </li>
        <li class="item-right">
          <div class="item-title">{{item.title}}</div>
          <div class="item-info">{{item.info}}</div>
          <div class="item-price">
            <span :index="index">￥{{item.price}}</span>
            <me-addsubtract @add="outcome" @subtract="outcome" @input-change="outcome" class="item-addsubtract" />
          </div>
          <div class="item-text">
            <a href="javascript:;" class="item-delete">删除</a>
            <a href="javascript:;" class="item-attention">移入关注</a>
          </div>
        </li>
      </ul>
      <div class="item-attach">
        <div class="item-gift" v-if="item.gift">
          <span class="item-attach-text">赠品</span> {{item.gift}}
          <i class="iconfont item-attach-back icon-back"></i>
        </div>
        <div class="item-serve" v-if="item.serve">
          <span class="item-attach-text">服务</span> {{item.serve}}
          <i class="iconfont item-attach-back icon-back"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {cartItem} from './config';
  import MeAddsubtract from 'base/addsubtract';
  import CartTitle from './title';

  export default {
    name: 'CartItem',
    components: {
      MeAddsubtract,
      CartTitle
    },
    created() {
      console.log(cartItem);
      this.cartItems = cartItem;
    },
    methods: {
      outcome(target, num) {
        let span = target.parentNode.children[0];
        let index = span.getAttribute('index');
        span.innerHTML = '￥' + (+this.cartItems[index].price * num).toFixed(2);
        span = null;
      }
    },
    computed: {
      attachTitle(bid) {
        return function (bid) {
          if (bid) {
            return 'on';
          } else {
            return 'off';
          }
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  $color-border: rgb(247,246,247);

  .item{
    &-list{
      display: flex;
      flex-direction: row;
      border-top: solid 1px $color-border;
      padding: 6px 0;
      // border: solid 1px blue;
    }
    &-content{
      background-color: #fff;
    }
    &-left{
      flex: 1;
      display: flex;
      align-items: center;
      // border: solid 1px blue;
      height: 100%;
    }
    &-right{
      flex: 2;
      display: flex;
      flex-direction: column;
    }
    &-icon{
      margin-left: 10px;
      margin-right: 5px;
      color: red;
      font-size: 18px;
    }
    &-pic{
      position: relative;
      width: 100%;
      padding-top: 100%;
    }
    &-img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &-title{
      font-weight: bold;
      @include multiline-ellipsis();
    }
    &-info{
      border: solid 1px rgb(219, 218, 219);
      text-indent: 3px;
      padding: 5px 0;
      color: #707070;
      margin: 6px 0;
    }
    &-text{
      display: flex;
      flex-direction: row-reverse;
      color: #707070;
      margin-top: 12px;
    }
    &-delete{
      margin-right: 10px;
      margin-left: 10px;
    }
    &-price{
      color: red;
      position: relative;
      // border: solid 1px blue;
      padding: 6px 0;
    }
    &-addsubtract{
      position: absolute;
      right: -14px;
      top: 3px;
    }
    &-attach{
      margin-left: 20%;
      padding: 10px 0;
    }
    &-serve,
    &-gift{
      background-color: #FFF5F7;
      padding: 5px 0;
      text-indent: 5px;
      position: relative;
    }
    &-attach-text {
      font-weight: bold;
    }
    &-attach-back {
      display: block;
      position: absolute;
      top: 5px;
      right: 0;
      transform-origin: center center;
      transform: rotate(180deg);
    }
  }
</style>
