<template>
  <div class="status-wrap">
    <BackHeader />
    <div class="text-center color-white lh-40">
      <h4><strong>订单号</strong></h4>
      <p>{{ order_no }}</p>
    </div>
    <p class="margin-bt-50"></p>
    <div>
      <el-button type="warning" round class="button-block" @click="gotoPay"
        ><strong>去支付</strong></el-button
      >
    </div>
    <div>
      <el-button type="primary" round class="button-block" @click="overPay"
        ><strong>完成支付</strong></el-button
      >
    </div>
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader";
import { OrderStatus } from "@/api/order";
import { clearInterval, setInterval } from "timers";

export default {
  name: "Status",
  components: { BackHeader },
  data() {
    return {
      timer: null,
      order_no: localStorage.getItem("order_no") || ""
    };
  },
  beforeMount() {
    this.getOrderStatus();
    this.setInter(); // 轮询查询支付情况
  },
  methods: {
    // 查询支付情况
    orderStatus() {
      const order_no = this.order_no;
      return OrderStatus({ order_no }).then(response => {
        return response.data.data.status;
      });
    },
    // 查询支付情况
    async getOrderStatus() {
      const status = await this.orderStatus();
      this.toResult(status);
    },
    // 轮询查询支付情况
    setInter() {
      this.timer = setInterval(() => {
        this.getOrderStatus();
      }, 3000);
    },
    // 支付结果处理
    toResult(status) {
      clearInterval(this.timer);
      if (status === "success") {
        this.$router.replace({
          name: "PayResult",
          query: {
            status
          }
        });
      }
    },
    // 去支付
    async gotoPay() {
      const status = await this.orderStatus();
      this.toResult(status);
    },
    // 完成支付
    async overPay() {
      const status = await this.orderStatus();
      this.toResult(status);
    }
  }
};
</script>

<style lang="scss" scoped>
.button-block {
  width: 100%;
}
</style>
