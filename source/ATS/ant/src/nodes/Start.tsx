import React from 'react';
import BaseNode from './BaseNode'

class Start extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const html =
            <BaseNode
                title={'START'}
                hasPrevious={false}
                hasNext={true}
            />

        return html
    }
}

export default Start;