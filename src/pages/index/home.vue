<template>
  <div class="content-box">
    <common-header :tittle="tittle" :showback="false" :addTask="true"></common-header>
    <div class="page-content">
      <!-- <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"> -->
      <!--  <mt-button @click="todetail">home</mt-button> -->
      <div v-for="(v,i) in taskList" :key='i' class='taskListCard'>
        <div class='taskCol'>
          <div class='taskItem'># <b>{{v.id}}</b></div>
          <div class='taskItem'>cookie:{{v.cookies|f_cook}}</div>
          <div class='taskItem'>{{v.type|f_type}}*{{v.group_num}}</div>
        </div>
        <div class='taskCol'>
          <div class='taskItem'>{{v.insert_time|i_time}}</div>
          <div class='taskItem'>-</div>
          <div class='taskItem'>{{v.finish_time|f_time}}</div>
          <div class='taskItem'>
            <mt-badge size="small" v-if="v.status===0" type="primary">等待</mt-badge>
            <mt-badge size="small" v-else-if="v.status===-1" type="error">失效</mt-badge>
            <mt-badge size="small" v-else-if="v.status===1" type="primary">抽奖中..</mt-badge>
            <mt-badge size="small" v-else-if="v.status===2" type="success">完毕</mt-badge>
          </div>
        </div>
        <div class='taskCol' v-show ="v.status!==-1">
          <div class='taskItem'>积分:
            <mt-badge v-if='v.harvest*1>0' size="small" type="success">{{v.harvest}}</mt-badge>
            <mt-badge v-else size="small" type="error">{{v.harvest}}</mt-badge>
          </div>
          <div class='taskItem'>
            <mt-badge type="primary" @click.native="showGift(v.has_goods)" size="small" v-show="v.has_goods!==''">奖品</mt-badge>
            <span v-show="v.has_goods==''&&v.status===2">未中奖</span>
            <!-- <mt-badge size="small" color="#888" v-show="v.has_goods==''&&v.status===2">未中奖</mt-badge>  -->
          </div>
          <div class='taskItem'>
            <mt-badge type="primary" size="small" @click.native="toLogs(v.id)">日志</mt-badge>
          </div>
          <div class='taskItem'>
            <mt-badge type="primary" size="small" v-show="v.status!==-1" @click.native="oneKeyRun(v)">一键重跑</mt-badge>
            <!-- <mt-badge size="small" color="#888" v-show="v.status===-1" >一键重跑</mt-badge> -->
          </div>
        </div>
      </div>
      <div class="taskListCard">
        <mt-button icon="more" class='more' @click='getMore'>{{moreBtnName}}</mt-button>
      </div>
      <!--  </mt-loadmore> -->
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import commonHeader from 'common/common-header'
import { getTaskLists, addTasks } from '../../api/api'
import { dateFtt } from '../../util/utils'
import { Indicator } from 'mint-ui'
// import { ERR_OK } from 'config/index'

export default {
  data() {
    return {
      tittle: '首页',
      num: 0,
      id: 666,
      list: [1, 2, 3, 4],
      page: 1, // 分页页数,
      total: 1, // 总条数
      allLoaded: true,
      moreBtnName: '加载更多',
      taskList: []
    }
  },
  methods: {
    refreshData() {
      this.page = 1;
      this.total = 1;
      this.allLoaded = true;
      this.moreBtnName = '加载更多';
      this.taskList = [];
      this.getTaskList();
    },
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    todetail() {
      // this.$router.push({path: '/Home/Detail'});
      this.$router.togo('/Home/Detail/' + new Date())
    },
    loadTop() {
      // 加载更多数据
      this.$refs.loadmore.onTopLoaded();
      console.log('刷新');
    },
    loadBottom() {
      this.$refs.loadmore.onBottomLoaded();
      this.page += 1;
      console.log('加载数据:' + this.page);
    },
    showGift(v) {
      this.$toast(v);
    },
    oneKeyRun(v) {
      var param = {
        cookies: v.cookies,
        username: v.username,
        type: v.type,
        times: v.group_num,
        uid: v.uid
      };
      addTasks(param).then((res) => {
        Indicator.close();
        if (res && res.data.code === 200) {
          this.$toast('已重跑~');
          this.refreshData();
        } else {
          this.$toast('操作失败!');
        }
      }).catch((e) => {
        Indicator.close();
        console.log(e);
        this.$toast('操作失败!');
      });
    },
    getTaskList() {
      var param = { 'page': this.page, name: sessionStorage.getItem('username') };
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      getTaskLists(param).then((res) => {
        Indicator.close();
        if (res && res.data && res.data.code === 200) {
          this.total = res.data.total;
          this.taskList.push(...res.data.data);
        } else {
          this.$toast('获取信息失败');
        }
      }).catch((e) => {
        Indicator.close();
        this.$toast('获取信息失败');
      });
    },
    getMore() { // 显示更多
      this.page++;
      // 最大页数
      var maxPage = (this.total / 10) + 1;
      if (this.page > maxPage) {
        this.allLoaded = false;
      };
      if (this.allLoaded) {
        // /this.$toast('加载中。。。');
        this.getTaskList();
      } else {
        this.$toast('已加载所有，再点也没有');
        this.moreBtnName = '加载完毕'
      };
    },
    toLogs(tId) { // param taskid
      if (tId) {
        this.$router.togo('/Home/Detail/' + tId);
      } else {
        this.$toast('无法查看，因为没有获取到任务ID');
      }
    }
  },
  mounted() {
    this.getTaskList();
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
  },
  filters: {
    f_type: function(v) {
      if (!v) {
        return '--'
      } else if (v === 'mb') {
        return '幸运彩球'
      } else if (v === 'mx') {
        return '金猪送福'
      }
    },
    f_cook: function(v) {
      if (!v) {
        return '--'
      } else {
        return v.substring(v.length - 15, v.length);
      }
    },
    f_harvest: (v) => {
      if (!v) {
        return 0;
      } else if (v < 0) {
        return `<mt-badge  size="small" type="warning">${v}</mt-badge>`
      } else {
        return `<mt-badge  size="small" type="success">${v}</mt-badge>`
      }
    },
    i_time: (v) => { // 插入时间
      return dateFtt('yyyy-MM-dd hh:mm:ss', v);
    },
    f_time: (v) => { // 完成时间
      return dateFtt('hh:mm:ss', v);
    }
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";

.page-content {
  padding: 0px 5px 0px 5px;
  box-sizing: border-box;
  display: block;
  .mb(98);

  .taskListCard {
    margin-top: 10px;
    margin-bottom: 10px;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 100%;
    border-radius: 10px;

    .taskCol {
      display: flex;
      justify-content: space-around;
      width: 100%;
      margin: 5px;
    }
  }

  .more {
    width: 100%;
  }
}

</style>
