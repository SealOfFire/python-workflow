import BaseNode from '../BaseNode'

function Name(props: any) {
    console.log('Name', props)

    return (
        <BaseNode
            {...props}
            title='NAME'
            subheader={props.data.value}
            hasPrevious={false}
            hasNext={true} />
    );
}

export default Name;