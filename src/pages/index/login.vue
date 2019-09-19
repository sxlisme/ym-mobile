<template>
  <div class="content-box">
    <common-header :tittle="tittle" :showback="false" :addTask="false"></common-header>
    <div>
    </div>
    <div class="page-content">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-button class='loginBtn' type="primary" @click="login">登陆</mt-button>
      <mt-button class='loginBtn' @click="toReg">注册</mt-button>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapState } from 'vuex';
import commonHeader from 'common/common-header';
export default {
  data() {
    return {
      tittle: '用户登陆',
      username: '',
      password: '',
      num: 0
    }
  },
  created() {},
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    toReg() {
      this.$router.togo('/reg');
    },
    testIsNull() {
      // var username = this.username;
      // var password = this.password;
      this.username = this.username.trim().replace(/'/g, ''); // 去两边除空格
      this.password = this.password.trim().replace(/'/g, ''); // 去两边除空格
      console.log(1)
      if (this.username.length > 0 && this.password.length > 0) {
        return true;
      } else {
        this.$toast('请规范输入！！！');
        return false;
      }
    },
    login() { // 登录
      if (!this.testIsNull()) {
        return;
      };
      sessionStorage.setItem('username', this.username); // 登录状态管理
      var data = sessionStorage.getItem('username');
      console.log(data);
      let instance = this.$toast('登陆成功');
      this.$router.togo('/home');
      setTimeout(() => {
        instance.close();
      }, 2500);
    },
    logout() { // 退出
      sessionStorage.clear();
      this.$router.togo('/login');
      this.$toast('退出成功!');
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

.content-box {
  .loginBtn {
    width: 98%;
    margin-top: 5px;
  }
}

.page-content {
  margin-top: 20%;
  .mb(98);
}

</style>
