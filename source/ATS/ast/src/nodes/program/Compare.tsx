import React from 'react'
import BaseNode from '../BaseNode'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

function Compare(props: any) {
    console.log('Compare', 'props', props);

    const [op, setOp] = React.useState(props.data.op)

    const items = [
        { key: 'Eq', value: '==' },
        { key: 'NotEq', value: '!=' },
        { key: 'Lt', value: '<' },
        { key: 'LtE', value: '<=' },
        { key: 'Gt', value: '>' },
        { key: 'GtE', value: '>=' },
        { key: 'Is', value: 'IS' },
        { key: 'IsNot', value: 'IS NOT' },
        { key: 'In', value: 'IN' },
        { key: 'NotIn', value: 'NOT IN' },
    ]

    const onChange = (e: SelectChangeEvent) => {
        console.log('Compare', 'onChange', e);
        console.log('Compare', 'onChange', 'props', props);
        console.log('Compare', 'onChange', 'id', props.data.id);
        console.log('Compare', 'onChange', 'flowChartRef', props.data.flowChartRef);

        setOp(e.target.value);

        const node = { ... props.data }
        node.op = e.target.value;
        console.log('Compare', 'onChange', props.data.onDataChange)
        props.data.onDataChange(node);
    }

    const parameters = [
        { id: 'left', title: 'LEFT', type: 'target' },
        { id: 'comparators', title: 'COMPARATORS', type: 'target' },
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
            title='COMPARE'
            subheader='比较运算'
            hasPrevious={false}
            hasNext={true}
            content={content}
            parameters={parameters}
        />
    );
}

export default Compare;