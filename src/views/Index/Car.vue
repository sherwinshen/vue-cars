<template>
  <div class="car-wrap">
    <div class="swiper-wrap" v-if="carsList.length > 0">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="item in carsList" :key="item.id">
          <Car-item :data="item" :isActive="false" />
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
import { GetCarsList } from "@/api/cars";

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
      },
      carsList: []
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
  watch: {
    "$store.state.app.isClickCarsList": {
      handler(newValue) {
        if (!newValue) {
          this.carsList = [];
          this.$emit("callback", {
            funcName: "clearWalking"
          });
        }
        this.$store.commit("app/SET_CARS_LIST_STATUS", true);
      }
    }
  },
  methods: {
    swiperPrev() {
      this.swiper.slidePrev();
    },
    swiperNext() {
      this.swiper.slideNext();
    },
    // 获取车辆列表
    getCarsList(parkingId) {
      GetCarsList({ parkingId }).then(response => {
        const data = response.data.data.data;
        data && (this.carsList = data);
        this.$store.commit("app/SET_CARS_LIST_REQUEST", false);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/views/car";
</style>
