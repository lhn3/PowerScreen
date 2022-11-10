<template>
  <div class="back-ground">
    <div class="header"></div>

<!--左边-->
    <div class="left-top">
      <EchartsTemplate :option="pie" width="500px" height="400px"/>
    </div>
    <div class="left-bottom">
      <EchartsTemplate :option="brokenLine" width="500px" height="380px"/>
    </div>

<!--中间-->
    <div class="center-top">
      <CenterSvg />
    </div>
    <div class="center-bottom">
      <CenterBottom :data="dataAnalysis" />
    </div>

<!--右边-->
    <div class="right-top">
      <WaterBall :data="chargingTop4" />
    </div>
    <div class="right-center">
      <EchartsTemplate :option="bar" width="480px" height="280px" style="margin-top: 10px" />
    </div>
    <div class="right-bottom">
      <RightBottomSvg :data="exception" />
    </div>
  </div>
</template>

<script setup>
import EchartsTemplate from '../components/EchartsTemplate.vue'
import myAxios from '../request/index'
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
//echarts
import getPieOption from "@/views/options/pie-option";
import getBrokenLineOption from "@/views/options/brokenLine-option";
import getBarOption from "@/views/options/bar-option";
//svg
import RightBottomSvg from '@/components/RightBottom-svg.vue'
import CenterSvg from '@/components/Center-svg.vue'
//组件
import CenterBottom from '@/components/CenterBottom.vue'
import WaterBall from '@/components/WaterBall.vue'

let pie = ref({}) //饼图数据
let brokenLine = ref({}) //折线图数据
let bar = ref({}) //柱状图数据
let exception = ref({}) //异常监控数据
let dataAnalysis = ref([]) //数据分析数据
let chargingTop4 = ref({}) //数据分析数据

onMounted(()=>{
  pieRequest()
})

// 获取数据
const pieRequest = async () =>{
  let res = await myAxios.get({url:'/powerscreen'})
  if (res.code !== 200) {
    return ElMessage.error('数据请求失败！')
  }
  console.log(res)
  pie.value = getPieOption(res.data.chargingPile.data)
  brokenLine.value = getBrokenLineOption(res.data.processMonitoring.data)
  bar.value = getBarOption(res.data.chargingStatistics.data)
  exception.value = res.data.exceptionMonitoring.data
  dataAnalysis.value = res.data.dataAnalysis.data
  chargingTop4.value = res.data.chargingTop4
}

</script>

<style scoped lang="scss">
.back-ground{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #020546;
  background-image: url(../assets/images/bg.png);
  .header{
    position: absolute;
    left: 0;
    top: 20px;
    width: 100%;
    height: 59px;
    background-image: url(../assets/images/bg_header.svg);
  }
 .left-top{
   position: absolute;
   left: 20px;
   top: 129px;
   width: 526px;
   height: 438px;
   background-image: url(../assets/images/bg_left_top.svg);
 }
 .left-bottom{
   position: absolute;
   left: 20px;
   top: 617px;
   width: 526px;
   height: 431px;
   background-image: url(../assets/images/bg_left_bottom.svg);
 }
 .center-top{
   position: absolute;
   left: 50%;
   top: 129px;
   transform: translate(-50% + 1.2);
   width: 787.781px;
   height: 652px;
   display: flex;
   justify-content: center;
   align-items: center;
 }
 .center-bottom{
   position: absolute;
   left: 50%;
   top: 850px;
   transform: translate(-50% + 1.2);
   width: 813px;
   height: 198px;
   background-image: url(../assets/images/bg_bottom.svg);
 }
 .right-top{
   position: absolute;
   right: 20px;
   top: 129px;
   width: 509px;
   height: 316px;
   background-image: url(../assets/images/bg_right_top.svg);
   display: flex;
   align-items: flex-end;
   justify-content: center;
 }
  .right-center{
   position: absolute;
    right: 20px;
    top: 473px;
    width: 509px;
    height: 316px;
   background-image: url(../assets/images/bg_right_center.svg);
 }
 .right-bottom{
   position: absolute;
   right: 20px;
   top: 817px;
   width: 509px;
   height: 232px;
   background-image: url(../assets/images/bg_right_bottom.svg);
   display: flex;
   justify-content: center;
   align-items: center;
 }
}

</style>
