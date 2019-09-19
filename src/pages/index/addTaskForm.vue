<template>
  <div class="content-box">
    <common-header :tittle="tittle" :showback="true" :addTask="false"></common-header>
    <div>
    </div>
    <div class="page-content">
      <mt-field label=" session" title="类型" placeholder="请输入 session" v-model="cookie"></mt-field>
      <mt-radio align="left" title="类型" :value.sync="type" :options="typeOptions">
      </mt-radio>
      <mt-radio align="left" title="组数" :value.sync="times" :options="timesOptions">
      </mt-radio>
      <mt-button class='loginBtn' type="primary" @click="addTask">提交</mt-button>
      <mt-button class='loginBtn' @click="toHome">返回</mt-button>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapState } from 'vuex';
import commonHeader from 'common/common-header';
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
      this.$toast(`${this.cookie}，${this.times},${this.type}`);
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
  margin-top: 10px;
  .mb(98);
}

</style>
