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
        // this.state = options.state;
        /*
        在Vue中有一个util的工具类, 这个工具类上有一个defineReactive方法
        通过这个方法就可以快速的将某个数据变成双向绑定的数据
        defineReactive这个方法接收三个参数
        第一个参数: 要给哪个对象添加属性
        第二个参数: 要给指定的对象添加什么属性
        第三个参数: 要给这个属性添加什么值
        * */
        Vue.util.defineReactive(this, 'state', options.state);
        // 将传递进来的getters放到Store上
        this.initGetters(options);
        // 将传递进来的mutations放到Store上
        this.initMutations(options);
    }
    commit(type, payload){ // 'addNum', 10
        this.mutations[type](payload); //  this.mutations[addNum](10);
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