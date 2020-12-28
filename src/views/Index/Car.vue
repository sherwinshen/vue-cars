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

<style lang="scss" scoped>
@import "../../styles/views/car";
</style>
