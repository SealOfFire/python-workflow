import React from 'react';
import BaseNode from '../BaseNode'
import { Select } from 'antd';

class BinOp extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    onChange = (value: any) => {
        console.log('BinOp onChange', value);

        const node = { ... this.props.data }
        node.op = value;
        console.log(this.props.data.onDataChange)
        this.props.data.onDataChange(node);
    }

    render() {
        const parameters = [
            { id: 'left', title: 'LEFT', type: 'target' },
            { id: 'right', title: 'RIGHT', type: 'target' },
        ]

        const items = [
            { value: 'Add', label: '+' },
            { value: 'Sub', label: '-' },
            { value: 'Mult', label: '*' },
            { value: 'Div', label: '/' },
            { value: 'FloorDiv', label: '//' },
            { value: 'Mod', label: '%' },
            { value: 'Pow', label: 'POW' },
            { value: 'LShift', label: '<<' },
            { value: 'RShift', label: '>>' },
            { value: 'BitOr', label: 'OR' },
            { value: 'BitXor', label: 'XOR' },
            { value: 'BitAnd', label: 'AND' },
            { value: 'MatMult', label: '@' },
        ]

        const content =
            <Select
                defaultValue={'Add'}
                style={{ width: 120 }}
                options={items}
                value={this.props.data.op}
                onChange={this.onChange}
            />

        const html =
            <BaseNode
                showTitle={true}
                title={'BIN OP'}
                content={content}
                hasPrevious={false}
                hasNext={true}
                parameters={parameters}
            />

        return html
    }
}

export default BinOp;