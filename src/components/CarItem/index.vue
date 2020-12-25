<template>
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
</template>

<script>
export default {
  name: "CarItem"
};
</script>

<style scoped lang="scss">
.car-item {
  width: 400px;
  height: 224px;
  margin: 10px auto;
  padding: 20px 20px 0;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 24px;
  @include webkit-prefix(box-shadow, 0 0 10px 0 rgba(0, 0, 0, 0.2));
  @include webkit-prefix(box-sizing, border-box);
  display: flex;
  flex-direction: column;

  header {
    flex: 1;
    @extend %clearfix;

    .cars-logo {
      float: left;

      img {
        display: inline-block;
        height: 24px;
        margin-right: 10px;
        vertical-align: middle;
      }

      .name {
        font-size: 14px;
      }
    }

    .cars-attr {
      float: right;
      line-height: 24px;
      opacity: 0.5;
    }
  }

  main {
    flex: 3;
    @extend %clearfix;
    position: relative;

    .cars-info {
      float: left;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      margin: auto;
    }

    .cars-number {
      font-size: 14px;
    }

    .cars-electric {
      padding-top: 10px;
      padding-bottom: 10px;
      display: inline-block;

      li {
        display: inline-block;
        width: 5px;
        height: 24px;
        margin-right: 3px;
        background-color: #e1e1e1;
        border-radius: 100px;
      }

      @for $i from 1 through 10 {
        &.active-li-#{$i} {
          li:nth-child(-n + #{$i}) {
            @include webkit-suffix(
              background,
              linear-gradient(#17a8fa, #108dd9)
            );
          }
        }
      }
    }

    .cars-distance {
      margin-left: 5px;
      display: inline-block;

      strong {
        margin: 0 3px;
        font-size: 20px;
      }

      sub {
        position: relative;
        top: -2px;
      }

      sub:first-of-type {
        opacity: 0.6;
      }
    }

    .cars-img {
      float: right;
      height: 100px;
    }
  }

  footer {
    flex: 1;

    .cars-park {
      border-top: 1px solid #e1e1e1;
      display: block;
      line-height: 50px;
      color: $color-main;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        width: 8px;
        height: 8px;
        margin-top: -8px;
        border-top: 1px solid #7c7c7c;
        border-right: 1px solid #7c7c7c;
        @include webkit-prefix(transform, rotate(45deg));
      }
    }
  }
}
</style>
