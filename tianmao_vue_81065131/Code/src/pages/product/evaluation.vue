<template>
  <div class="evaluation">
    <div class="evaluation-loading" v-if="!recommend || !recommend.item">
      <me-loading />
    </div>
    <div class="evaluation-content" v-else>
      <p class="evaluation-title">商品评价({{recommend.rate.totalCount}})</p>
      <ul class="evaluation-rate">
        <li class="evaluation-word" v-for="(item, index) in recommend.rate.keywords" :key="index">{{item.word}}({{item.count}})</li>
      </ul>
      <div class="evaluation-user">
        <div class="evaluation-user-inser">
          <img :src="recommend.rate.rateList[0].headPic" class="evaluation-user-img">
          <span class="evaluation-user-name">{{recommend.rate.rateList[0].userName}}</span>
        </div>
        <div class="evaluation-user-diglog">{{recommend.rate.rateList[0].content}}</div>
        <div class="evaluation-user-other">{{recommend.rate.rateList[0].dateTime}} {{recommend.rate.rateList[0].skuInfo}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import MeLoading from 'base/loading';

  export default {
    name: 'ProductEvaluation',
    components: {
      MeLoading
    },
    props: {
      recommend: {
        type: Object,
        default: null
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .evaluation{
    margin-top: 12px;
    &-loading{
      height: 100px;
    }
    &-content{
      padding: 0 10px;
      background-color: #fff;
    }
    &-title{
      height: 30px;
      line-height: 30px;
    }
    &-rate{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding-bottom: 6px;
    }
    &-word{
      margin: 6px 12px 0px 0;
      background-color: #FFEEEE;
      padding: 6px;
      border-radius: 8px;
    }
    &-user{
      &-inser{
        display: table;
        font-size: 0;
        margin: 4px 0 4px 0;
      }
      &-img{
        display: table-cell;
        width: 22px;
        height: 22px;
        border-radius: 50%;
      }
      &-name{
        display: table-cell;
        font-size: 14px;
        padding-left: 8px;
        vertical-align: middle;
      }
      &-diglog{
        @include multiline-ellipsis();
        margin: 6px 0;
        color: #333;
      }
      &-other{
        @include ellipsis();
        padding-top: 4px;
        padding-bottom: 8px;
        color: #999999;
      }
    }
  }
</style>
