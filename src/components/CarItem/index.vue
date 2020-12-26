<template>
  <div class="car-item-wrap">
    <div class="car-item">
      <header>
        <h4 class="cars-logo">
          <img src="../../assets/images/cars-logo.png" alt="Mustang 2019款" />
          <span class="name">Mustang 2019款</span>
        </h4>
        <p class="cars-attr">新能源汽车 5座</p>
      </header>
      <main>
        <div class="cars-info">
          <h4 class="cars-number">粤 B745N8</h4>
          <div>
            <ul class="cars-electric active-li-8">
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
            <p class="cars-distance">
              <sub>约</sub>
              <strong>600</strong>
              <sub>KM</sub>
            </p>
          </div>
        </div>
        <img class="cars-img" src="../../assets/images/pic001.jpg" alt="" />
      </main>
      <footer>
        <a href="javascript: void(0);" class="cars-park">某某停车场</a>
      </footer>
    </div>
    <div :class="{ 'car-item-active': isActive, 'car-item-hide': !isActive }">
      <header>
        <h4>某某停车场</h4>
      </header>
      <main>
        <div class="part-one">
          <h4 class="cars-logo">
            <img src="../../assets/images/cars-logo.png" alt="Mustang 2019款" />
            <span class="name">Mustang 2019款</span>
          </h4>
          <p class="cars-attr">新能源汽车 5座</p>
        </div>
        <div class="part-two">
          <img class="cars-img" src="../../assets/images/pic001.jpg" alt="" />
          <div class="cars-info">
            <h4 class="cars-number">粤 B745N8</h4>
            <p class="cars-distance">
              <sub>约</sub>
              <strong>600</strong>
              <sub>KM</sub>
            </p>
          </div>
          <div class="cars-electric">
            <span class="e-high" style="width: 80%;"></span>
            <span class="e-bg"></span>
          </div>
        </div>
        <div class="cars-rent">
          <p class="text-align-center cars-rent-desc">
            取车约支付12.0元停车费，实际补贴12.0元
          </p>
          <ul class="cars-rent-type">
            <li>
              <h4 class="name">日租车</h4>
              <span class="price">￥300/1天</span>
            </li>
            <li>
              <h4 class="name">日租车</h4>
              <span class="price">￥300/1天</span>
            </li>
            <li>
              <h4 class="name">日租车</h4>
              <span class="price">￥300/1天</span>
            </li>
            <li class="current">
              <h4 class="name">日租车</h4>
              <span class="price">￥300/1天</span>
            </li>
          </ul>
        </div>
      </main>
      <a href="javascript: void(0);" class="select-car-btn">预约用车</a>
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

<style scoped lang="scss">
@import "../../styles/views/cars";
</style>
