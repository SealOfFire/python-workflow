import { useState } from 'react'
import BaseNode from '../BaseNode'
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Call(props: any) {
    const [data, setData] = useState(props.data)
    const parameters = []

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const node = props.data.flowChartRef.getNode(props.data.id)
        node.data.value = e.target.value;
    }

    const onChangeArgs = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        console.log('Call', 'onChangeArgs', e.target.value, index)

        const node = { ...data }
        node.list[index] = e.target.value
        props.data.onDataChange(node);
    }

    const add = () => {
        console.log('List', 'add');
        const node = { ...data }
        node.list.push("");
        setData(node)
        props.data.onDataChange(node);

    }

    const minus = (index: number) => {
        console.log('List', 'minus', index);
        const node = { ...data }
        node.list = data.list.slice().filter((n: number, i: number) => i !== index);
        // TODO 删除连接线
        props.data.onDeleteEdge(props, `value[${index}]`);
        node.list = node.list.map((n: number, index: number) => n = index)
        console.log('List', 'minus', node.list);
        setData(node)
        props.data.onDataChange(node);
    }

    for (let index = 0; index < data.list.length; index++) {
        console.log("parameters:");
        parameters.push({ id: `value[${index}]`, title: index, type: 'target' });
    }

    const content =
        <Box style={{}}>
            <TextField id="outlined-basic"
                label="函数名"
                variant="outlined"
                onChange={onChange}
                className="nodrag"
                value={props.data.value}
                size='small'
            />
            <Button variant="outlined" startIcon={<AddCircleOutlineIcon />}
                onClick={add} className="nodrag">
                添加参数
            </Button>
        </Box>

    return (
        <BaseNode
            {...props}
            title='CALL'
            subheader='函数调用'
            hasPrevious={true}
            hasNext={true}
            parameters={parameters}
            onMinus={minus}
            showMinus={true}
            readOnly={true}
            content={content}
            onChange={onChangeArgs} />
    );
}

export default Call;