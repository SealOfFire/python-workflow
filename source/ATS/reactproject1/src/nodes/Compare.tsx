/**
 * 逻辑运算比较
 */

import React from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from './BaseNode'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


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
                        <MenuItem value={"Eq"}>==</MenuItem>
                        <MenuItem value={"NotEq"}>!=</MenuItem>
                        <MenuItem value="Lt">&lt;</MenuItem>
                        <MenuItem value="LtE">&lt;=</MenuItem>
                        <MenuItem value="Gt">&gt;</MenuItem>
                        <MenuItem value="GtE">&gt;=</MenuItem>
                        <MenuItem value="Is">IS</MenuItem>
                        <MenuItem value="IsNot">IS NOT</MenuItem>
                        <MenuItem value="In">IN</MenuItem>
                        <MenuItem value="NotIn">NOT IN</MenuItem>
                    </Select>
                </FormControl>
            </div>

        const handles =
            <div>
                <Handle id="left" type="target" position={Position.Left} style={{ top: 175, background: '#00ff00' }} />
                <Handle id="comparators" type="target" position={Position.Left} style={{ top: 225, background: '#00ff00' }} />
            </div>

        const html =
            <BaseNode
                data={this.props.data}
                title="COMPARE"
                hasNext={true}
                subheader="逻辑运算"
                content={content}
                handles={handles}
                parameters={["LEFT", "COMPARATORS"]}
            />

        return html
    }
}

export default Compare;