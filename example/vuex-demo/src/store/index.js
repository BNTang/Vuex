import Vue from 'vue'
import Vuex from './Nuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name: 'BNTang'
    },
    getters: {
        myName(state) {
            return state.name + '666';
        }
    },
    mutations: {},
    actions: {},
    modules: {}
});
