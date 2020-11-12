import * as React from 'react';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface Props {
    tags: string[]
    edit_able?: boolean
    onChange: (tags: string[]) => void
}
interface State {
    inputVisible: boolean;
    inputValue: string;
    editInputIndex: number;
    editInputValue: string;
}
class EditableTagGroup extends React.Component<Props, State> {
    state: State = {
        inputVisible: false,
        inputValue: '',
        editInputIndex: -1,
        editInputValue: '',
    };

    handleClose = (removedTag: string) => {
        const tags = this.props.tags.filter(tag => tag !== removedTag);
        this.props.onChange(tags)
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags, onChange } = this.props;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            onChange([...tags, inputValue])
        }
        this.setState({
            inputVisible: false,
            inputValue: '',
        });
    };

    handleEditInputChange = e => {
        this.setState({ editInputValue: e.target.value });
    };

    handleEditInputConfirm = () => {
        this.setState({
            editInputIndex: -1,
            editInputValue: '',
        });
    };

    input: Input
    saveInputRef: React.LegacyRef<Input> = input => {
        this.input = input;
    };
    editInput: Input
    saveEditInputRef: React.LegacyRef<Input> = input => {
        this.editInput = input;
    };

    render() {
        const { tags = [], edit_able } = this.props
        const { inputVisible, inputValue, editInputIndex, editInputValue } = this.state;

        if (!edit_able) {
            return <React.Fragment>
                {tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
            </React.Fragment>
        }
        return (
            <React.Fragment>
                {tags.map((tag, index) => {
                    if (editInputIndex === index) {
                        return (
                            <Input
                                ref={this.saveEditInputRef}
                                key={tag}
                                size="small"
                                className="tag-input"
                                value={editInputValue}
                                onChange={this.handleEditInputChange}
                                onBlur={this.handleEditInputConfirm}
                                onPressEnter={this.handleEditInputConfirm}
                            />
                        );
                    }

                    const isLongTag = tag.length > 20;

                    const tagElem = (
                        <Tag
                            className="edit-tag"
                            key={tag}
                            closable
                            onClose={() => this.handleClose(tag)}
                        >
                            <span
                                onDoubleClick={e => {
                                    if (index !== 0) {
                                        this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                                            this.editInput.focus();
                                        });
                                        e.preventDefault();
                                    }
                                }}
                            >
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </span>
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                            tagElem
                        );
                })}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        className="tag-input"
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag className="site-tag-plus" onClick={this.showInput}>
                        <PlusOutlined /> 新增
                    </Tag>
                )}
            </React.Fragment>
        );
    }
}

export default EditableTagGroup