import React from 'react';
import BaseNode from '../BaseNode'
import { Input } from 'antd';

class Assign extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('assign onChange', e);

        const node = { ... this.props.data }
        node.targets = e.target.value;
        console.log(this.props.data.onDataChange)
        this.props.data.onDataChange(node);
    }

    render() {
        const parameters = [
            { id: 'targets', title: 'TARGETS', type: 'target' },
            { id: 'value', title: 'VALUE', type: 'target' },
        ]

        const content =
            <Input placeholder="targets"
                value={this.props.data.targets}
                onChange={this.onChange}
            />

        const html =
            <BaseNode
                showTitle={true}
                title={'ASSIGN'}
                hasPrevious={true}
                hasNext={true}
                parameters={parameters}
            />

        return html
    }
}

export default Assign;