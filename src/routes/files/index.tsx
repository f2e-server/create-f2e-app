import { Alert, Button, Col, Row, Select } from 'antd'
import * as React from 'react'
import * as apis from '../../apis/raw'

const files = ['README.md', '.f2econfig.prod.js', 'package.json', 'serve/interfaces.ts']
export default () => {
    const [file, UpdateFile] = React.useState(files[0])
    const [content, setContent] = React.useState('')

    React.useEffect(function () {
        apis.getRaw(file).then(setContent)
    }, [file])

    return <Row gutter={[12, 12]}>
        <Col span={24}>
            <Select style={{ width: 180 }} onChange={f => UpdateFile(f)} defaultValue={files[0]}>
                {files.map(f => <Select.Option value={f} key={f}>{f}</Select.Option>)}
            </Select> &nbsp; <Button type="text" size="small">数据通过代理获取</Button>
        </Col>
        <Col span={24}>
            <pre><code>{content}</code></pre>
        </Col>
    </Row>
}
