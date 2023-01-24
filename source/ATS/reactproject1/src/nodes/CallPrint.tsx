/**
 * 打印函数
 */

import React from 'react';
import { Handle, Position } from 'reactflow';

import './text-updater-node.css'

class CallPrint extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    onChange = (evt: any) => {
        console.log(evt.target.value);

        const node = { ... this.props.data }
        node.value = evt.target.value;
        console.log(this.props.data.onDataChange)
        this.props.data.onDataChange(node);
    }

    render() {
        const html =
            <div className="node-border">
                <div>
                    PRINT
                </div>
                <div>
                    VALUE
                </div>
                <Handle id="previous" type="target" position={Position.Left} style={{ top: 15, background: '#555' }} />
                <Handle id="next" type="source" position={Position.Right} style={{ top: 15, background: '#555' }} />
                <Handle id="value" type="target" position={Position.Left} style={{ top: 40, background: '#00ff00' }} />
            </div>

        return html
    }
}

export default CallPrint;