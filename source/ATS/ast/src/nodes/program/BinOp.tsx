import React from 'react'
import BaseNode from '../BaseNode'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

function BinOp(props: any) {
    console.log('Compare', 'props', props);

    const [op, setOp] = React.useState(props.data.op)

    const items = [
        { key: 'Add', value: '+' },
        { key: 'Sub', value: '-' },
        { key: 'Mult', value: '*' },
        { key: 'Div', value: '/' },
        { key: 'FloorDiv', value: '%' },
        { key: 'Pow', value: 'POW' },
        { key: 'Mod', value: '//' },
        { key: 'LShift', value: '<<' },
        { key: 'RShift', value: '>>' },
        { key: 'BitOr', value: 'OR' },
        { key: 'BitXor', value: 'XOR' },
        { key: 'BitAnd', value: 'AND' },
        { key: 'MatMult', value: '@' },
    ]

    const onChange = (e: SelectChangeEvent) => {
        console.log('Compare', 'onChange', e);
        console.log('Compare', 'onChange', 'props', props);
        console.log('Compare', 'onChange', 'id', props.data.id);
        console.log('Compare', 'onChange', 'flowChartRef', props.data.flowChartRef);

        setOp(e.target.value);

        const node = { ...props.data }
        node.op = e.target.value;
        console.log('Compare', 'onChange', props.data.onDataChange)
        props.data.onDataChange(node);
    }

    const parameters = [
        { id: 'left', title: 'LEFT', type: 'target' },
        { id: 'right', title: 'RIGHT', type: 'target' },
    ]

    const content =
        <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">OP</InputLabel>
            <Select labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="OP"
                value={op}
                onChange={onChange}
                className="nodrag"
            >
                {items.map((item, index) => <MenuItem key={index} value={item.key}>{item.value}</MenuItem>)}
            </Select>
        </FormControl>

    return (
        <BaseNode
            {...props}
            title='BIN OP'
            subheader='二元运算'
            hasPrevious={false}
            hasNext={true}
            content={content}
            parameters={parameters}
        />
    );
}

export default BinOp;