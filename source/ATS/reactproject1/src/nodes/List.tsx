/**
 * 变量节点
 */

import React from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from './BaseNode'
import IconButton from '@mui/material/IconButton';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

class List extends React.Component<any> {
    constructor(props: any) {
        super(props);
        console.log("List", props);
        this.state = {
            list: []
        }
    }

    add = () => {
        console.log("add");

        const node = { ... this.props.data }
        node.list.push(node.list.length - 1 + 1);
        this.props.data.onDataChange(node);
    }

    render() {
        console.log("data:", this.props.data);

        const handle = this.props.data.list.map((item: any) =>
            <Handle id={`value[${item}]`} type="target" position={Position.Left} style={{ top: 46 * item + 160, background: '#00ff00' }} />
        );

        const content =
            <React.Fragment>
                <IconButton onClick={this.add} className="nodrag">
                    <AddCircleOutlineIcon />
                </IconButton>
            </React.Fragment>

        const html = <BaseNode
            data={this.props.data}
            title="LIST"
            hasPrevious={false}
            hasNext={true}
            subheader="列表"
            content={content}
            handles={handle}
            parameters={this.props.data.list}
        />

        return html;
    }
}

export default List;
