import BaseNode from '../BaseNode'

function If(props: any) {

    const parameters = [
        { id: 'test', title: 'TEST', type: 'target' },
        { id: 'body', title: 'BODY', type: 'source', category: 'expr' },
        { id: 'orelse', title: 'OR ELSE', type: 'source', category: 'expr' },
    ]

    return (
        <BaseNode
            {...props}
            title='IF'
            subheader='条件判断'
            hasPrevious={true}
            hasNext={true}
            parameters={parameters} />
    );

}

export default If;