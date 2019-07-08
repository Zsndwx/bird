<template>
  <div class="result">
    <div class="loading-container" v-show="visible">
      <me-loading />
    </div>
    <ul class="g-list" v-if="results.length">
      <li class="g-list-item" @click="$_search_selectItem(item[0])" v-for="(item, index) in results" :key="index">
        <span class="g-list-text">{{item[0]}}</span>
      </li>
    </ul>
    <div class="no-result" v-else>没有结果</div>
  </div>
</template>

<script>
  import MeLoading from 'base/loading';
  import {getSearchResult} from 'api/search';
  import {searchMixin} from 'assets/js/mixins';

  export default {
    name: 'SearchResult',
    components: {
      MeLoading
    },
    mixins: [searchMixin],
    data() {
      return {
        visible: true,
        results: []
      };
    },
    watch: {
      query(query) {
        this.getResult(query);
      }
    },
    methods: {
      getResult(keyword) {
        if (!keyword) {
          return;
        }
        this.visible = true;
        getSearchResult(keyword).then(data => {
          if (data) {
            this.results = data;
            this.visible = false;
          }
        });
      }
    },
    props: {
      query: {
        type: String,
        default: ''
      }
    }
  };
</script>

<style lang="scss" scoped>
  .result{
    .g-list{
      padding-left: 10px;
    }
    .no-result{
      height: 24px;
      line-height: 24px;
      padding-left: 10px;
    }
  }
</style>
