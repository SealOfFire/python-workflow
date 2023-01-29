/**
 * for 循环
 */

import React from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from './BaseNode'
import TextField from '@mui/material/TextField';

class For extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    onChange = (evt: any) => {
        console.log(evt.target.value);

        const node = { ... this.props.data }
        node.target = evt.target.value;
        console.log(this.props.data.onDataChange)
        this.props.data.onDataChange(node);
    }

    render() {
        const content =
            <React.Fragment>
                <TextField variant="outlined" id="text" name="text"
                    size="small"
                    label="TARGET"
                    value={this.props.data.target}
                    onChange={this.onChange}
                    style={{ width: '160px' }} />
            </React.Fragment>

        const handles =
            <React.Fragment>
                <Handle id="iter" type="target" position={Position.Left} style={{ top: 160, background: '#00ff00' }} />
                <Handle id="body" type="source" position={Position.Right} style={{ top: 207, background: '#555' }} />
                <Handle id="orelse" type="source" position={Position.Right} style={{ top: 256, background: '#555' }} />
            </React.Fragment>

        const html = <BaseNode
            data={this.props.data}
            title="FOR"
            hasPrevious={true}
            hasNext={true}
            subheader="for循环"
            content={content}
            handles={handles}
            parameters={["ITER", "BODY", "OR ELSE"]}
        />

        //<Handle id="previous" type="target" position={Position.Left} style={{ top: 30, background: '#555' }} />
        //<Handle id="next" type="source" position={Position.Right} style={{ top: 30, background: '#555' }} />
        //<Handle id="test" type="target" position={Position.Left} style={{ top: 100, background: '#00ff00' }} />
        //<Handle id="body" type="source" position={Position.Right} style={{ top: 120, background: '#555' }} />
        //<Handle id="orelse" type="source" position={Position.Right} style={{ top: 140, background: '#555' }} />


        return html
    }
}

export default For;