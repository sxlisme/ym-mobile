<template>
  <div class="content-box">
    <common-header :tittle="tittle" :showmore="false" :addTask="false"></common-header>
    <div class="page-content">
      <h3 v-show="total===0">没有数据。。。。</h3>
      <div v-show="total!==0" class="heardBox">
        <ul class='ulBox hearUl'>
          <li class="libox">
            <div class="log_card_box">
              <div class="item_box">
                <div class="mainContent">{{id}}</div>
                <div class="tittles">任务ID</div>
              </div>
              <div class="item_box">
                <div class="mainContent">{{total}}</div>
                <div class="tittles">总条数</div>
              </div>
              <div class="item_box">
                <div class="mainContent">{{runDate}}</div>
                <div class="tittles">日期</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <ul class='ulBox' v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li class="libox" v-for="(item,i) in list" :key='item'>
          <div class="log_card_box">
            <div class="item_box_index">
              #{{i+1}}
            </div>
            <div class="item_box">
              <div class="mainContent">{{item.id}}</div>
              <div class="tittles">日志ID</div>
            </div>
            <div class="item_box">
              <div class="mainContent">{{item.win_time|i_time}}</div>
              <div class="tittles">时间</div>
            </div>
            <div v-show="item.reward_type===0" class="item_box">
              <div class="mainContent">{{item.reward}}</div>
              <div class="tittles">积分</div>
            </div>
            <div v-show="item.reward_type===1" class="item_box">
              <div class="mainContent">
                <mt-button size="small" @click.native='showGift(item.reward)' type="primary">查看</mt-button>
              </div>
              <div class="tittles">礼物</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import commonHeader from 'common/common-header'
import { Indicator } from 'mint-ui'
import { getGameLog } from '../api/api'
import { dateFtt } from '../util/utils'
export default {
  data() {
    return {
      id: '',
      tittle: '日志',
      data: 0,
      list: [],
      page: 1,
      total: 0,
      size: 100
    }
  },
  components: {
    commonHeader
  },
  methods: {
    loadMore() {
      var param = {
        taskid: this.id,
        page: this.page,
        size: this.size
      }
      var maxpage = this.total / this.size + 1;
      if (this.page > maxpage) { // 当当前页大于总页数时，不再加载数据
        this.$toast('数据全部加载完毕~');
        return;
      }
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      getGameLog(param).then((res) => {
        this.page++;
        this.total = res.data.total;
        this.list.push(...res.data.data);
        Indicator.close();
      }).catch((e) => {
        console.log(e);
        Indicator.close();
      });

      setTimeout(() => {
        Indicator.close();
      }, 1000);
    },
    showGift(v) {
      this.$toast(v);
    },
    tohome() {
      this.$router.goBack()
    },
    add() {
      this.data++
    },
    getQuery() {
      this.id = this.$route.params.id;
    }
  },
  computed: {
    runDate() {
      if (this.list.length > 0) {
        return dateFtt('yyyy-MM-dd', this.list[0].win_time);
      } else {
        return '---- -- --';
      }
    }
  },
  mounted() {
    this.getQuery();
  },
  filters: {
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
      return dateFtt('hh:mm:ss', v);
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
  justify-content: start;
}

.heardBox {
  width: 100%;
  margin: 0 auto;
  background: #26a2ff;

  .ulBox {
    .log_card_box {
      background: #26a2ff;

      .item_box {
        .mainContent {
          color: #fff;
        }

        .tittles {
          color: #d9d9d9;
        }

      }
    }
  }
}

.ulBox {
  overflow: auto;
  width: 98%;
  margin: 0 auto;

  .libox {
    margin: 10px 0px 10px 0px;
  }

  .log_card_box {
    display: flex;
    width: 100%;
    background: #fff;
    margin-top: 5px;
    margin-bottom: 5px;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 100%;
    border-radius: 10px;
    flex-direction: row;
    justify-content: space-around;

    .item_box_index {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 15px;
      margin-bottom: 15px;
    }

    .item_box {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-top: 5px;
      margin-bottom: 5px;

      .mainContent {
        font-size: 18px;
      }

      .tittles {
        color: #888;
      }
    }
  }
}

</style>
