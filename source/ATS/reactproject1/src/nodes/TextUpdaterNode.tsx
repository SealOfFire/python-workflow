import React from 'react';
import { Handle, Position } from 'reactflow';
import './text-updater-node.css'

interface TextUpdaterNode {
    state: {
        handleStyle: any
    }
}

class TextUpdaterNode extends React.Component {
    /** 
     * 构造函数
     */
    constructor(props: any) {
        super(props);

        this.state = {
            handleStyle: { left: 10 }
        };
    }

    onChange = (evt: any) => {
        console.log(evt.target.value);
    }

    render() {
        return <div className="text-updater-node">
            <Handle type="target" position={Position.Top} />
            <div>
                <label htmlFor="text">Text:</label>
                <input id="text" name="text" onChange={this.onChange} />
            </div>
            <Handle type="source" position={Position.Bottom} id="a" />
            <Handle type="source" position={Position.Bottom} id="b" style={this.state.handleStyle} />
        </div>
    }
}

export default TextUpdaterNode;
