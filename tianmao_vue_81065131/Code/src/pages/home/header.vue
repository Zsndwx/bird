<template>
  <me-navbar class="header" v-show="visible">
    <i class="iconfont icon-scan" slot="left"></i>
    <me-searchbox slot="center" @click.native="gotoSearch" fack @query="getQuery" placeholder="开学季有礼，好货5折起"/>
    <i class="iconfont icon-msg" slot="right"></i>
  </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';
  import MeSearchbox from 'base/searchbox';

  export default {
    name: 'HomeHeader',
    components: {
      MeNavbar,
      MeSearchbox
    },
    data() {
      return {
        visible: true,
        query: ''
      };
    },
    methods: {
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      getQuery(query) {
        this.query = query;
      },
      gotoSearch() {
        this.$router.push('/search');
      }
    }
  };
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";

    .header{
        &.mine-navbar{
            background-color: transparent;
            transition: background-color .5s;
            // background-color: $header-bgc-translucent;
        }
        &.header-transtion{
          background-color: $header-bgc-translucent;
        }
        .iconfont{
            color: $icon-color-default;
            font-size: $icon-font-size;
        }
    }
</style>
