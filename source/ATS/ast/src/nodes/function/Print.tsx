import { useState } from 'react'
import BaseNode from '../BaseNode'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function Print(props: any) {
    const [data, setData] = useState(props.data)

    const node = { ...props }
    node.data.value = 'print'
    node.data.list=['']
    node.data.type='call'

    const parameters = [
        { id: 'value[0]', title: 'VALUE', type: 'target', category:'' },
    ]

    const content =
        <Box style={{}}>
            <TextField id="outlined-basic"
                label="函数名"
                variant="outlined"
                className="nodrag"
                value={props.data.value}
                size='small'
                InputProps={{ readOnly: true, }}
            />
        </Box>

    return (
        <BaseNode
            {...props}
            title='PRINT'
            subheader='调用print函数'
            hasPrevious={true}
            hasNext={true}
            parameters={parameters}
            //readOnly={true}
        />
    );
}

export default Print;