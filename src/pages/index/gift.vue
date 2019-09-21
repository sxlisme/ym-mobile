<template>
  <div class="content-box">
    <common-header :tittle="tittle" :showback="false"></common-header>
    <div class="page-content">
      <div class="heardBox">
        <ul class='ulBox hearUl'>
          <li class="libox">
            <div class="log_card_box">
              <div class="item_box">
                <div class="mainContent">{{total}}</div>
                <div class="tittles">中奖记录（条）</div>
              </div>
              <div class="item_box">
                <div class="mainContent">
                  {{nowDate}}
                </div>
                <div class="tittles">截止当前</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="giftBox">
        <ul class='ulBox' v-infinite-scroll="getGifts" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <li class="libox" v-for="(item,i) in list" :key='item'>
            <div class="log_card_box">
              <div class="item_title">
                <div class="item_box_index">
                  #{{i+1}}
                </div>
                <div class="item_box">
                  <div class="mainContent">{{item.id}}</div>
                  <div class="tittles">日志ID</div>
                </div>
                <div class="item_box">
                  <div class="mainContent">{{item.win_time|i_time}}</div>
                  <div class="tittles">中奖时间</div>
                </div>
              </div>
              <div class="item_box">
                <div class="mainContent content">{{item.reward}}</div>
                <!-- <div class="tittles">奖品</div> -->
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- <mt-button @click="todetail">story</mt-button> -->
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import commonHeader from 'common/common-header'
import { getGifts } from '../../api/api'
import { dateFtt } from '../../util/utils'
import { Indicator } from 'mint-ui'
export default {
  data() {
    return {
      tittle: '我的礼物',
      num: 0,
      page: 1,
      size: 20,
      allLoaded: true,
      list: [],
      total: 0,
      nowDate: '--'
    }
  },
  created() {},
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    todetail() {
      this.$router.togo('/Home/Detail')
    },
    reload() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      var param = {
        username: sessionStorage.getItem('username'),
        page: 1,
        size: this.size
      };
      getGifts(param).then((res) => {
        Indicator.close();
        if (res && res.data.code === 200) {
          this.list = res.data.data;
        } else {
          this.$toast('获取失败!');
        }
      }).catch((e) => {
        Indicator.close();
        console.log(e);
        this.$toast('获取失败!');
      });
      this.page++;
    },
    getGifts() {
      var maxpage = (this.total / this.size) + 1;
      if (!this.allLoaded) {
        return;
      }
      if (this.page > maxpage) {
        // this.$toast('已加载完毕');
        return;
      }
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      var param = {
        username: sessionStorage.getItem('username'),
        page: this.page,
        size: this.size
      };
      this.allLoaded = false;
      getGifts(param).then((res) => {
        this.nowDate = dateFtt('yyyy-MM-dd hh:mm:ss', new Date());
        Indicator.close();
        if (res && res.data.code === 200) {
          this.page++;
          this.list.push(...res.data.data);
          this.total = res.data.total;
          this.allLoaded = true;
        } else {
          this.$toast('获取失败!');
          this.allLoaded = true;
        }
      }).catch((e) => {
        Indicator.close();
        console.log(e);
        this.$toast('获取失败!');
        this.allLoaded = true;
      });
    }
  },
  mounted() {
    this.getGifts()
  },
  filters: {
    i_time: (v) => { // 中奖时间
      return dateFtt('yyyy-MM-dd hh:mm:ss', v);
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
  display: flex;

  .heardBox {
    display: flex;
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

  .giftBox {
    height: 100%;
  }

  .ulBox {
    overflow: auto;
    width: 98%;
    margin: 0 auto;
    height: 100%;

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

      .item_title {
        display: flex;
        justify-content: center;
        flex-direction: row;
        margin-top: 5px;
        margin-bottom: 5px;
        justify-content: space-around;
        width: 100%;

        .item_box {
          display: flex;
          justify-content: center;
          flex-direction: column;
          margin-top: 5px;
          margin-bottom: 5px;

          .mainContent {
            font-size: 18px;
          }

          .content {
            width: 100%;
            word-break: break-all;
          }

          .tittles {
            color: #888;
          }
        }
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

        .content {
          width: 100%;
          word-break: break-all;
          color: #26a2ff;
          font-family: auto;
          font-weight: bold;
        }

        .tittles {
          color: #888;
        }
      }
    }
  }

  .mb(98);
}

</style>
