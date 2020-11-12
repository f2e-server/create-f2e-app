import * as echarts from 'echarts'
import * as React from 'react'
import elementResizeEvent from './element-resize-event'

export interface ReactEchartsProps {
    onChartReady?: (echartObj: echarts.ECharts ) => void
    style?: any
    className?: string
    theme?: any
    showLoading?: boolean
    onEvents?: { [k: string]: Function }
    notMerge?: boolean
    lazyUpdate?: boolean
    option: echarts.EChartOption | echarts.EChartsResponsiveOption
}
export default class ReactEcharts extends React.Component<ReactEchartsProps> {
    // first add
    componentDidMount () {
        const props = this.props
        let echartObj = this.renderEchartDom()
        let onEvents = {}
        Object.keys(props).map(key => {
            let mat = key.match(/^on([A-Z]\w+)$/)
            if (mat) {
                onEvents[mat[1].toLowerCase()] = props[key]
            }
        })

        this.bindEvents(echartObj, onEvents)
        // on chart ready
        if (typeof this.props.onChartReady === 'function') this.props.onChartReady(echartObj)

        // on resize
        elementResizeEvent(this.echartsDom, function () {
            echartObj.resize()
        })
    }
    theme: 'default' | 'dark'
    // update
    componentDidUpdate () {
        if (this.theme !== this.props.theme) {
            echarts.dispose(this.echartsDom)
            this.theme = this.props.theme
        }
        this.renderEchartDom()
        this.bindEvents(this.getEchartsInstance(), this.props.onEvents || {})
    }
    // remove
    componentWillUnmount () {
        echarts.dispose(this.echartsDom)
    }
    echartsDom: HTMLDivElement
    initEchartsDom = (echartsDom: HTMLDivElement) => {
        this.echartsDom = echartsDom
    }

    // bind the events
    bindEvents = (instance: echarts.ECharts, events: {[k:string]: Function}) => {
        var _loop = function _loop (eventName) {
            instance.off(eventName)
            instance.on(eventName, function (param) {
                events[eventName](param, instance)
            })
        }

        for (var eventName in events) {
            _loop(eventName)
        }
    }
    // render the dom
    renderEchartDom = () => {
        // init the echart object
        let echartObj = this.getEchartsInstance()
        // set the echart option
        echartObj.setOption(this.props.option, this.props.notMerge || false, this.props.lazyUpdate || false)
        // set loading mask
        if (this.props.showLoading) echartObj.showLoading()
        else echartObj.hideLoading()

        return echartObj
    }
    getEchartsInstance = () => {
        const { echartsDom } = this
        const { theme = 'default' } = this.props
        const instance = echarts.getInstanceByDom(echartsDom)
        if (!instance) {
            return echarts.init(echartsDom, theme)
        } else {
            return instance
        }
    }
    render () {
        let {
            style = {
                height: 300
            }
        } = this.props
        // for render
        return (
            <div ref={this.initEchartsDom}
                className={this.props.className}
                style={style} />
        )
    }
}
