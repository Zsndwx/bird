<template>
  <div class="commdity">
    <ul class="commdity-list">
      <li class="commdity-item">
        <div class="commdity-box">
          <p class="commdity-price">￥{{price}}</p>
          <p class="commdity-sold">{{sold}}件已售</p>
        </div>
      </li>
      <li class="commdity-item">
        <p class="commdity-name">{{name}}</p>
      </li>
      <li class="commdity-item">
        <div class="commdity-info">
          <p class="commdity-express">快递包邮</p>
          <p class="commdity-sales">月销量{{sales}}件</p>
          <p class="commdity-address">{{address}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'ProductCommdity',
    props: {
      recommend: {
        type: Object,
        default: null
      }
    },
    watch: {
      recommend() {
        this.init();
      }
    },
    computed: {
      price() {
        if (!this.commdity.price) return;
        return this.commdity.price.price.priceText.split('-')[0];
      },
      sold() {
        if (!this.recommend || !this.recommend.item) return;
        return this.recommend.item.commentCount;
      },
      name() {
        if (!this.commdity.item) return;
        return this.commdity.item.title;
      },
      sales() {
        if (!this.recommend || !this.recommend.item) return;
        return +this.recommend.item.favcount > 5000 ? '5000+' : this.recommend.item.favcount;
      },
      address() {
        if (!this.commdity.delivery) return;
        return this.commdity.delivery.from;
      }
    },
    data() {
      return {
        commdity: {}
      };
    },
    created() {
      console.log(this.recommend);
    },
    methods: {
      init() {
        if (!this.recommend || !this.recommend.apiStack) return;
        if (this.recommend.apiStack.length === 0) return;
        this.commdity = JSON.parse(this.recommend.apiStack[0].value);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .commdity{
    background-color: #fff;
    &-list{
      position: relative;
      margin: 0 auto;
    }
    &-item{
      font-size: 16px;
    }
    &-box{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background: -webkit-linear-gradient(left, #EF3390 0%, red 100%);
      background: linear-gradient(left, #EF3390 0%, red 100%);
    }
    &-sold,
    &-price{
      position: relative;
      display: flex;
      align-items: center;
      height: 30px;
      color: #fff;
    }
    &-sold{
      margin-right: 5px;
      padding: 0 5px;
    }
    &-sold::after{
      content: '';
      display: block;
      width: 100%;
      height: 22px;
      position: absolute;
      top: 4px;
      left: 0;
      background-color: rgba(0, 0, 0, .4);
    }
    &-price{
      padding-left: 5px;
    }
    &-name{
      padding: 0 5px;
      padding-top: 4px;
      height: 38px;
      line-height: 1.1;
      @include multiline-ellipsis();
    }
    &-info{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    &-address,
    &-express,
    &-sales{
      height: 24px;
      line-height: 24px;
      color: #666;
      font-size: 14px;
    }
    &-express{
      padding-left: 5px;
    }
    &-address{
      padding-right: 5px;
    }
  }
</style>
