/**
 * 开始节点
 */

import React from 'react';
import { Handle, Position } from 'reactflow';

import './text-updater-node.css'

class Compare extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    onChange = (evt: any) => {
        console.log(evt.target.value);

        const node = { ... this.props.data }
        node.op = evt.target.value;
        console.log(this.props.data.onDataChange)
        this.props.data.onDataChange(node);
    }

    render() {
        const html =
            <div className="node-border">
                <div>
                    COMPARE
                </div>
                <div>
                    <select value={this.props.data.op} onChange={this.onChange} >
                        <option value="Eq">==</option>
                        <option value="NotEq">!=</option>
                        <option value="Lt">&lt;</option>
                        <option value="LtE">&lt;=</option>
                        <option value="Gt">&gt;</option>
                        <option value="GtE">&gt;=</option>
                        <option value="Is">IS</option>
                        <option value="IsNot">IS NOT</option>
                        <option value="In">IN</option>
                        <option value="NotIn">NOT IN</option>
                    </select>
                </div>
                <div>
                    LEFT
                </div>
                <div>
                    COMPARATORS
                </div>
                <Handle id="previous" type="target" position={Position.Left} style={{ top: 15, background: '#555' }} />
                <Handle id="next" type="source" position={Position.Right} style={{ top: 15, background: '#555' }} />
                <Handle id="left" type="target" position={Position.Left} style={{ top: 60, background: '#00ff00' }} />
                <Handle id="comparators" type="target" position={Position.Left} style={{ top: 82, background: '#00ff00' }} />
            </div>

        return html
    }
}

export default Compare;