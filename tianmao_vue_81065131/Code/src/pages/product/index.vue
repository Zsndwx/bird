<template>
  <transition name="product">
    <div class="product">
      <div class="g-header-container">
        <product-header @go-back="goToBack" />
      </div>
      <div class="g-view-container">
        <me-scroll :data="recommends">
          <product-slider :recommend="recommends" />
          <product-commdity :recommend="recommends" />
          <product-evaluation :recommend="recommends" />
          <product-seller :recommend="recommends" />
        </me-scroll>
        <product-bottomfix :recommend="recommends" />
      </div>
    </div>
  </transition>
</template>

<script>
  import ProductHeader from './header';
  import MeScroll from 'base/scroll';
  import ProductSlider from './slider';
  import ProductCommdity from './commdity';
  import { getProductData } from 'api/product';
  import ProductBottomfix from './bottomfix';
  import ProductEvaluation from './evaluation';
  import ProductSeller from './seller';

  export default {
    name: 'Product',
    components: {
      ProductHeader,
      MeScroll,
      ProductSlider,
      ProductCommdity,
      ProductBottomfix,
      ProductEvaluation,
      ProductSeller
    },
    created() {
      this.init();
    },
    data() {
      return {
        recommends: {}
      };
    },
    methods: {
      goToBack() {
        this.$router.back();
      },
      init() {
        this.curid = this.$route.params.id;
        this.getRecommend(this.curid);
      },
      getRecommend(id) {
        if (!id) return;
        getProductData(id).then(data => {
          if (data) {
            this.recommends = data;
            console.log(this.recommends);
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .product{
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: $product-z-index;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;

    &-enter-active,
    &-leave-active{
      transition: all 0.3s;
    }
    &-enter,
    &-leave-to{
      transform: translate3d(100%, 0, 0);
    }
  }
</style>
