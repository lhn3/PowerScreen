<template>
  <div class="bottom-box">
    <div class="bottom-box-item" v-for="item in data" :key="item.id">
      <div class="box-title">{{ item.title }}</div>
      <div style="display: flex;align-items: flex-end">
        <span class="box-num" :id="`total-${item.id}`">{{ item.totalNum }}</span>
        <span class="box-unit">{{ item.unit }}</span>
        <span class="box-icon" :class="item.isUp?'box-icon-up':'box-icon-down'" />
        <span :style="{color: item.isUp ? 'green' : 'red',marginLeft: '5px'}" :id="`percentage-${item.id}`">{{ item.percentage }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, nextTick, watch} from "vue";
import {CountUp} from 'countup.js'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

//数字滚动动画
watch(
  () => props.data,
  (value) => {
    if (!value) return
    nextTick(()=>{
      value.forEach((item) => {
        //(dom id,最终数量,{保留位数,后缀})
        new CountUp(`total-${item.id}`, item.totalNum,{decimalPlaces: 1}).start()
        new CountUp(`percentage-${item.id}`, item.percentage,{decimalPlaces: 1,suffix: '%'}).start()
      })
    })
  },
    {
      deep:true
    }
)
</script>

<style scoped lang="scss">
.bottom-box {
  width: 100%;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin-top: 50px;
  .bottom-box-item {
    width: 32%;
    .box-title {
      color: #fff;
      line-height: 40px;
    }
    .box-num {
      font-size: 36px;
      font-weight: bold;
      color: #23aeff;
    }
    .box-icon{
      display: inline-block;
      box-sizing: border-box;
      border: 8px solid transparent;
      margin-left: 10px;
    }
    .box-icon-up{
      border-bottom-color: green;
      margin-bottom: 4px;
    }
    .box-icon-down{
      border-top-color: red;
      margin-bottom: -4px;
    }
    .box-unit {
      font-size: 20px;
      color: #23aeff;
    }
  }
}
</style>