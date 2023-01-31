import React from 'react';
import BaseNode from '../BaseNode'
import { Input } from 'antd';

class If extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    onChange = (value: any) => {
        console.log('BinOp onChange', value);

        const node = { ... this.props.data }
        node.value = value;
        console.log(this.props.data.onDataChange)
        this.props.data.onDataChange(node);
    }

    render() {

        const parameters = [
            { id: 'test', title: 'TEST', type: 'target' },
            { id: 'body', title: 'BODY', type: 'source' },
            { id: 'orelse', title: 'OR ELSE', type: 'source' },
        ]

        const html =
            <BaseNode
                title={'IF'}
                showTitle={true}
                hasPrevious={true}
                hasNext={true}
                parameters={parameters}
            />

        return html
    }
}

export default If;