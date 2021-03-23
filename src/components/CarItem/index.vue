<template>
  <div class="car-item-wrap">
    <!--精简模式-->
    <div class="car-overview" @click="openCarsInfo">
      <header class="car-desc">
        <h4 class="car-logo">
          <img :src="data.imgUrl" :alt="data.carsMode" />
          <span class="car-model">{{ data.carsMode }}</span>
        </h4>
        <p class="car-attr">
          <span>{{ data.carsAttr | energyType }}</span>
          <span>{{ data.carsAttr | seatNumber }}座</span>
        </p>
      </header>
      <main>
        <div class="car-info">
          <h4 class="car-number">{{ data.carsNumber }}</h4>
          <div>
            <ul class="car-electric" :class="data.oil | electricNumber">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <p class="car-distance">
              <sub>约</sub>
              <strong>{{ data.countKm }}</strong>
              <sub>KM</sub>
            </p>
          </div>
        </div>
        <img class="car-img" :src="data.carsImg" alt="" />
      </main>
      <footer>
        <a href="javascript: void(0);" class="car-park">{{
          data.parkingName
        }}</a>
      </footer>
    </div>
    <!--展开模式-->
    <div
      v-if="carsInfoShow"
      :style="'height:' + cars_info_height + 'px'"
      class="car-detail"
    >
      <section class="car-info-main">
        <header>
          <h4>{{ data.parkingName }}</h4>
          <i class="car-close" @click="closeCarsInfo"></i>
        </header>
        <main>
          <div class="car-desc">
            <h4 class="car-logo">
              <img :src="data.imgUrl" :alt="data.carsMode" />
              <span class="car-model">{{ data.carsMode }}</span>
            </h4>
            <p class="car-attr">
              <span>{{ data.carsAttr | energyType }}</span>
              <span>{{ data.carsAttr | seatNumber }}座</span>
            </p>
          </div>
          <div>
            <img class="car-img" :src="data.carsImg" alt="" />
            <div class="car-info">
              <h4 class="car-number">{{ data.carsNumber }}</h4>
              <p class="car-distance">
                <sub>约</sub>
                <strong>{{ data.countKm }}</strong>
                <sub>KM</sub>
              </p>
            </div>
            <div class="car-electric">
              <span
                class="electric-range"
                :style="`width: ${Math.round(data.oil / 10) * 10}%`"
              ></span>
              <span class="electric-bg"></span>
            </div>
          </div>
          <div class="cars-rent">
            <p class="text-center car-rent-desc">
              取车约支付12.0元停车费，实际补贴12.0元
            </p>
            <ul class="car-rent-type">
              <li
                v-for="item in leaseListData"
                :class="{ current: leaseId === item.carsLeaseTypeId }"
                :key="item.carsLeaseTypeId"
                @click="selectLeaseType(item)"
              >
                <h4 class="car-rent-name">{{ item.carsLeaseTypeName }}</h4>
                <span class="car-rent-price">￥{{ item.price }}</span>
              </li>
            </ul>
          </div>
        </main>
      </section>
      <footer>
        <a
          href="javascript: void(0);"
          class="car-select-btn"
          @click="confirmCars"
          >预约用车</a
        >
      </footer>
    </div>
  </div>
</template>

<script>
import { getCarsAttrKey } from "@/utils/format";
import { GetLeaseList, ConfirmCars } from "@/api/cars";

export default {
  name: "CarItem",
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  filters: {
    electricNumber(val) {
      const number = Math.round(val / 10);
      return `active-li-${number}`;
    },
    energyType(val) {
      return getCarsAttrKey({
        data: val,
        parentKey: "basics",
        childKey: "energy_type"
      });
    },
    seatNumber(val) {
      return getCarsAttrKey({
        data: val,
        parentKey: "carsBody",
        childKey: "seat_number"
      });
    }
  },
  data() {
    return {
      carsInfoShow: false,
      cars_info_height: 0,
      timer: null,
      leaseListData: [], // 租赁类型列表
      leaseId: "", // 租赁ID
      token: this.$store.state.login.accountToken,
      messageList: this.$store.state.config.messageList,
      // 临时使用
      backupKey: "",
      // 用户审核
      arr: ["check_real_name", "check_cars", "gilding", "illegalAmount"]
    };
  },
  methods: {
    // 展开详情
    openCarsInfo() {
      this.carsInfoShow = true;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        // 高度计算
        const viewHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        this.cars_info_height = viewHeight - 150;
      }, 50);
      this.getLaseList();
    },
    // 关闭详情
    closeCarsInfo() {
      this.cars_info_height = 0;
      this.carsInfoShow = false;
    },
    //  获取租赁类
    getLaseList() {
      // 前面请求过就不要重复请求了
      if (this.leaseListData && this.leaseListData.length > 0) {
        return false;
      }
      GetLeaseList({ carsId: this.data.id }).then(response => {
        const dataItem = response.data.data.data;
        if (dataItem) {
          this.leaseListData = dataItem;
        }
      });
    },
    // 选择租赁类
    selectLeaseType(data) {
      this.leaseId = data.carsLeaseTypeId;
    },
    // 预约用车
    confirmCars() {
      // 判断是否登陆
      if (!this.token) {
        this.$router.push({
          name: "Login"
        });
      }
      // 判断是否选择租车类型
      if (!this.leaseId) {
        this.$message({
          message: "请选择租车类型",
          type: "warning"
        });
        return false;
      }
      // 判断余额、认证等信息
      ConfirmCars({
        cars_id: this.data.id,
        cars_lease_type_id: this.leaseId
      }).then(response => {
        const data = response.data.data;
        const key = Object.keys(data);
        if (key && key.length > 0) {
          this.backupKey = key[0]; // 临时存储
          if (this.arr.includes(key[0])) {
            let message = "";
            let msg = this.messageList[key[0]].msg;
            msg && (message = msg);
            // 弹窗提示
            this.$confirm(message, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                let router = this.messageList[this.backupKey].router;
                if (router) {
                  this.$router.push({
                    name: router,
                    query: {
                      type: this.messageList[this.backupKey].type
                    }
                  });
                }
              })
              .catch(() => {});
          } else {
            // 警告信息(已在响应拦截器中显示信息了）
            // 1. 汽车已被他人预约（一半出现在两人同时点击时）
            // 2. 自身已经预约车辆
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/components/carItem";
</style>
