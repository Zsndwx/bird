<template>
  <div class="header">
    <ul class="header-list">
      <li class="header-top">
        <p class="header-title">我的慕淘</p>
        <i @click="setting" class="iconfont icon-setting"></i>
        <i @click="msg" class="iconfont icon-msg"></i>
      </li>
      <li class="header-middle">
        <i @click="personal" class="iconfont icon-personal"></i>
      </li>
      <li class="header-bottom">
        <a href="javascript:;" class="header-register">注册</a>
        <a href="javascript:;" class="header-login">登录</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'PersonalHeader',
    methods: {
      setting() {
        console.log('setting');
        this.$emit('setting-icon');
      },
      msg() {
        console.log('msg');
        this.$emit('msg-icon');
      },
      personal() {
        console.log('personal');
        this.$emit('personal-icon');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .header{
    width: 100%;
    background-color: rgb(222,24,27);
    color: #fff;
    &-list{
      display: flex;
      flex-direction: column;
    }
    &-top{
      display: flex;
      flex-direction: row;
      position: relative;
    }
    &-title{
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 26px;
    }
    .icon{
      &-setting,
      &-msg{
        position: absolute;
        top: 4px;
      }
      &-msg{
        right: 8px;
      }
      &-setting{
        right: 30px;
      }
      &-personal{
        font-size: 58px;
      }
    }
    &-middle{
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      padding: 8px 0;
    }
    &-bottom{
      display: flex;
      flex-direction: row;
      position: relative;
      &::before{
        content: '';
        display: block;
        position: absolute;
        width: 0;
        height: 20px;
        top: 9px;
        left: 50%;
        border-right: solid 1px #fff;
      }
    }
    &-login,
    &-register{
      flex: 1;
      display: flex;
      justify-content: center;
      color: #fff;
      padding: 10px 0;
      font-size: 20px;
      position: relative;
    }
    &-register{
      left: 10%;
    }
    &-login{
      right: 10%;
    }
  }
</style>
