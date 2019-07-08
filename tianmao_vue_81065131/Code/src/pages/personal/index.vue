<template>
  <div class="personal">
    <me-scroll>
      <personal-header />
      <personal-order @top-order-title="orderTitle" />
      <personal-assets />
      <personal-other @orther-link="ortherLink" />
      <div class="personal-relation">
        <p class="personal-text">客服热线400-123-8888（8:00-22:00）</p>
        <p class="personal-text">拨打前请记录您的UID 0</p>
      </div>
    </me-scroll>
  </div>
</template>

<script>
  import PersonalHeader from './header';
  import PersonalOrder from './order';
  import PersonalAssets from './assets';
  import PersonalOther from './other';
  import MeScroll from 'base/scroll';

  export default {
    name: 'Personal',
    components: {
      MeScroll,
      PersonalHeader,
      PersonalOrder,
      PersonalAssets,
      PersonalOther
    },
    methods: {
      orderTitle() {
        console.log('点击订单标题行');
      },
      ortherLink(target) {
        console.log(target);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .personal{
    overflow: hidden;
    height: 100%;
    &-relation{
      margin-top: 15px;
    }
    &-text{
      font-size: 14px;
      line-height: 22px;
      color: rgb(148, 142, 142);
    }
  }
</style>
