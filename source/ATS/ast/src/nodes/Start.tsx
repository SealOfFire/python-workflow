import BaseNode from './BaseNode'

function Start(props: any) {
    console.log('Start', props);

    return (
        <BaseNode
            {...props}
            title='START'
            subheader='程序的起点'
            hasPrevious={false}
            hasNext={true}
            nextCategory='expr' />
    );
}

export default Start;