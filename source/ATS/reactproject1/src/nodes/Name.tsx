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
        node.name = evt.target.value;
        console.log(this.props.data.onDataChange)
        this.props.data.onDataChange(node);
    }

    render() {
        const content =
            <React.Fragment>
                <TextField variant="outlined" id="text" name="text"
                    label="NAME"
                    size="small"
                    value={this.props.data.name}
                    onChange={this.onChange}
                    style={{ width: '160px' }} />
            </React.Fragment>

        const html = <BaseNode
            data={this.props.data}
            title="NAME"
            hasPrevious={false}
            hasNext={true}
            subheader="变量"
            content={content}
        />

        return html;
    }
}

export default Assign;
