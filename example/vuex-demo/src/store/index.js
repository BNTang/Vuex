import Vue from 'vue'
// import Vuex from './Nuex'
import Vuex from 'vuex'

Vue.use(Vuex);

let home = {
    state: {
        name: '首页'
    },
    getters: {},
    mutations: {},
    actions: {}
}
let account = {
    state: {
        name: '账户'
    },
    getters: {},
    mutations: {},
    actions: {}
}
export default new Vuex.Store({
    state: {
        globalName: 'BNTang',
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
        /**
         * 通过dispatch调用
         * @param state 仓库的state
         * @param payload 载荷
         */
        addAge(state, payload) {
            state.age += payload;
        }
    },
    actions: {
        /**
         * 通过dispatch调用
         * @param commit 提交
         * @param payload 载荷
         */
        asyncAddAge({commit}, payload) {
            console.log(this);
            // 模拟异步操作
            setTimeout(() => {
                // 通过commit调用mutations中的方法
                commit('addAge', payload);
            }, 3000);
        }
    },
    modules: {
        home: home,
        account: account
    }
});
