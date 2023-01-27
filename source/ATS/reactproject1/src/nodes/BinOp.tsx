/**
 * 双目运算
 */

import React from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from './BaseNode'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


class BinOp extends React.Component<any> {
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
        const content =
            <div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">OP</InputLabel>
                    <Select labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="OP"
                        value={this.props.data.op}
                        onChange={this.onChange}
                    >
                        <MenuItem value={"Add"}>+</MenuItem>
                        <MenuItem value={"Sub"}>-</MenuItem>
                        <MenuItem value={"Mult"}>*</MenuItem>
                        <MenuItem value={"Div"}>&divide;</MenuItem>
                        <MenuItem value={"FloorDiv"}>//</MenuItem>
                        <MenuItem value={"Mod"}>%</MenuItem>
                        <MenuItem value={"Pow"}>POW</MenuItem>
                        <MenuItem value={"LShift"}>&lt;&lt;</MenuItem>
                        <MenuItem value={"RShift"}>&gt;&gt;</MenuItem>
                        <MenuItem value={"BitOr"}>OR</MenuItem>
                        <MenuItem value={"BitXor"}>XOR</MenuItem>
                        <MenuItem value={"BitAnd"}>AND</MenuItem>
                        <MenuItem value={"MatMult"}>@</MenuItem>
                    </Select>
                </FormControl>
            </div>

        const handles =
            <div>
                <Handle id="left" type="target" position={Position.Left} style={{ top: 175, background: '#00ff00' }} />
                <Handle id="right" type="target" position={Position.Left} style={{ top: 225, background: '#00ff00' }} />
            </div>

        const html =
            <BaseNode
                data={this.props.data}
                title="BIN OP"
                hasNext={true}
                subheader="双目运算"
                content={content}
                handles={handles}
                parameters={["LEFT", "RIGHT"]}
            />

        return html
    }
}

export default BinOp;