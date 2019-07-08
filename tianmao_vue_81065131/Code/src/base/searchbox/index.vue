<template>
  <div class="mine-search-box-wrapper">
    <i class="iconfont icon-search"></i>
    <div class="mine-search-box" v-if="fack">{{placeholder}}</div>
    <input type="text" class="mine-search-box" v-if="!fack" title="搜索框" :placeholder="placeholder" v-model="query" ref="input">
    <i class="iconfont icon-close" v-show="query" @click="reset"></i>
  </div>
</template>

<script>
  import { debounce } from 'assets/js/util';

  export default {
    name: 'MeSearchbox',
    props: {
      placeholder: {
        type: String,
        default: '请输入搜索内容'
      },
      fack: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        query: ''
      };
    },
    watch: {
      query: debounce(function () {
        this.$emit('query', this.query);
      })
    },
    methods: {
      focus() {
        this.$refs.input && this.$refs.input.focus();
      },
      clear() {
        this.query = '';
      },
      reset() {
        this.clear();
        this.focus();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .mine-search-box-wrapper{
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    padding: 0 7px;
    background-color: #fff;
    border-radius: 15px;
    .iconfont{
      color: #ccc;
      font-size: $icon-font-size-sm;
      font-weight: bold;
    }
    .mine-search-box{
      flex: 1;
      background: none;
      border: none;
      margin: 0 6px;
      color: #666;
      line-height: 1.5;
    }
  }
</style>
