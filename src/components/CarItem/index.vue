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
          <p class="text-align-center car-rent-desc">
            取车约支付12.0元停车费，实际补贴12.0元
          </p>
          <ul class="car-rent-type">
            <li>
              <h4 class="car-rent-name">日租车</h4>
              <span class="car-rent-price">￥300/1天</span>
            </li>
            <li>
              <h4 class="car-rent-name">日租车</h4>
              <span class="car-rent-price">￥300/1天</span>
            </li>
            <li>
              <h4 class="car-rent-name">日租车</h4>
              <span class="car-rent-price">￥300/1天</span>
            </li>
            <li class="current">
              <h4 class="car-rent-name">日租车</h4>
              <span class="car-rent-price">￥300/1天</span>
            </li>
          </ul>
        </div>
      </main>
      <footer>
        <a href="javascript: void(0);" class="car-select-btn">预约用车</a>
      </footer>
    </div>
  </div>
</template>

<script>
import { getCarsAttrKey } from "@/utils/format";

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
      timer: null
    };
  },
  methods: {
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
    },
    closeCarsInfo() {
      this.cars_info_height = 0;
      this.carsInfoShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/components/carItem";
</style>
