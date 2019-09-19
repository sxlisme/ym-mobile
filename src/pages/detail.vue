<template>
  <div class="content-box">
    <common-header :tittle="tittle" :showmore="false" :addTask="false"></common-header>
    <div class="page-content">
      <h1>任务ID：{{id}}</h1>
      开发中。。。
    </div>
  </div>
</template>
<script>
import commonHeader from 'common/common-header'
export default {
  data() {
    return {
      id: '',
      tittle: '日志',
      data: 0
    }
  },
  components: {
    commonHeader
  },
  computed: {
    newdata: function() {
      return this.data + 1
    }
  },
  methods: {
    tohome() {
      this.$router.goBack()
    },
    add() {
      this.data++
    },
    getQuery() {
      this.id = this.$route.params.id;
      console.log(this.$route.params);
    }
  },
  mounted() {
    this.getQuery();
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";

</style>
