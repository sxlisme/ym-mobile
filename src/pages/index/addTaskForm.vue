<template>
  <div class="content-box">
    <common-header :tittle="tittle" :showback="true" :addTask="false"></common-header>
    <div>
    </div>
    <div class="page-content">
      <div class="formBox">
        <mt-field label=" session" title="类型" placeholder="请输入 session" v-model="cookie"></mt-field>
        <mt-radio align="left" title="类型" :value.sync="type" :options="typeOptions">
        </mt-radio>
        <mt-radio align="left" title="组数" :value.sync="times" :options="timesOptions">
        </mt-radio>
      </div>
      <mt-button class='loginBtn' type="primary" @click="addTask">提交</mt-button>
      <mt-button class='loginBtn' @click="toHome">返回</mt-button>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapState } from 'vuex';
import commonHeader from 'common/common-header';
import { addTasks } from '../../api/api';
import { Indicator } from 'mint-ui';
export default {
  data() {
    return {
      tittle: '新增任务',
      type: 'mb',
      times: 120,
      cookie: '',
      typeOptions: [{
        label: '幸运彩球',
        value: 'mb'
      }, {
        label: '金猪送福',
        value: 'mx'
      }],
      timesOptions: [{
        label: 120,
        value: 120
      }, {
        label: 100,
        value: 100
      }, {
        label: 50,
        value: 50
      }, {
        label: 20,
        value: 20
      }, {
        label: 10,
        value: 10
      }]
    }
  },
  created() {},
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    toHome() {
      this.$router.togo('/home');
    },
    testIsNull() {
      this.cookie = this.cookie.trim().replace(/'/g, ''); // 去两边除空格
      if (this.cookie.length > 0) {
        return true;
      } else {
        this.$toast('cookie不能为空！！！');
        return false;
      }
    },
    addTask() {
      var boo = this.testIsNull();
      if (!boo) return;
      var username = sessionStorage.getItem('username');
      var uid = sessionStorage.getItem('uid');
      if (this.cookie && username && this.type && this.times && uid) {} else {
        this.$toast('新增失败!');
        return false;
      }
      var param = {
        cookies: this.cookie,
        username: username,
        type: this.type,
        times: this.times,
        uid: uid
      };
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      addTasks(param).then((res) => {
        Indicator.close();
        if (res && res.data.code === 200) {
          this.$toast('新增成功!');
          this.$router.togo('/home');
        } else {
          this.$toast('新增失败!');
        }
      }).catch((e) => {
        Indicator.close();
        console.log(e);
        this.$toast('新增失败!');
      });
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
.mint-cell-wrapper {
  background-image: -webkit-gradient(linear, left top, left bottom, from(#ffffff), color-stop(50%, #ffffff), color-stop(50%, #ffffff00));
  background-image: linear-gradient(180deg, #ffffff, #ffffff 50%, #ffffff00 50%);
  background-size: 86% 0px !important;
}

@import "~styles/index.less";
@import "~styles/variable.less";

.content-box {}

.page-content {
  margin-bottom: 0 !important;
  display: block;

  .formBox {
    width: 98%;
    margin: 0 auto;
    margin-top: 10px;
    overflow: hidden;
    margin-bottom: inherit;

    .mint-cell-wrapper {
      background-image: -webkit-gradient(linear, left top, left bottom, from(#ffffff), color-stop(50%, #ffffff), color-stop(50%, #ffffff00));
      background-image: linear-gradient(180deg, #ffffff, #ffffff 50%, #ffffff00 50%) !important;
    }

    .long_input {
      width: 98%;
    }
  }

  .loginBtn {
    width: 98%;
    margin-top: 5px;
    min-height: 41px;
  }

  .mb(98);
}

</style>
