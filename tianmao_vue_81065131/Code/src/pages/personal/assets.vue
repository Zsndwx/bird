<template>
  <me-listinline class="assets">
    <div class="assets-top assets-top-left" slot="left">
      <i class="iconfont icon-wodezichan"></i>
      <span class="assets-text">我的资产</span>
    </div>
    <ul class="assets-bottom" slot="bottom" @click.stop="toAssetsLink">
      <li class="assets-item" v-for="(item, index) in vHtml" :key="index" v-html="item.nameHtml">
      </li>
    </ul>
  </me-listinline>
</template>

<script>
  import MeListinline from 'base/listinline';
  import {assetsVHtml} from './config';

  export default {
    name: 'PersonalAssets',
    components: {
      MeListinline
    },
    methods: {
      toAssetsLink({ target }) {
        if (target.nodeName !== 'SPAN') return;
        console.log(target);
      }
    },
    created() {
      this.vHtml = assetsVHtml;
    }
  };
</script>

<style lang="scss" scoped>
  .assets {
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
  .assets-top {
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
