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
        this.state = options.state;
        // 将传递进来的getters放到Store上
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