import React, { useState } from 'react';
//import { Handle, Position } from 'reactflow';
import BaseNode from '../BaseNode'
import Button from '@mui/material/Button';
//import PlusOneIcon from '@mui/icons-material/PlusOne';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function List(props: any) {
    const [data, setData] = useState(props.data)

    const add = () => {
        console.log('List', 'add');
        const node = { ...data }
        node.list.push(node.list.length - 1 + 1);
        setData(node)
        props.data.onDataChange(node);
    }

    const minus = (index: number) => {
        console.log('List', 'minus', index);
        const node = { ...data }
        node.list = data.list.slice().filter((n: number) => n !== index);
        // TODO 删除连接线
        props.data.onDeleteEdge(props, `value[${index}]`);
        node.list = node.list.map((n: number, index: number) => n = index)
        console.log('List', 'minus', node.list);
        setData(node)
        props.data.onDataChange(node);
    }

    const parameters = []
    //console.log("data:", props.data.list.length);
    //console.log("array:", props.data.list);

    for (let index = 0; index < data.list.length; index++) {
        console.log("parameters:");
        parameters.push({ id: `value[${index}]`, title: index, type: 'target' });

    }

    const content =
        <>
            <Button variant="outlined" startIcon={<AddCircleOutlineIcon />}
                onClick={add} className="nodrag">
                添加项
            </Button>
        </>


    return (
        <BaseNode
            {...props}
            title='LIST'
            subheader='列表'
            hasPrevious={false}
            hasNext={true}
            content={content}
            parameters={parameters}
            onMinus={minus}
            showMinus={true}
        />
    );
}

export default List;