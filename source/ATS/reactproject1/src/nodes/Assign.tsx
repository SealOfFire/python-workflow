/**
 * 变量节点
 */

import React from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from './BaseNode'
import TextField from '@mui/material/TextField';

class Assign extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    onChange = (evt: any) => {
        console.log(evt.target.value);

        const node = { ... this.props.data }
        node.targets = evt.target.value;
        console.log(this.props.data.onDataChange)
        this.props.data.onDataChange(node);
    }

    render() {
        const content =
            <React.Fragment>
                <TextField variant="outlined" id="text" name="text"
                    size="small"
                    label="TARGETS"
                    value={this.props.data.targets}
                    onChange={this.onChange}
                    style={{ width: '160px' }} />
                <Handle id="value" type="target" position={Position.Left} style={{ top: 160, background: '#00ff00' }} />
            </React.Fragment>

        const html = <BaseNode
            data={this.props.data}
            title="ASSIGN"
            hasPrevious={true}
            hasNext={true}
            subheader="分配"
            content={content}
            parameters={["VALUE"]}
        />

        return html;
    }
}

export default Assign;
