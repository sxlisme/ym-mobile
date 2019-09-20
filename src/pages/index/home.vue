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
          <div class='taskItem'>2019-09-15 13:48:55</div>
          <div class='taskItem'>-</div>
          <div class='taskItem'>13:48:55</div>
          <div class='taskItem'>
            <mt-badge size="small" v-if="v.status===0" type="primary">等待</mt-badge>
            <mt-badge size="small" v-else-if="v.status===-1" type="error">失效</mt-badge>
            <mt-badge size="small" v-else-if="v.status===1" type="primary">抽奖中..</mt-badge>
            <mt-badge size="small" v-else-if="v.status===2" type="success">完毕</mt-badge>
          </div>
        </div>
        <div class='taskCol'>
          <div class='taskItem'>积分:
            <mt-badge v-if='v.harvest*1>0' size="small" type="success">{{v.harvest}}</mt-badge>
            <mt-badge v-else size="small" type="error">{{v.harvest}}</mt-badge>
          </div>
          <div class='taskItem'>
            <mt-badge type="primary">奖品</mt-badge>
          </div>
          <div class='taskItem'>
            <mt-badge type="primary" @click.native="toLogs(v.id)">日志</mt-badge>
          </div>
          <div class='taskItem'>
            <mt-badge type="primary">一键重跑</mt-badge>
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
import { getTaskLists } from '../../api/api'
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
      taskList: [{ 'id': '10', 'uid': 2, 'type': 'mb', 'username': 'xiaoliang', 'insert_time': '2019-09-15T05:48:55.000Z', 'finish_time': '0000-00-00 00:00:00', 'group_num': 120, 'status': 0, 'cookies': 'SESSION=59cc6946-eb53-4930-9301-46955d31e3dd', 'harvest': '', 'has_goods': '' }, { 'id': '5', 'uid': 6, 'type': 'mb', 'username': 'Cindy1234', 'insert_time': '2019-09-14T13:05:19.000Z', 'finish_time': '2019-09-14T13:06:10.000Z', 'group_num': 120, 'status': -1, 'cookies': ' SESSION=ef61bf3b-43a3-426a-b7d2-1242edda6680; ', 'harvest': '3457', 'has_goods': '' }, { 'id': '3', 'uid': 2, 'type': 'mb', 'username': 'xiaoliang', 'insert_time': '2019-09-14T06:43:26.000Z', 'finish_time': '2019-09-14T07:20:29.000Z', 'group_num': 120, 'status': 1, 'cookies': 'SESSION=00e691f8-1b37-4ac1-b189-c99ef4707306', 'harvest': '-506', 'has_goods': '标准洗车服务（1次）权益|标准洗车服务（1次）权益' }, { 'id': '2', 'uid': 2, 'type': 'mb', 'username': 'xiaoliang', 'insert_time': '2019-09-14T02:06:29.000Z', 'finish_time': '2019-09-14T02:07:06.000Z', 'group_num': 120, 'status': -1, 'cookies': 'SESSION=38862ea6-be47-4d48-aca1-9a042706991c', 'harvest': '762', 'has_goods': '' }]
    }
  },
  methods: {
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
    getTaskList() {
      var param = { 'page': this.page, name: sessionStorage.getItem('username') };
      console.log(param);
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
    margin-top: 5px;
    margin-bottom: 5px;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 100%;
    border-radius: 20px;

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
