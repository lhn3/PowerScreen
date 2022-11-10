<template>
  <div ref="echartsRef" class="echartsClass" :style="{width,height}"/>
</template>

<script setup>
import {defineProps, onMounted, onUnmounted, ref, watch} from "vue";
import * as echarts from 'echarts'

const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  },
  option: {
    type: Object,
    default: () => ({
      title: {
        text: 'ECharts 示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
  }
})

const echartsRef = ref()
const myEcharts = ref()

onMounted(() => {
  myEcharts.value = echarts.init(echartsRef.value, null, {renderer: 'svg'}) //初始化
  myEcharts.value.setOption(props.option)
})

//数据更新重绘
watch(
    () => props.option,
    value => {
      myEcharts.value.setOption(value)
    },
    {
      deep: true
    }
)

onUnmounted(() => {
  myEcharts.value.dispose()
})


</script>

<style scoped lang="scss">
.echartsClass {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>