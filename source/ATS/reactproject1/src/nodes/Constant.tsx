import React from 'react';
import { Handle, Position } from 'reactflow';
import { NodeData } from './NodeData'
import BaseNode from './BaseNode'
import TextField from '@mui/material/TextField';

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
        const html = <BaseNode
            data={this.props.data}
            title="CONSTANT"
            subheader="常数"
            hasPrevious={false}
            hasNext={true}
            content={<TextField variant="outlined" id="text" name="text"
                size="small"
                label="VALUE"
                value={this.props.data.value}
                onChange={this.onChange}
                style={{ width: '160px' }} />}
        />

        return html;
    }
}

export default Constant;