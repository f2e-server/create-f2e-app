import { MiddlewareCreater } from 'f2e-server'
import { Route, out } from 'f2e-serve'
import * as notes from './actions/notes'
import { server_time, mem_ratio } from './actions/runtime'

const creater: MiddlewareCreater = (conf) => {
    const route = new Route()
    
    route.on('api/notes/list', out.JsonOut(notes.list))
    route.on('api/notes/add', out.JsonOut(notes.add))
    route.on('api/notes/update', out.JsonOut(notes.update))

    route.on('sse/runtime/server_time', out.ServerSent(server_time))
    route.on('sse/runtime/mem_ratio', out.ServerSent(mem_ratio))

    // SPA 的 index.html 配置
    route.on(/^(\w+)?(\/\w+)?(\/\w+)?(\/\w+)?$/, () => 'index.html');

    return {
        onRoute: route.execute
    }
}

export default creater