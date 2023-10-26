import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './Nuex'
/*
1.Vuex特点1
  使用Vuex的时候需要用到Vue的use方法
  我们都知道use方法是用于注册插件的
  所以VueX的本质就是一个插件
  所以实现VueX就是在实现一个全局共享数据的插件
 */
Vue.use(Vuex)
/*
2.Vuex特点2
  在使用Vuex的时候我们会通过Vuex.Store创建一个仓库
  所以还需要在Vuex中新增Store属性, 这个属性的取值是一个类
 */
export default new Vuex.Store({
  // 用于保存全局共享数据
  state: {
    name: 'lnj'
  },
  // 用于同步修改共享数据
  mutations: {
  },
  // 用于异步修改共享数据
  actions: {
  },
  // 用户模块化共享数据
  modules: {
  }
})
/*
3.Vuex特点3
  为了保证每个Vue实例中都能通过this.$store拿到仓库,
  我们还需要给每个Vue实例都动态添加一个$store属性
 */
