import React from 'react';
import BaseNode from '../BaseNode'
import { Select } from 'antd';

class Compare extends React.Component<any> {
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
            { id: 'comparators', title: 'COMPARATORS', type: 'target' },
        ]

        const items = [
            { value: 'Eq', label: '==' },
            { value: 'NotEq', label: '!=' },
            { value: 'Lt', label: '<' },
            { value: 'LtE', label: '<=' },
            { value: 'Gt', label: '>' },
            { value: 'GtE', label: '>=' },
            { value: 'Is', label: 'IS' },
            { value: 'IsNot', label: 'IS NOT' },
            { value: 'In', label: 'IN' },
            { value: 'NotIn', label: 'NOT IN' },
        ]

        const content =
            <Select
                defaultValue={'Eq'}
                style={{ width: 120 }}
                options={items}
                value={this.props.data.op}
                onChange={this.onChange}
            />

        const html =
            <BaseNode
                showTitle={true}
                title={'COMPARE'}
                content={content}
                hasPrevious={false}
                hasNext={true}
                parameters={parameters}
            />

        return html
    }
}

export default Compare;