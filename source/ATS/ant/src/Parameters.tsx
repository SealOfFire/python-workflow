import React from 'react';
import { Space, Table, Tag, Input, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DragOutlined } from '@ant-design/icons';
import { hover } from '@testing-library/user-event/dist/hover';
import { cursorTo } from 'readline';

interface DataType {
    name: string;
    type: string;
    value: string;
}

interface Parameters {
    state: {
        table: any,
        data: Array<DataType>
        name: string,
        hover: boolean,
    }
}


class Parameters extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            table: React.createRef(),
            data: [],
            name: '',
            hover: false
        };
    }

    componentDidUpdate() {
        //console.log('componentDidUpdate', this.state.table.current);

        //const trs = this.state.table.current.getElementsByTagName('tr')
        //console.log('componentDidUpdate', trs)

        //for (let i = 1; i < trs.length; i++) {
        //    console.log(trs[i].getAttribute('class'));
        //    trs[i].setAttribute('draggable','')
        //    console.log('componentDidUpdate', trs[i]);
        //}
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Parameters onChange', e);

    }

    handleMouseEnter = () => {
        this.setState({ hover: true })
    };
    handleMouseLeave = () => {
        this.setState({ hover: false })
    };

    changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: e.target.value });
    }

    add = () => {
        const data = this.state.data.slice();
        data.push({
            name: this.state.name,
            type: '32',
            value: 'New York No. 1 Lake Park',
        });
        this.setState({ data: data })
    }

    delete = (key: any) => {
        console.log('delete onChange', key);

        //const data = { ... this.state.data }
        const data = this.state.data.slice().filter((n) => n.name !== key.name);
        this.setState({ data: data })
    }

    /**
     * 拖拽创建节点
    */
    onDragStart = (nodeType: any, event: any) => {
        console.log('onDragStart', 'event', event);
        console.log('onDragStart', 'nodeType', nodeType);
        event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeType));
        event.dataTransfer.effectAllowed = 'move';
    }

    render() {

        const styles = {
            cursor: this.state.hover ? 'move' : 'default',
        }

        const columns: ColumnsType<DataType> = [
            {
                title: '  ',
                dataIndex: 'name',
                key: 'name',
                render: (text) => <DragOutlined onDragStart={this.onDragStart.bind(this, { type: 'name', value: text })}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    style={styles}
                    draggable />,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
                render: (_, { value }) => {
                    return <Input placeholder="初始值" value={value} onChange={this.onChange}></Input>
                }
            },
            {
                title: 'Action',
                key: 'action',
                render: (_, record) => (
                    <a onClick={this.delete.bind(this, record)}>Delete</a>
                ),
            },
        ]

        const html =
            <React.Fragment>
                <Input.Group compact>
                    <Input style={{ width: 200 }} value={this.state.name} placeholder='NAME' onChange={this.changeName} />
                    <Button type="primary" onClick={this.add}>ADD</Button>
                </Input.Group>
                <Table columns={columns} dataSource={this.state.data} ref={this.state.table}></Table>
            </React.Fragment>

        return html;
    }
}


export default Parameters;