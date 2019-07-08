<template>
  <div class="mine-addsubtract">
    <div class="mine-addsubtract-left" @click="subtract"
      :style="{'color': color, 'font-size': fontsize + 'px', 'background-color': bgcolor}">
      <i class="iconfont icon-minus"></i>
    </div>
    <input type="number" class="mine-addsubtract-middle" v-model="num" @change="inputChange"
      :style="{'color': color, 'font-size': fontsize + 'px', 'background-color': bgcolor}">
    <div class="mine-addsubtract-right" @click="add"
      :style="{'color': color, 'font-size': fontsize + 'px', 'background-color': bgcolor}">
      <i class="iconfont icon-jia"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MeAddsubtract',
    methods: {
      add({ target }) {
        this.num = this.getNumer(++this.num);
        if (target.nodeName === 'DIV') target = target.parentNode;
        if (target.nodeName === 'I') target = target.parentNode.parentNode;
        this.$emit('subtract', target, this.num);
      },
      subtract({ target }) {
        this.num = this.getNumer(--this.num);
        if (target.nodeName === 'DIV') target = target.parentNode;
        if (target.nodeName === 'I') target = target.parentNode.parentNode;
        this.$emit('subtract', target, this.num);
      },
      inputChange({ target }) {
        this.num = this.getNumer(this.num);
        target = target.parentNode;
        this.$emit('input-change', target, this.num);
      },
      verifiNum(num) {
        if (num >= this.min && num <= this.max) {
          return true;
        }
        return false;
      },
      getNumer(num) {
        if (this.verifiNum(num)) {
          return num;
        }
        if (num < this.min) return this.min;
        if (num > this.max) return this.max;
      }
    },
    props: {
      max: {
        type: Number,
        default: 1000
      },
      min: {
        type: Number,
        default: 0
      },
      color: {
        type: String,
        default: '#A09FA1'
      },
      fontsize: {
        type: Number,
        default: 12
      },
      bgcolor: {
        type: String,
        default: 'rgb(247,245,247)'
      }
    },
    data() {
      return {
        num: 1
      };
    }
  };
</script>

<style lang="scss" scoped>
  .mine-addsubtract{
    display: table;
    transform-origin: left top;
    transform: scale(.7);
    &-right,
    &-middle,
    &-left{
      display: table-cell;
      height: 100%;
      padding: 4px;
    }
    &-middle{
      width: 30px;
      text-align: center;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
</style>
