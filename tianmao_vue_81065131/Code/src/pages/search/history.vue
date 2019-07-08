<template>
  <div class="history" v-if="historys.length">
    <h4 class="history-title">历史搜索</h4>
    <transition-group class="g-list" tag="ul" name="list">
      <li class="g-list-item" v-for="item in historys" :key="item" @click="$_search_selectItem(item)">
        <span class="g-list-text">{{item}}</span>
        <i class="iconfont icon-delete" @click.stop="removeItem(item)"></i>
      </li>
    </transition-group>
    <a href="javascript:;" class="history-btn" @click="showGonfirm">
      <i class="iconfont icon-clear"></i>
      清空历史记录
    </a>
  </div>
</template>

<script>
  import storage from 'assets/js/storage';
  import {SEARCH_HISTORY_KEYWORD_KEY} from './config';
  import {searchMixin} from 'assets/js/mixins';

  export default {
    name: 'SearchHistory',
    mixins: [searchMixin],
    created() {
      this.getKeyword();
    },
    methods: {
      update() {
        this.getKeyword();
      },
      getKeyword() {
        this.historys = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);
      },
      removeItem(item) {
        this.historys = this.historys.filter(val => val !== item);
        storage.set(SEARCH_HISTORY_KEYWORD_KEY, this.historys);
        setTimeout(() => {
          this.$emit('remove-item', item);
        }, 100);
      },
      showGonfirm() {
        this.$emit('show-confirm');
      },
      clearHistory() {
        storage.remove(SEARCH_HISTORY_KEYWORD_KEY);
        this.update();
      }
    },
    data() {
      return {
        historys: []
      };
    }
  };
</script>

<style lang="scss" scoped>
  .history{
    padding-bottom: 30px;
    background-color: #fff;

    &-title{
      height: 34px;
      line-height: 34px;
      padding: 0 10px;
      font-size: 14px;
      font-weight: bold;
    }
    .g-list{
      padding-left: 10px;
    }
    &-btn{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      width: 80%;
      height: 40px;
      background: none;
      border: solid 1px #ccc;
      border-radius: 4px;
      margin: 0 auto;
      color: #686868;
    }

    // 动画
    .list-enter-active,
    .list-leave-active{
      transition: height 0.1s;
    }
    .list-enter,
    .list-leave-to{
      height: 0;
    }
  }
</style>
