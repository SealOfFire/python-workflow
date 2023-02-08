import React, { ChangeEvent } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IFileData, IParameterType } from '../form/IMainData'

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Parameters(props: any) {
    console.log('Parameters', props)
    const [hover, setHover] = React.useState(false);
    // const [data, setData] = React.useState(false);
    const [name, setName] = React.useState<string>('');

    /**
     * 设置显示数据
     */
    const showData = (fileData: IFileData) => {
        console.log('Parameters', 'showData', showData)
    }

    const handleMouseEnter = () => {
        setHover(true)
    };
    const handleMouseLeave = () => {
        setHover(false)
    };

    const styles = {
        cursor: hover ? 'move' : 'default',
    }

    /**
    * 拖拽创建节点
    */
    const onDragStart = (event: any, nodeType: any) => {
        console.log('onDragStart', 'event', event);
        console.log('onDragStart', 'nodeType', nodeType);
        event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeType));
        event.dataTransfer.effectAllowed = 'move';
    }

    const changeName = (event: ChangeEvent<HTMLInputElement>) => {
        //console.log(event)

        setName(event.target.value)
    }

    const addName = () => {
        //console.log(name)
        console.log('Parameters', 'addName', props.data)
        const params: IParameterType[] = props.data.parameters.slice();
        // console.log('Parameters', 'addName', table)
        params.push({
            name: name,
            type: 'string',
            scope: null,
            value: null,
        })

        changeParamter(params)

        setName('');
    }

    const deleteName = (name: string) => {
        // todo删除流程图上的变量
        //const params: IParameterType[] = props.data.parameters.slice();
        const params: IParameterType[] = props.data.parameters.slice().filter((n: IParameterType) => n.name !== name);
        changeParamter(params)
    }

    const changeParamter = (parameters: IParameterType[]) => {
        console.log('Parameters', 'changeParamter')
        console.log(props)

        const key = props.data.path + props.data.fileName;
        props.onChangeParamters(key, parameters);
    }

    return (
        <>
            <Paper component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}            >
                <TextField id="name" label="name"
                    variant="outlined" margin="dense"
                    placeholder='变量名' sx={{ ml: 1, flex: 1 }}
                    value={name}
                    onChange={changeName}
                />
                <IconButton color="primary" sx={{ p: '10px' }} onClick={addName}>
                    <AddIcon />
                </IconButton>
            </Paper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>名称</TableCell>
                            <TableCell align="right">数据类型</TableCell>
                            <TableCell align="right">作用域</TableCell>
                            <TableCell align="right">数值</TableCell>
                            <TableCell align="right">编辑</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.parameters.map((row: IParameterType) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, ...styles }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onDragStart={(event) => onDragStart(event, { type: 'name', value: row.name })}
                                draggable
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                                <TableCell align="right">{row.scope}</TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => deleteName(row.name)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Parameters;