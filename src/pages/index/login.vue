<template>
  <div class="content-box">
    <common-header :tittle="tittle" :showback="false" :addTask="false"></common-header>
    <div>
    </div>
    <div class="page-content">
      <div class="formBox">
        <mt-field class='long_input' label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field class='long_input' label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      </div>
      <mt-button class='loginBtn' type="primary" @click="login">登陆</mt-button>
      <mt-button class='loginBtn' @click="toReg">注册</mt-button>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapState } from 'vuex';
import commonHeader from 'common/common-header';
import { requestLogin } from '../../api/api'
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
      if (this.username.length > 0 && this.password.length > 0) {
        return true;
      } else {
        this.$toast('请规范输入！！！');
        return false;
      }
    },
    login() { // 登录
      if (!this.testIsNull()) {
        return false;
      } else {
        var param = {
          username: this.username,
          password: this.password
        }
        requestLogin(param).then((res) => {
          if (res.code === 500) {
            this.$toast(res.msg);
          } else if (res.code === 200) {
            this.$toast(res.msg);
            sessionStorage.setItem('username', res.user.name);
            sessionStorage.setItem('uid', res.user.id);
            this.$router.togo('/home');
          }
        }).catch((err) => {
          this.$toast(err);
        });
      }
      // sessionStorage.setItem('username', this.username); // 登录状态管理
      // var data = sessionStorage.getItem('username');
      // console.log(data);
      // let instance = this.$toast('登陆成功');
      // this.$router.togo('/home');
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
  .mb(98);

  .formBox {
    width: 98%;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
    margin-bottom: inherit;

    .mint-cell-wrapper {
      background-image: -webkit-gradient(linear, left top, left bottom, from(#ffffff), color-stop(50%, #ffffff), color-stop(50%, #ffffff00));
      background-image: linear-gradient(180deg, #ffffff, #ffffff 50%, #ffffff00 50%);
    }

    .long_input {
      width: 98%;
    }
  }
}

</style>
