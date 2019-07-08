<template>
  <div class="slider-wrapper">
    <me-loading v-if="!sliders.length" />
    <me-slider v-else :data="sliders" :direction="direction" :loop="loop" :interval="interval" :pagination="pagination">
      <swiper-slide v-for="(item, index) in sliders" :key="index">
        <a class="slider-link" :href="item.linkUrl">
          <img class="slider-img" :src="item.picUrl">
        </a>
      </swiper-slide>
    </me-slider>
  </div>
</template>

<script>
  import MeSlider from 'base/slider';
  import { swiperSlide } from 'vue-awesome-swiper';
  import { sliderOptions } from './config';
  import { getHomeSlider } from 'api/home';
  import MeLoading from 'base/loading';

  export default {
    name: 'HomeSlider',
    components: {
      MeSlider,
      swiperSlide,
      MeLoading
    },
    data() {
      return {
        direction: sliderOptions.direction,
        loop: sliderOptions.loop,
        interval: sliderOptions.interval,
        pagination: sliderOptions.pagination,
        sliders: []
      };
    },
    created() {
      this.getSliders();
    },
    methods: {
      // api
      update() {
        return this.getSliders();
      },

      getSliders() {
        return getHomeSlider().then(data => {
          this.sliders = data;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .swiper-wrapper,
  .slider-wrapper {
    height: 183px;
  }
  .slider-link {
    display: block;
  }
  .slider-link,
  .slider-img {
    width: 100%;
    height: 100%;
  }
</style>
