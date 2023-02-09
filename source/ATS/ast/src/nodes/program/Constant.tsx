import BaseNode from '../BaseNode'
import TextField from '@mui/material/TextField';

function Constant(props: any) {
    console.log('Constant', props);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //console.log('Constant', 'onChange', e);
        //console.log('Constant', 'onChange', 'props', props);
        //console.log('Constant', 'onChange', 'id', props.data.id);
        const node = props.data.flowChartRef.getNode(props.data.id)
        //console.log('Constant', 'onChange', 'node', node);

        node.data.value = e.target.value;
        // console.log(props.data.onDataChange)

        //props.data.flowChartRef.onDataChange(node);
        //props.data.onDataChange(node);
    }

    const content =
        <TextField id="outlined-basic"
            label="value"
            variant="outlined"
            onChange={onChange}
            className="nodrag"
            value={props.data.value}
            size='small'
        />

    return (
        <BaseNode
            {...props}
            title='CONSTANT'
            subheader='常量'
            hasPrevious={false}
            hasNext={true}
            nextCategory='var'
            content={content} />
    );
}

export default Constant;