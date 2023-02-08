import BaseNode from '../BaseNode'

function Assign(props: any) {
    const parameters = [
        { id: 'targets', title: 'TARGETS', type: 'target' },
        { id: 'value', title: 'VALUE', type: 'target' },
    ]

    return (
        <BaseNode
            {...props}
            title='ASSIGN'
            subheader='赋值'
            hasPrevious={true}
            hasNext={true}
            parameters={parameters} />
    );
}

export default Assign;