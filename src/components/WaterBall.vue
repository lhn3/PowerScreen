<template>
  <div class="water-ball">
    <div class="ball">
      <svg
          xlink="https://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          style="display: none"
      >
        <!-- 定义可复用的 icon -->
        <symbol id="wave">
          <path
              d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"
          ></path>
          <path
              d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"
          ></path>
          <path
              d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"
          ></path>
          <path
              d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"
          ></path>
        </symbol>
      </svg>
      <div class="box">
        <div class="percent">
          <div class="percentNum" id="count">0</div>
          <div class="percentB">%</div>
        </div>
        <div id="water" class="water">
          <svg viewBox="0 0 560 20" class="water_wave water_wave_back">
            <use xlink:href="#wave"/>
          </svg>
          <svg viewBox="0 0 560 20" class="water_wave water_wave_front">
            <use xlink:href="#wave"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="tips">
      <div class="tip-item" v-for="(item,index) in data.data" :key="item.id">
        <div class="tip-item-icon" :style="{ backgroundColor: colorList[index] }"/>
        <div class="tip-item-title">{{ item.name }}</div>
        <div class="tip-item-percentage">{{ item.percentage }}</div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {defineProps, nextTick, watch} from "vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const colorList = ['#098a98', '#0d4bb2', '#86d3ff', '#ffc246', '#fe8427']

watch(
    () => props.data,
    value => {
      if (!value) return
      nextTick(() => {
        let countEL = document.getElementById('count')
        let waterEl = document.getElementById('water')
        let currentPercentage = 0

        let timeId = null
        timeId = setInterval(function () {
          currentPercentage++
          if (currentPercentage >= value.totalPercentage) {
            clearInterval(timeId)
          }
          countEL.innerHTML = currentPercentage

          if (currentPercentage <= 100) {
            waterEl.style.transform = `translateY(${100 - currentPercentage}%)`
          }
        }, 50)
      })
    }
)
</script>

<style scoped lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
  outline: none;
}
.water-ball {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  .ball {
    .box {
      height: 200px;
      width: 200px;
      position: relative;
      background: #020438;
      border-radius: 100%;
      overflow: hidden;
      .percent {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 3;
        width: 100%;
        height: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 64px;
      }
      .water {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        transform: translate(0, 100%);
        background: #0bc8fb;
        .water_wave {
          width: 200%;
          position: absolute;
          bottom: 100%;
        }
        .water_wave_back {
          right: 0;
          fill: #c7eeff;
          animation: moveWaveBack 1.8s linear infinite;
        }
        .water_wave_front {
          left: 0;
          fill: #0bc8fb;
          margin-bottom: -1px;
          animation: moveWaveFront 1s linear infinite;
        }
      }
    }
  }
  .tips {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    .tip-item {
      display: flex;
      padding: 15px 0;
      .tip-item-icon {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        margin-right: 10px;
      }
      .tip-item-title {
        font-size: 14px;
        color: #ffffff;
        margin-right: 10px;
        line-height: 20px;
      }
      .tip-item-percentage {
        color: #1acdff;
        line-height: 20px;
      }
    }
  }
}
@keyframes moveWaveBack {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(200px);
  }
}
@keyframes moveWaveFront {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-200px);
  }
}

.ball{
  animation: ballShow 1s linear;
}
@keyframes ballShow {
  0%{
    transform: scale(0);
    opacity: 0;
  }
  100%{
    transform: scale(1);
    opacity: 1;
  }
}
</style>