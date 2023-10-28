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
        this.options = options;
    }
}

export default {
    install,
    Store
}
