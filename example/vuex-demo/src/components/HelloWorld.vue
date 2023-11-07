<template>
  <div class="hello">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    globalFn1() {
      this.$store.commit('changeGlobalName', 10);
    },
    globalFn2() {
      this.$store.dispatch('asyncChangeGlobalName', 5);
    },
    homeFn1() {
      this.$store.commit('changeHomeName', 10);
    },
    homeFn2() {
      this.$store.dispatch('asyncChangeHomeName', 5);
    },
    accountFn1() {
      this.$store.commit('changeAccountName', 10);
    },
    accountFn2() {
      this.$store.dispatch('asyncChangeAccountName', 5);
    },
    loginFn1() {
      this.$store.commit('changeLoginName', 10);
    },
    loginFn2() {
      this.$store.dispatch('asyncChangeLoginName', 5);
    }
  }
}
</script>
<style scoped>
</style>
