<template>
  <div class="slider-wrapper">
    <me-loading v-if="!sliders.length" />
    <me-slider v-else :data="sliders" :direction="direction" :loop="loop" :pagination="pagination" :interval="interval">
      <swiper-slide v-for="(item, index) in sliders" :key="index">
        <a :href="item.linkUrl" class="slider-link">
          <img :src="item.picUrl" class="slider-img">
        </a>
      </swiper-slide>
    </me-slider>
  </div>
</template>

<script>
  import { swiperSlide } from 'vue-awesome-swiper';
  import MeLoading from 'base/loading';
  import MeSlider from 'base/slider';
  import {sliderOptions} from './config';

  export default {
    name: 'ProductSlider',
    components: {
      MeSlider,
      swiperSlide,
      MeLoading
    },
    props: {
      recommend: {
        type: Object,
        default: null
      }
    },
    watch: {
      recommend(re) {
        this.getSlider(re);
      }
    },
    data() {
      return {
        sliders: []
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.direction = sliderOptions.direction;
        this.loop = sliderOptions.loop;
        this.interval = sliderOptions.interval;
        this.pagination = sliderOptions.pagination;
        this.getSlider(this.recommend);
      },
      getSlider(re) {
        if (!re || !re.item) return;
        var link = location.href;
        for (let i of re.item.images) {
          this.sliders.push({picUrl: i, linkUrl: link});
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .slider-wrapper,
  .swiper-slide{
    height: 348px;
  }

  .slider{
    &-link{
      display: block;
      height: 100%;
    }
    &-img{
      width: 100%;
      height: 100%;
    }
  }
</style>
