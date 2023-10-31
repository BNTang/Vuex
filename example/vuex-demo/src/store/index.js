import Vue from 'vue'
import Vuex from './Nuex'
// import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name: 'BNTang',
        num: 0
    },
    getters: {
        myName(state) {
            return state.name + '666';
        }
    },
    mutations: {
        /**
         * 通过commit调用
         * @param state 仓库的state
         * @param payload 载荷
         */
        addNum(state, payload) {
            state.num += payload;
        },
    },
    actions: {},
    modules: {}
});
