<template>
  <div class="car-item-wrap">
    <div class="car-overview">
      <header class="car-desc">
        <h4 class="car-logo">
          <img src="../../assets/images/cars-logo.png" alt="Mustang 2019款" />
          <span class="car-model">Mustang 2019款</span>
        </h4>
        <p class="car-attr">新能源汽车 5座</p>
      </header>
      <main>
        <div class="car-info">
          <h4 class="car-number">粤 B745N8</h4>
          <div>
            <ul class="car-electric active-li-8">
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
              <strong>600</strong>
              <sub>KM</sub>
            </p>
          </div>
        </div>
        <img class="car-img" src="../../assets/images/pic001.jpg" alt="" />
      </main>
      <footer>
        <a href="javascript: void(0);" class="car-park">某某停车场</a>
      </footer>
    </div>
    <div
      :class="{ 'car-detail-active': isActive, 'car-detail-hide': !isActive }"
    >
      <header>
        <h4>某某停车场</h4>
      </header>
      <main>
        <div class="car-desc">
          <h4 class="car-logo">
            <img src="../../assets/images/cars-logo.png" alt="Mustang 2019款" />
            <span class="car-model">Mustang 2019款</span>
          </h4>
          <p class="car-attr">新能源汽车 5座</p>
        </div>
        <div>
          <img class="car-img" src="../../assets/images/pic001.jpg" alt="" />
          <div class="car-info">
            <h4 class="car-number">粤 B745N8</h4>
            <p class="car-distance">
              <sub>约</sub>
              <strong>600</strong>
              <sub>KM</sub>
            </p>
          </div>
          <div class="car-electric">
            <span class="electric-range" style="width: 80%;"></span>
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
export default {
  name: "CarItem",
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/components/carItem";
</style>
