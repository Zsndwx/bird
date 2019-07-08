<template>
  <div class="content-wrapper">
    <div class="loading-contaner" v-if="isLoading">
      <div class="loading-wrapper">
        <me-loading />
      </div>
    </div>
    <me-scroll ref="scroll" @scroll-end="scrollEnd">
      <div class="content">
        <div class="pic" v-if="content.banner">
          <a :href="content.banner.linkUrl" class="pic-link">
            <img @load="updateScroll" :src="content.banner.picUrl" class="pic-img">
          </a>
        </div>
        <div class="section" v-for="(section, index) in content.data" :key="index">
          <h4 class="section-title">{{section.name}}</h4>
          <ul class="section-list">
            <li class="section-item" v-for="(values, key) in section.itemList" :key="key">
              <a :href="values.linkUrl" class="section-link">
                <p class="section-pic">
                  <img v-lazy="values.picUrl" :key="values.picUrl" class="section-img">
                </p>
                <p class="section-name">{{values.name}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </me-scroll>
    <div class="g-backtop-container">
      <me-backtop :visible="isVisible" @backtop="backToTop" />
    </div>
  </div>
</template>

<script>
  import { CATEGORY_CONTENT_KEY, CATEGORY_CONTENT_UPDATE_TIME_INTERVAL } from './config';
  import storage from 'assets/js/storage';
  import { getCategoryContent } from 'api/category';
  import MeLoading from 'base/loading';
  import MeScroll from 'base/scroll';
  import MeBacktop from 'base/backtop';

  export default {
    name: 'CategoryContent',
    props: {
      curId: {
        type: String,
        default: ''
      }
    },
    components: {
      MeLoading,
      MeScroll,
      MeBacktop
    },
    data() {
      return {
        content: {},
        isVisible: false,
        isLoading: true
      };
    },
    watch: {
      curId(id) {
        this.isLoading = true;
        this.getContent(id).then(() => {
          this.isLoading = false; // 关闭加载图标
          this.backToTop(0); // 回到顶部
        });
      }
    },
    methods: {
      getContent(id) {
        let contens = storage.get(CATEGORY_CONTENT_KEY);
        let updateTime;
        const curTime = new Date().getTime();

        if (contens && contens[id]) {
          updateTime = contens[id].updateTime || 0;
          if (curTime - updateTime <= CATEGORY_CONTENT_UPDATE_TIME_INTERVAL) { // loacalStorage
            return this.getContentByLocalStorage(contens[id]);
          } else { // http
            return this.getContentByHttp(id).then(() => {
              this.updateLocalStorage(contens, id, curTime);
            });
          }
        } else { // http
          return this.getContentByHttp(id).then(() => {
            this.updateLocalStorage(contens, id, curTime);
          });
        }
      },
      backToTop(need) {
        // 点击时触发回到顶部事件
        this.$refs.scroll && this.$refs.scroll.scrollToTop(need);
      },
      updateScroll() {
        this.$refs.scroll && this.$refs.scroll.update();
      },
      getContentByLocalStorage(content) {
        this.content = content.data;
        console.log(this.content);
        return Promise.resolve();
      },
      getContentByHttp(id) {
        return getCategoryContent(id).then(data => {
          return new Promise(resolve => {
            if (data) {
              this.content = data;
              console.log(this.content);
              resolve();
            }
          });
        });
      },
      updateLocalStorage(contens, id, curTime) {
        contens = contens || {};
        contens[id] = {};
        contens[id].updateTime = curTime;
        contens[id].data = this.content;
        storage.set(CATEGORY_CONTENT_KEY, contens);
      },
      scrollEnd(translate, scroll) {
        this.isVisible = translate < 0 && -translate > scroll.height;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .content-wrapper{
    position: relative;
    height: 100%;

    .loading-contaner{
      position: absolute;
      top: 0;
      left: 0;
      z-index: $category-popup-z-index;
      @include flex-center();
      width: 100%;
      height: 100%;
      .loading-wrapper{
        width: 50%;
        padding: 30px 0;
        background-color: $modal-bgc;
        border-radius: 4px;
        .mine-loading{
          color: #fff;

        }
      }
    }

    .content{
      padding: 10px;

      .pic{
        margin-bottom: 12px;
        &-link{
          display: block;
        }
        &-img{
          width: 100%;
        }
      }

      .section{
        margin-bottom: 12px;
        &:last-child{
          margin-bottom: 0;
        }

        &-title{
          height: 28px;
          line-height: 28px;
          color: #080808;
          font-weight: bold;
        }
        &-list{
          display: flex;
          flex-wrap: wrap;
          background-color: #fff;
          padding: 10px 10px 0;
        }
        &-item{
          width: (100% / 3);
        }
        &-link{
          display: block;
        }
        &-pic{
          position: relative;
          width: 80%;
          padding-bottom: 80%;
          margin: 0 auto;
        }
        &-img{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        &-name{
          height: 36px;
          line-height: 36px;
          text-align: center;
          @include ellipsis();
        }
      }
    }
  }
</style>
