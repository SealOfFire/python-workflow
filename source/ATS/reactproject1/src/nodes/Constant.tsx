import React from 'react';
import { Handle, Position } from 'reactflow';
import { NodeData } from './NodeData'

import './text-updater-node.css'

interface Constant {
    state: {
        id: string,
        value: string,
        label: string,
        //data: any
    }
}

class Constant extends React.Component<any> {
    constructor(props: any) {
        super(props);
        console.log("Constant", props);
        this.state = {
            id: '',
            value: '',
            label: ''
            //data: { id: '', label: '', value: '' }
        }
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
                    CONSTANT
                </div>
                <div>
                    <input id="text" name="text" value={this.props.data.value} onChange={this.onChange} style={{ width: 80 }} />
                </div>
                <Handle id="next" type="source" position={Position.Right} style={{ background: '#00ff00' }} />
            </div>

        return html;
    }
}

export default Constant;