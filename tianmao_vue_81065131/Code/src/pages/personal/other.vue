<template>
  <ul class="other">
    <li class="other-list" v-for="(item, index) in otherList" :key="index" @click="otherLink">
      <div class="other-left">
        <i class="iconfont" :class="item.icon"></i>
        <span>{{item.name}}</span>
      </div>
      <div class="other-right">
        <i class="iconfont other-icon-back icon-back"></i>
      </div>
    </li>
  </ul>
</template>

<script>
  import { otherList } from './config';

  export default {
    name: 'PersonalOther',
    created() {
      this.otherList = otherList;
    },
    methods: {
      otherLink({ target }) {
        if (target.nodeName !== 'SPAN') {
          if (target.children.length !== 2) {
            target = target.parentNode;
          }
          if (target.nodeName === 'DIV') {
            target = target.parentNode;
          }
          target = target.children[0].children[1];
        }
        this.$emit('orther-link', target);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .other{
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    background-color: #fff;

    &-list{
      display: flex;
      flex-direction: row;
      padding: 10px 10px;
      border-bottom: solid 1px rgb(239,239,239);
      &:last-child{
        border-bottom: none;
      }
    }
    &-right,
    &-left{
      flex: 1;
    }
    &-right{
      display: flex;
      flex-direction: row-reverse;
    }
    &-icon-back{
      transform: rotate(180deg);
    }
  }
</style>
