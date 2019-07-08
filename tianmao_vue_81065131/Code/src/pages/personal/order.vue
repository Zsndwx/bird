<template>
  <me-listinline class="order">
    <div class="order-top order-top-left" slot="left">
      <i class="iconfont icon-wodedingdan"></i>
      <span class="order-text">我的订单</span>
    </div>
    <div class="order-top order-top-right" slot="right" @click="toTitleClick">
      <i class="iconfont icon-back"></i>
      <span class="order-text">查看我的全部订单</span>
    </div>
    <ul class="order-bottom" slot="bottom" @click.stop="toOrderLink">
      <li class="order-item" v-for="(item, index) in vHtml" :key="index" v-html="item.iconHtml+item.nameHtml">
      </li>
    </ul>
  </me-listinline>
</template>

<script>
  import MeListinline from 'base/listinline';
  import {orderVHtml} from './config';

  export default {
    name: 'PersonalOrder',
    components: {
      MeListinline
    },
    methods: {
      toTitleClick({ target }) {
        if (target.nodeName !== 'SPAN' && target.nodeName !== 'I') return;
        this.$emit('top-order-title', target);
      },
      toOrderLink({ target }) {
        if (target.nodeName !== 'SPAN' && target.nodeName !== 'I') return;
        if (target.nodeName === 'I') {
          target = target.parentNode.children[1];
        }
        console.log(target);
      }
    },
    created() {
      this.vHtml = orderVHtml;
    }
  };
</script>

<style lang="scss" scoped>
.order {
  margin-top: 12px;
  background-color: #fff;

  &-bottom{
    display: flex;
    flex-direction: row;
    flex: 1;
    border-top: solid 1px rgb(239,239,239);
  }
  &-item{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0;
  }
}
.order-top {
  display: flex;
  &-right,
  &-left {
    flex: 1;
    padding: 12px 0;
  }
  &-right {
    display: flex;
    flex-direction: row-reverse;
  }
  .iconfont {
    font-size: 14px;
    padding: 0 6px;
  }
  .icon-back {
    transform-origin: center center;
    transform: rotate(180deg);
  }
}
</style>
