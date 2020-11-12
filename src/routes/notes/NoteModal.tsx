import * as React from 'react';
import { Form, Modal, Input } from 'antd';
import { Note } from '../../../serve/interfaces'
import { ModalProps } from 'antd/lib/modal/Modal';

interface Props extends ModalProps {
    note?: Note
    onSubmit: (note: Note) => void
}
export default ({ note, ...props }: Props) => {
    const [form] = Form.useForm<Note>()
    let title = 'add note'
    let okText = 'Add'
    if (note) {
        title = 'update note'
        okText = 'Update'
        form.setFields([
            {
                name: 'title',
                value: note.title,
            },
            {
                name: 'desc',
                value: note.desc,
            }
        ])
    }

    const onOk = () => {
        form.validateFields().then((res: Note) => {
            props.onSubmit(res)
        })
    }
    return <Modal
        title="Note"
        okText={okText}
        {...props}
        onOk={onOk}
    destroyOnClose>
        <Form form={form}>
            <Form.Item
                label="title"
                name="title"
                rules={[{ required: true, message: 'Please input title!' }]}
            >
                <Input placeholder="title"/>
            </Form.Item>
            <Form.Item
                label="desc"
                name="desc"
            >
                <Input.TextArea placeholder="desc"/>
            </Form.Item>
        </Form>
    </Modal>
}