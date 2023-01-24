/**
 * 开始节点
 */

import React from 'react';
import { Handle, Position } from 'reactflow';

import './text-updater-node.css'

class Start extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        const html =
            <div className="node-border">
                START
                <Handle id="next" type="source" position={Position.Right} style={{ background: '#555' }} />
            </div>

        return html
    }
}

export default Start;