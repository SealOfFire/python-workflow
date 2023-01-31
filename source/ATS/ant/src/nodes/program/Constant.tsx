import React from 'react';
import BaseNode from '../BaseNode'
import { Input } from 'antd';

class Constant extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('content onChange', e);

        const node = { ... this.props.data }
        node.value = e.target.value;
        console.log(this.props.data.onDataChange)
        this.props.data.onDataChange(node);
    }

    render() {
        const content =
            <Input placeholder="content"
                value={this.props.data.value}
                onChange={this.onChange}
            />

        const html =
            <BaseNode
                content={content}
                hasPrevious={false}
                hasNext={true}
            />

        return html
    }
}

export default Constant;