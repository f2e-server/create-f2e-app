import { ConfigProvider } from 'antd';
import * as React from 'react'
import { render } from 'react-dom'
import App from './layout'

render(<ConfigProvider locale={window['antd'].locales.zh_CN}>
    <App />
</ConfigProvider>, document.getElementById('app'));