import Vue from "vue";

/**
 * install方法会在外界调用Vue.use的时候执行
 * 并且在执行的时候会把Vue实例和一些额外的参数传递给我们
 * @param Vue Vue实例
 * @param options 额外的参数
 */
const install = (Vue, options) => {
    Vue.mixin({
        // beforeCreate方法会在每一个组件创建的时候执行
        beforeCreate() {
            /*
            如果是根组件, 那么默认就有store
            我们只需要将store变成$store即可
            */
            if (this.$options && this.$options.store) {
                this.$store = this.$options.store;
            } else {
                /*
                如果不是根组件, 那么默认没有store
                我们只需要将它父组件的$store赋值给它即可
                */
                this.$store = this.$parent.$store;
            }
        }
    });
}

class Store {
    constructor(options) {
        // this.state = options.state;
        Vue.util.defineReactive(this, 'state', options.state);

        // 将传递进来的 getters 放到 Store 上
        this.initGetters(options);

        // 将传递进来的 mutations 放到 Store 上
        this.initMutations(options);
    }

    initGetters(options) {
        // 1.拿到传递进来的getters
        let getters = options.getters || {};
        // 2.在Store上新增一个getters的属性
        this.getters = {};
        // 3.将传递进来的getters中的方法添加到当前Store的getters上
        for (let key in getters) {
            Object.defineProperty(this.getters, key, {
                get: () => {
                    // 4.将getters中的方法执行, 并且将state传递过去
                    return getters[key](this.state);
                }
            })
        }
    }

    commit(type, payload) {
        this.mutations[type](payload);
    }

    initMutations(options) {
        // 1.拿到传递进来的mutations
        let mutations = options.mutations || {};
        // 2.在Store上新增一个mutations的属性
        this.mutations = {};
        // 3.将传递进来的mutations中的方法添加到当前Store的mutations上
        for (let key in mutations) {
            this.mutations[key] = (payload) => {
                mutations[key](this.state, payload);
            }
        }
    }
}

export default {
    install,
    Store
}
