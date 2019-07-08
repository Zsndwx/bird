import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    shoppingBar: []
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    shopBar: (state, obj) => state.shoppingBar.push(obj)
  },
  actions: {
    inc(context) {
      context.commit('increment');
    },
    shop(context, obj) {
      context.commit('shopBar', obj);
    }
  }
});
