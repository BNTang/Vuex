<template>
  <div class="hello">
    <p>{{ this.$store.state.num }}</p>
    <button @click="myFn">我是按钮</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    console.log(this.$store);
  },
  methods: {
    myFn() {
      this.$store.commit('addNum', 10);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
