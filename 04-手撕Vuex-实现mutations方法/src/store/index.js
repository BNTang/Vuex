import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './Nuex'
Vue.use(Vuex)
export default new Vuex.Store({
  // 用于保存全局共享数据
  state: {
    name: 'lnj',
    num: 0
  },
  getters: {
    myName(state){
      return state.name + '666';
    }
  },
  // 用于同步修改共享数据
  mutations: {
    addNum(state, payload){
      console.log(state, payload);
      state.num += payload;
    }
  },
  // 用于异步修改共享数据
  actions: {
  },
  // 用户模块化共享数据
  modules: {
  }
})
