import * as React from 'react';
import { Button, Col, message, Popconfirm, Row, Table } from 'antd';
import { FetchResult, Note, NoteStatus, NoteStatusMap } from '../../../serve/interfaces'
import * as apis from '../../apis/notes'
import NoteModal from './NoteModal'
import * as moment from 'moment';

const moment_show = (t: number) => moment(t).format('YYYY-MM-DD HH:mm:ss')
export default () => {
    const [list, setList] = React.useState<Note[]>([])
    const [visible, setVisible] = React.useState(false)

    const updateList = (res: FetchResult<Note[]>) => {
        if (res.success) {
            setList(res.data)
        } else {
            message.error(res.error)
        }
    }
    React.useEffect(function () {
        apis.list().then(updateList)
    }, [])
    React.useEffect(function () {
        setVisible(false)
    }, [list])

    const begin = (id: number) => () => apis.update({ id, status: NoteStatus.DOING }).then(updateList)
    const finish = (id: number) => () => apis.update({ id, status: NoteStatus.DONE }).then(updateList)
    const remove = (id: number) => () => apis.update({ id, status: NoteStatus.DELETE }).then(updateList)

    return <Row gutter={16}>
        <Col span={24}>
            <Button onClick={() => {
                setVisible(true)
            }}>Add</Button>
        </Col>
        <Col span={24}>
            <Table rowKey="id" columns={[
                { key: 'id', title: 'ID', dataIndex: 'id' },
                { key: 'title', title: '标题', dataIndex: 'title' },
                { key: 'desc', title: '描述', dataIndex: 'desc' },
                { key: 'createTime', title: '创建日期', dataIndex: 'createTime', render: moment_show },
                { key: 'updateTime', title: '更新日期', dataIndex: 'updateTime', render: moment_show },
                { key: 'status', title: '状态', dataIndex: 'status', render: (status) => NoteStatusMap.get(status) },
                {
                    key: 'opt', title: '操作', dataIndex: 'id', render: (id, note) => {
                    return <>
                        {note.status === NoteStatus.INIT && <Button size="small" onClick={begin(id)}>开始</Button>}
                        {note.status === NoteStatus.DOING && <Button size="small" onClick={finish(id)}>完成</Button>}
                        <Popconfirm title="确认删除" onConfirm={remove(id)}>
                            <Button size="small">删除</Button>
                        </Popconfirm>
                    </>
                }},
            ]} dataSource={list}/>
        </Col>
        <NoteModal visible={visible} onCancel={() => setVisible(false)} onSubmit={(note) => {
            apis.add(note).then(() => apis.list().then(updateList))
        }}/>
    </Row>
}