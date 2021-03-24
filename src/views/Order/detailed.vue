<template>
  <div class="order-detail-wrap">
    <BackHeader />
    <p class="tip margin-bottom-20">本页面仅供展示</p>
    <div class="order-list">
      <div class="item">
        <div class="info">
          <time class="flex-1">2020-11-11 12:00:00</time>
          <div class="flex-1">
            <span class="status color-wait">待取车</span>
          </div>
        </div>
        <p class="number">粤 B8X4B6</p>
        <div class="clearfix">
          <div class="price pr arrow pull-left">
            <em>￥</em>
            <span>2000.00</span>
          </div>
          <div class="pull-right fs-18 lh-40">支付宝支付</div>
        </div>
      </div>
    </div>
    <section class="section-mode">
      <header>
        <h4 class="title">用车计费</h4>
      </header>
      <div class="content">
        <ul class="links">
          <li>
            <span class="pull-left">起步价</span>
            <span class="pull-right s-12">￥12.90</span>
          </li>
          <li>
            <span class="pull-left">时长费</span>
            <span class="pull-right s-12">￥12.90</span>
          </li>
          <li>
            <span class="pull-left">里程费</span>
            <span class="pull-right s-12">￥12.90</span>
          </li>
        </ul>
      </div>
    </section>
    <section class="section-mode">
      <header>
        <h4 class="title">其他费用</h4>
      </header>
      <div class="content">
        <ul class="links">
          <li>
            <span class="pull-left">全面保障服务费</span>
            <span class="pull-right s-12">￥0.00</span>
          </li>
          <li>
            <span class="pull-left">还车服务费</span>
            <span class="pull-right s-12">￥0.00</span>
          </li>
        </ul>
      </div>
    </section>
    <section class="section-mode">
      <header>
        <h4 class="title">优惠减免</h4>
      </header>
      <div class="content">
        <ul class="links">
          <li>
            <span class="pull-left">会员优惠</span>
            <span class="pull-right s-12">-￥0.00</span>
          </li>
          <li>
            <span class="pull-left">活动优惠</span>
            <span class="pull-right s-12">-￥0.00</span>
          </li>
          <li>
            <span class="pull-left">特权卡</span>
            <span class="pull-right s-12">-￥0.00</span>
          </li>
          <li>
            <span class="pull-left">用车券</span>
            <span class="pull-right s-12">-￥0.00</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader";

export default {
  name: "Detailed",
  components: { BackHeader },
  beforeMount() {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.order-list {
  .item {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 0 18px 20px;
    color: #fff;
    margin-bottom: 20px;
  }
  .info {
    display: flex;
    padding: 22px 0;
    .status {
      float: right;
    }
  }
  .number {
    font-size: 18px;
    padding: 0 0 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
}
.menu {
  text-align: center;
  margin-bottom: 40px;
  li {
    display: inline-block;
    position: relative;
    font-size: 14px;
    opacity: 0.5;
    padding: 0 12px 15px;
    color: #fff;
    cursor: pointer;
    &.current {
      opacity: 1;
      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -15px;
        width: 30px;
        height: 4px;
        border-radius: 10px;
        background-color: #00a3ff;
      }
    }
  }
}
.price {
  position: relative;
  color: #fff;
  span {
    font-size: 30px;
  }
  em {
    font-size: 18px;
  }
}
.arrow:after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  width: 10px;
  height: 10px;
  margin-top: -6px;
  border-top: 1px solid #fff;
  border-right: 1px solid #fff;
  @include webkit(box-sizing, border-box);
  @include webkit(transform, rotate(45deg));
  opacity: 0.1;
}
.section-mode {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 20px;
  margin-bottom: 20px;
  header {
    margin-bottom: 20px;
  }
  .title {
    font-size: 14px;
    color: #fff;
    opacity: 0.5;
  }
}
.links {
  li {
    display: block;
    height: 18px;
    line-height: 18px;
    position: relative;
    padding: 10px 0;
    color: #fff;
    font-size: 14px;
  }
}
</style>
