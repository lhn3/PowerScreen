
import * as echarts from 'echarts'
const getOption = (data) => {
  return {
    // backgroundColor: "rbg(40,46,72)",
    grid: {
      left: "5%",
      right: "1%",
      top: "20%",
      bottom: "15%",
      containLabel: true, // grid 区域是否包含坐标轴的刻度标签
    },
    legend: {
      bottom: "5%",
      itemGap: 20,
      itemWidth: 13,
      itemHeigth: 12,
      textStyle: {
        color: "#64BCFF",
      },
      icon: "rect",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        lineStyle: {
          color: "#20FF89",
        },
      },
    },
    xAxis: [
      {
        type: "category",
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: "#64BCFF",
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: "#64BCFF",
        },
      },
    ],
    series: [
      {
        name: data[0].name,
        type: "line",
        smooth: true,  // 是否平滑曲线显示。
        symbolSize: 5, // 标记的大小
        showSymbol: false,
        itemStyle: {
          color: "#20FF89",
        },
        // 区域填充样式。设置后显示成区域面积图。
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "#20FF89",
              },
              {
                offset: 1,
                color: "rgba(255, 255, 255, 0)",
              },
            ],
            false
          ),
        },
        data: data[0].data,
      },
      {
        name: data[1].name,
        type: "line",
        smooth: true, // 是否平滑曲线显示。
        symbolSize: 5, // 标记的大小，可以设置成诸如 10 这样单一的数字
        showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
        itemStyle: {
          // 折线的颜色
          color: "#EA9502",
        },
        // 折线区域的颜色
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#EA9502",
              },
              {
                offset: 1,
                color: "rgba(255, 255, 255, 0)",
              },
            ],
          },
        },
        data: data[1].data,
      },
    ],
  }
}

export default getOption