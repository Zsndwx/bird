<template>
    <div class="category">
        <header class="g-header-container">
          <category-header />
        </header>
        <div class="g-content-container">
          <div class="slidebar">
            <category-tab @switch-tab="getCurrentId" />
          </div>
          <div class="main">
            <category-content :curId="curid" />
          </div>
        </div>
    </div>
</template>

<script>
  import CategoryHeader from './header';
  import CategoryTab from './tab';
  import CategoryContent from './content';

  export default {
    name: 'Category',
    components: {
      CategoryHeader,
      CategoryTab,
      CategoryContent
    },
    data() {
      return {
        curid: ''
      };
    },
    methods: {
      getCurrentId(id) {
        this.curid = id;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .category{
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;
    overflow: hidden;
    .g-content-container{
      display: flex;
      .slidebar{
        width: 80px;
        height: 100%;
      }
      .main{
        flex: 1;
        height: 100%;
      }
    }
  }
</style>
