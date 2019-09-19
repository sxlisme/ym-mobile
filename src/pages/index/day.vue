<template>
  <div class="content-box">
    <common-header :tittle="tittle" :showback="false"></common-header>
    <div class="page-content">
      用户:{{username}}
      <br>
      <mt-button @click="logout">退出</mt-button>
    </div>
  </div>
</template>
<script>
// import { mapMutations, mapGetters, mapState } from 'vuex'
import commonHeader from 'common/common-header'
export default {
  data() {
    return {
      tittle: '我的',
      username: '',
      num: 0
    }
  },
  created() {},
  methods: {
    // ...mapMutations({
    //   setNum: 'SET_NUM'
    // }),
    // todetail() {
    //   this.$router.togo('/Home/Detail')
    // },
    logout() {
      sessionStorage.clear();
      this.$router.togo('/login');
      this.$toast('退出成功!');
    },
    getUserInfo() {
      this.username = sessionStorage.getItem('username');
    }
  },
  components: {
    commonHeader
  },
  // computed: {
  //   ...mapGetters([
  //     'number'
  //   ]),
  //   ...mapState({
  //     number: state => state.home.number
  //   }),

  // },
  // comunted(){
  //   this.getUserInfo();
  // },
  mounted() {
    this.getUserInfo();
  },

  watch: {
    '$route'() {
      if (this.$route.path === '/me') {
        this.getUserInfo();
      }
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";

.page-content {
  .mb(98);
}

</style>
