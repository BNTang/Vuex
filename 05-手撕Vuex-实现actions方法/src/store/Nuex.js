import Vue from 'vue'
const install = (Vue, options)=>{
    // 给每一个Vue实例都添加一个$store属性
    Vue.mixin({
        beforeCreate(){
            if(this.$options && this.$options.store){
                this.$store = this.$options.store;
            }
            else{
                this.$store = this.$parent.$store;
            }
        }
    });
}
class Store {
    constructor(options){
        // 将传递进来的state放到Store上
        Vue.util.defineReactive(this, 'state', options.state);
        // 将传递进来的getters放到Store上
        this.initGetters(options);
        // 将传递进来的mutations放到Store上
        this.initMutations(options);
        // 将传递进来的actions放到Store上
        this.initActions(options);
    }
    dispatch = (type, payload)=>{ // 'asyncAddAge', 5
        this.actions[type](payload); // this.actions[asyncAddAge](5);
    }
    initActions(options){
        // 1.拿到传递进来的actions
        let actions = options.actions || {};
        // 2.在Store上新增一个actions的属性
        this.actions = {};
        // 3.将传递进来的actions中的方法添加到当前Store的actions上
        for(let key in actions){
            this.actions[key] = (payload)=>{ // 5
                actions[key](this, payload); // asyncAddAge(this, 5);
            }
        }
    }
    commit = (type, payload)=>{ // 'addAge', 5
        // console.log(this);
        this.mutations[type](payload); //  this.mutations[addAge](5);
    }
    initMutations(options){
        // 1.拿到传递进来的mutations
        let mutations = options.mutations || {};
        // 2.在Store上新增一个mutations的属性
        this.mutations = {};
        // 3.将传递进来的mutations中的方法添加到当前Store的mutations上
        for(let key in mutations){
            this.mutations[key] = (payload)=>{ // 10
                mutations[key](this.state, payload); // addNum(this.state, 10);
            }
        }
    }
    initGetters(options){
        // this.getters = options.getters;
        // 1.拿到传递进来的getters
        let getters = options.getters || {};
        // 2.在Store上新增一个getters的属性
        this.getters = {};
        // 3.将传递进来的getters中的方法添加到当前Store的getters上
        for(let key in getters){
            Object.defineProperty(this.getters, key, {
                get:()=>{
                    return getters[key](this.state);
                }
            })
        }
    }
}
export default {
    install,
    Store
}