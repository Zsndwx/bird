<template>
  <me-navbar class="title">
    <div class="title-first-left" slot="left" v-if="attach === 'on'">
      <span>{{content}}</span>
      <i class="iconfont icon-gantanhao"></i>
    </div>
    <div class="title-two-left" v-if="attach === 'off'" slot="left">
      <span class="title-two-left-text1">加价购</span>
      <p class="title-two-left-ptext">已购满20元，可用优惠价换购商品1件</p>
    </div>
    <div class="title-two-right" v-if="attach === 'off'" slot="right">
      <span class="title-two-right-text2">去凑单</span>
      <p>换购商品</p>
    </div>
  </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';

  export default {
    name: 'CartTitle',
    components: {
      MeNavbar
    },
    props: {
      attach: {
        type: String,
        default: 'on',
        validator(val) {
          return ['on', 'off'].indexOf(val) > -1;
        }
      },
      content: {
        type: String,
        default: '商品用劵前已免运费，已选商品总重6.42kg'
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  $color-title: rgb(129, 125, 129);
  $color-border: rgb(247,246,247);

  .title{
    border-top: solid 1px $color-border;
    &-two-left,
    &-first-left{
      color: $color-title;
    }
    &-two-right{
      position: absolute;
      right: 10px;
      color: rgb(239, 57, 68);
      white-space: nowrap;
    }
    &-two-left{
      width: 96%;
    }
    &-two-left,
    &-two-right{
      display: flex;
      flex-direction: row;
      &-ptext{
        @include ellipsis();
      }
      &-text2{
        margin-right: 12px;
      }
      &-text1{
        position: relative;
        padding: 1px 4px;
        margin-right: 4px;
        background-color: rgb(239, 57, 68);
        color: #fff;
        border-radius: 4px;
        white-space: nowrap;
      }
    }
    &-two-left-text1::after{
      content: '';
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      border-width: 6px;
      border-style: solid;
      border-color: rgb(239, 57, 68) transparent transparent transparent;
    }
  }
</style>
