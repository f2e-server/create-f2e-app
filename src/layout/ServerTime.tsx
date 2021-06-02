import moment from 'moment';
import * as React from 'react';
import * as apis from '../apis/runtime'

export default () => {
    const [server_time, update] = React.useState(Date.now())
    
    React.useEffect(function () {
        const sse = apis.server_time()
        sse.addEventListener('message', e => {
            update(Number(e.data))
        })
        return () => {
            sse.close()
        }
    }, [])

    return <span style={{}}>
        {moment(server_time).format('YYYY/MM/DD HH:mm:ss')}
    </span>
}