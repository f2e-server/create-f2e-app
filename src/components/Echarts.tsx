import { Connect } from 'ipreact-for-react';
import { connect, getState } from '../store'
import ReactEcharts, { ReactEchartsProps } from '../utils/echarts-for-react'
import * as React from 'react';

const conn: Connect<ReactEchartsProps> = connect
const BaseCharts = conn((props) => {
    const { theme = 'default' } = getState()
    return { theme, ...props }
})(ReactEcharts)

export default BaseCharts

interface LinesProps {
    title?: string
    type?: 'line'
    areaStyle?: any
    xAxis?: string[]
    stack?: string
    series: Map<string, number[]>
    unit?: string
    max?: number
}
export const SimpleLines = (props: LinesProps) => {
    const {
        title, type = 'line',
        xAxis = [], stack,
        series = new Map<string, number[]>(),
        areaStyle,
        unit = '',
        max
    } = props
    const legend = [...series.keys()]

    return <BaseCharts option={{
        title: {
            text: title,
            textStyle: {
                fontSize: 16
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: legend,
            left: '20%',
            right: '4%',
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            axisLine: { onZero: true },
            data: xAxis
        },
        yAxis: {
            max,
            splitLine: { show: false },
            axisLabel: { formatter: `{value}${unit}` }
        },
        series: [...series.entries()].map(([name, data]) => {
            return {
                name, type, stack, data, areaStyle, smooth: true
            }
        })
    }}/>
}