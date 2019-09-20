<template>
  <div class="content-box">
    <common-header :tittle="tittle" :showback="false" :addTask="false"></common-header>
    <div class="page-content">
      <div class='headInfoBox'>
        <div class="headImg">
          <div class="pic">
          </div>
        </div>
        <div class="userInfo">
          <div class="uname">{{username}}</div>
          <div class="uid">用户id:1</div>
        </div>
      </div>
      <br>
      <mt-badge v-show="session!=''" class='session' color='#888' size='small'>{{session}}</mt-badge>
      <mt-badge v-show="session==''" class='session' color='#888' size='small'>获取session失败</mt-badge>
      <br>
      <br>
      <mt-button class='logoutBtn' type="danger" @click="logout">退出</mt-button>
    </div>
  </div>
</template>
<script>
// import { mapMutations, mapGetters, mapState } from 'vuex'
import commonHeader from 'common/common-header'
import {baseUrl} from '../../api/api'
console.log(baseUrl);
export default {
  data() {
    return {
      session: 'SESSION=94e89769-73cf-4445-9419-3086a100359e',
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
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";

.page-content {

  .mb(98);
}

.logoutBtn {
  width: 98%;
}

.session {
  width: 93%;
  word-break: break-all;

}

.headInfoBox {
  margin: 0 auto;
  width: 98%;
  background: #fff;
  border-radius: 10px;
  height: 70px;
  margin-top: 10px;
  display: -webkit-flex;
  /* Safari */
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;

  .headImg {
    padding: 5px;
    width: 20%;

    .pic {
      width: 60px;
      height: 60px;
      background: #26a2ff;
      border-radius: 50%;
    }
  }

  .userInfo {
    display: -webkit-flex;
    /* Safari */
    display: flex;
    width: 70%;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;

    .uname {
      width: 100%;
      font-size: 22px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .uid {
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

</style>
