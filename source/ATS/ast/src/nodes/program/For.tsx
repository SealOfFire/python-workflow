import BaseNode from '../BaseNode'

function For(props: any) {

    const parameters = [
        { id: 'target', title: 'TARGET', type: 'target' },
        { id: 'iter', title: 'ITERATION', type: 'target' },
        { id: 'body', title: 'BODY', type: 'source' },
        { id: 'orelse', title: 'OR ELSE', type: 'source' },
    ]

    return (
        <BaseNode
            {...props}
            title={'FOR'}
            subheader='循环'
            showTitle={true}
            hasPrevious={true}
            hasNext={true}
            parameters={parameters}
        />
    );
}

export default For;