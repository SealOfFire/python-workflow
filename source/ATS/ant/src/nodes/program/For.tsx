import React from 'react';
import BaseNode from '../BaseNode'
import { Input } from 'antd';

class For extends React.Component<any> {
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
            { id: 'target', title: 'TARGET', type: 'target' },
            { id: 'iter', title: 'ITERATION', type: 'target' },
            { id: 'body', title: 'BODY', type: 'source' },
            { id: 'orelse', title: 'OR ELSE', type: 'source' },
        ]

        const content =
            <Input placeholder="TARGET"
                value={this.props.data.target}
                onChange={this.onChange}
            />

        const html =
            <BaseNode
                showTitle={true}
                title={'FOR'}
                hasPrevious={true}
                hasNext={true}
                parameters={parameters}
            />

        return html
    }
}

export default For;