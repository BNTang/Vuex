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

class ModuleCollection {
    constructor(options) {
        this.register([], options);
    }

    register(arr, rootModule) {
        // 1.按照我们需要的格式创建模块
        let module = {
            _raw: rootModule,
            _state: rootModule.state,
            _children: {}
        }

        // 2.保存模块信息
        if (arr.length === 0) {
            // 保存根模块
            this.root = module;
        } else {
            // 保存子模块
            let parent = arr.splice(0, arr.length - 1).reduce((root, currentKey) => {
                return root._children[currentKey];
            }, this.root);
            parent._children[arr[arr.length - 1]] = module;
        }

        // 3.处理子模块
        for (let childrenModuleName in rootModule.modules) {
            let childrenModule = rootModule.modules[childrenModuleName];
            this.register(arr.concat(childrenModuleName), childrenModule)
        }
    }
}

class Store {
    constructor(options) {
        // this.state = options.state;
        Vue.util.defineReactive(this, 'state', options.state);

        // 将传递进来的 getters 放到 Store 上
        this.initGetters(options);

        // 将传递进来的 mutations 放到 Store 上
        this.initMutations(options);

        // 将传递进来的 actions 放到 Store 上
        this.initActions(options);

        // 提取模块信息
        this.modules = new ModuleCollection(options);
        // console.log(this.modules);

        // 安装子模块的数据
        this.initModules([], this.modules.root);
    }

    initModules(arr, module) {
        console.log(arr);
        // 如果当前模块是子模块，那么就需要将数据安装到 this.state 上
        if (arr.length > 0) {

        }

        // 如果当前模块不是子模块，那么就需要从根模块中取出子模块的信息来安装
        for (let moduleName in module._children) {
            this.initModules(arr.concat(moduleName), module._children[moduleName]);
        }
    }

    dispatch = (type, payload) => {// asyncAddAge', 10
        this.actions[type](payload);// this.actions[asyncAddAge](10);
    }

    initActions(options) {
        // 1.拿到传递进来的actions
        let actions = options.actions || {};
        // 2.在Store上新增一个actions的属性
        this.actions = {};
        // 3.将传递进来的actions中的方法添加到当前Store的actions上
        for (let key in actions) {
            this.actions[key] = (payload) => {// 10
                // 4.将actions中的方法执行, 并且将当前Store实例传递过去
                actions[key](this, payload);// asyncAddAge(this, 10);
            }
        }
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

    commit = (type, payload) => {
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
