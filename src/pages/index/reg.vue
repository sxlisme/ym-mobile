<template>
  <div class="content-box">
    <common-header :tittle="tittle" :showback="false" :addTask="false"></common-header>
    <div class="page-content">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-field label="确认密码" placeholder="请再次确认密码" type="password" v-model="password2"></mt-field>
      <mt-button class='regbBtn' type="primary" @click='reg'>注册</mt-button>
      <mt-button class='regbBtn' @click="login">返回</mt-button>
      <br>
      <mt-badge class='info' size="small" color="#888" @click.native='showInfo'>注册要求</mt-badge>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import commonHeader from 'common/common-header'
export default {
  data() {
    return {
      tittle: '用户注册',
      num: 0,
      username: '',
      password: '',
      password2: ''
    }
  },
  created() {},
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    login() {
      this.$router.togo('/login')
    },
    testIsNull() {
      this.username = this.username.trim().replace(/'/g, ''); // 去两边除空格
      this.password = this.password.trim().replace(/'/g, ''); // 去两边除空格
      this.password2 = this.password2.trim().replace(/'/g, '');
      if (this.username.length > 0 && this.password !== this.password2) {
        this.$toast('两次密码不一致！');
        return false;
      }
      if (this.username.length > 0 && this.password.length > 0 && this.password2 > 0) {
        return true;
      } else {
        this.$toast('含有空格或输入不全！！!');
        return false;
      }
    },
    reg() {
      var boo = this.testIsNull();
      if (!boo) return;
      this.$toast('注册中，请稍后。。。');
      this.$router.togo('/login');
    },
    showInfo() {
      this.$toast('不可输入空格或\'(单引号)等特殊符号！');
    }
  },
  components: {
    commonHeader
  },
  computed: {
    ...mapGetters([
      'number'
    ]),
    ...mapState({
      number: state => state.home.number
    })
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";

.page-content {
  margin-top: 20%;
  .mb(98);
}

.regbBtn {
  width: 98%;
  margin-top: 5px;
}

.info {
  margin: 10px;
  float: right;
}

</style>
