<template>
  <me-navbar class="header">
    <i class="iconfont icon-back" @click="goToBack" slot="left"></i>
    <me-searchbox slot="center" @query="query" placeholder="开学季有礼，好货5折起" />
  </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';
  import MeSearchbox from 'base/searchbox';

  export default {
    name: 'SearchHeader',
    components: {
      MeNavbar,
      MeSearchbox
    },
    methods: {
      query(query) {
        this.$emit('query', query);
      },
      goToBack() {
        this.$router.back();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .header{
    .iconfont{
      color: #ccc;
      font-size: $icon-font-size;
    }
    .mine-search-box-wrapper{
      background-color: #f7f7f7;
    }
  }
</style>
