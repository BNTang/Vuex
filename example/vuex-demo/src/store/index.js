import Vue from 'vue'
// import Vuex from './Nuex'
import Vuex from 'vuex'

Vue.use(Vuex);

let home = {
    state: {
        name: '首页',
        globalName: 'BNTang',
    },
    getters: {
        getHomeName(state) {
            return state.name + '222222';
        },
    },
    mutations: {
        changeHomeName(state, payload) {
            state.name += payload;
        },
        changeGlobalName(state, payload) {
            console.log("home中的changeGlobalName");
            state.globalName += payload;
        }
    },
    actions: {
        asyncChangeHomeName({commit}, payload) {
            setTimeout(() => {
                commit('changeHomeName', payload);
            }, 1000);
        },
        asyncChangeGlobalName({commit}, payload) {
            console.log("home中的asyncChangeGlobalName");
            setTimeout(() => {
                commit('changeGlobalName', payload);
            }, 1000);
        }
    }
}
let login = {
    state: {
        name: '登录'
    },
    getters: {
        getLoginName(state) {
            return state.name + '333333';
        }
    },
    mutations: {
        changeLoginName(state, payload) {
            state.name += payload;
        }
    },
    actions: {
        asyncChangeLoginName({commit}, payload) {
            setTimeout(() => {
                commit('changeLoginName', payload);
            }, 1000);
        }
    }
}
let account = {
    state: {
        name: '账户'
    },
    getters: {
        getAccountName(state) {
            return state.name + '333333';
        }
    },
    mutations: {
        changeAccountName(state, payload) {
            state.name += payload;
        }
    },
    actions: {
        asyncChangeAccountName({commit}, payload) {
            setTimeout(() => {
                commit('changeAccountName', payload);
            }, 1000);
        }
    },
    modules: {
        login: login
    }
}
export default new Vuex.Store({
    state: {
        globalName: 'BNTang',
    },
    getters: {
        getGlobalName(state) {
            return state.globalName + '111111';
        }
    },
    mutations: {
        changeGlobalName(state, payload) {
            console.log("全局中的changeGlobalName");
            state.globalName += payload;
        }
    },
    actions: {
        asyncChangeGlobalName({commit}, payload) {
            console.log("全局中的asyncChangeGlobalName");
            setTimeout(() => {
                commit('changeGlobalName', payload);
            }, 1000);
        }
    },
    modules: {
        home: home,
        account: account
    }
});
