<template>
  <div class="mine-list-inline">
    <div class="mine-list-top">
      <div class="mine-list-left" v-if="$slots.left">
        <slot name="left"></slot>
      </div>
      <div class="mine-list-right" v-if="$slots.right">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="mine-list-bottom" v-if="$slots.bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MeListinline'
  };
</script>

<style lang="scss" scoped>
  .mine-list{
    &-inline{
      display: flex;
      flex-direction: column;
    }
    &-bottom,
    &-top{
      display: flex;
    }
    &-right,
    &-left{
      flex: 1;
      display: flex;
      flex-direction: row;
    }
    &-bottom{
      justify-content: space-between;
    }
  }
</style>
