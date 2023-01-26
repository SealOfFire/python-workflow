/**
 * 开始节点
 */

import React from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from './BaseNode'

class Start extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const html = <BaseNode
            data={this.props.data}
            title="START"
            hasNext={true}
            subheader="开始节点"
        />

        return html
    }
}

export default Start;