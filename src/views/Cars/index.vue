<template>
  <div class="car-wrap">
    <div class="swiper-wrap">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide>
          <Car-item :isActive="true"></Car-item>
        </swiper-slide>
        <swiper-slide>
          <Car-item></Car-item>
        </swiper-slide>
        <swiper-slide>
          <Car-item :isActive="true"></Car-item>
        </swiper-slide>
        <swiper-slide>
          <Car-item></Car-item>
        </swiper-slide>
        <swiper-slide>
          <Car-item :isActive="true"></Car-item>
        </swiper-slide>
        <swiper-slide>
          <Car-item></Car-item>
        </swiper-slide>
      </swiper>
      <div
        class="swiper-button-prev"
        slot="button-prev"
        @click="swiperPrev"
      ></div>
      <div
        class="swiper-button-next"
        slot="button-next"
        @click="swiperNext"
      ></div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import CarItem from "@/components/CarItem/index";

export default {
  name: "Car",
  components: {
    Swiper,
    SwiperSlide,
    CarItem
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  directives: {
    swiper: directive
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  methods: {
    swiperPrev() {
      this.swiper.slidePrev();
    },
    swiperNext() {
      this.swiper.slideNext();
    }
  }
};
</script>

<style scoped lang="scss">
.car-wrap {
  z-index: 101;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 160px;

  .swiper-wrap {
    position: relative;
    padding: 0 80px;

    .swiper-container {
      overflow: initial;
    }

    .swiper-button-prev,
    .swiper-button-next {
      position: absolute;
      top: 100px;
      width: 40px;
      height: 80px;
      background-color: #fff;
      border-radius: 60px;
      @include webkit-prefix(transition, all 0.3s ease 0s);

      &:after {
        content: "";
        width: 14px;
        height: 14px;
        border-top: 3px solid #000;
        border-left: 3px solid #000;
      }

      &:hover {
        background-color: $color-main;

        &:after {
          border-top: 3px solid $color-blue;
          border-left: 3px solid $color-blue;
        }
      }
    }

    .swiper-button-prev {
      left: 20px;

      &:after {
        margin-right: -6px;
        @include webkit-prefix(transform, rotate(-45deg));
      }
    }

    .swiper-button-next {
      right: 20px;

      &:after {
        margin-right: 6px;
        @include webkit-prefix(transform, rotate(135deg));
      }
    }
  }
}
</style>
