import * as React from 'react';
import { SimpleLines } from '../../components/Echarts'
import * as apis from '../../apis/runtime'

interface State {
    mem_line: number[]
}
export default class extends React.Component<any, State> {
    state: State = {
        mem_line: Array(60).fill(0)
    }

    sse: EventSource
    componentDidMount() {
        this.sse = apis.mem_ratio()
        this.sse.addEventListener('message', e => {
            const mem_line = this.state.mem_line
            mem_line.push(e.data * 100)
            if (mem_line.length > 60) {
                mem_line.shift()
            }
            this.setState({
                mem_line
            })
        })
    }

    componentWillUnmount() {
        this.sse.close()
    }

    render () {
        return <SimpleLines unit="%" max={100} series={new Map<string, number[]>([
            ['内存趋势', this.state.mem_line]
        ])}/>
    }
}