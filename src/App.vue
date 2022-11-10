<template>
  <router-view />
</template>
<script setup>
import {RouterView} from 'vue-router'
import _ from 'lodash'
import {onMounted, onUnmounted} from "vue";

//定设计稿尺寸
let width = 1920
let height = 1080
let ratio = 16 / 9

//4.页面变化监听
const scaleFunc = () => {
  //获取屏幕宽高
  let screenWidth = document.documentElement.clientWidth || document.body.clientWidth
  let screenHeight = document.documentElement.clientHeight || document.body.clientHeight

  //计算缩放比例
  let scaleWidth = screenWidth / width
  let scaleHeight = screenHeight / height

  if ((screenWidth / screenHeight) <= ratio) { //如果过高的屏幕就以宽度进行缩放
    console.log('缩放：',scaleWidth)
    document.body.style = `transform: scale(${scaleWidth})`
  } else { //如果过宽的屏幕就以宽度进行缩放
    console.log('缩放：',scaleHeight)
    document.body.style = `transform: scale(${scaleHeight})`
  }
}
const _scalFunc = _.throttle(scaleFunc,100)

onMounted(()=>{
  scaleFunc()
  window.addEventListener('resize',_scalFunc)
})
onUnmounted(()=>{
  window.removeEventListener('resize', _scalFunc)
})

</script>

<style scoped>
</style>
