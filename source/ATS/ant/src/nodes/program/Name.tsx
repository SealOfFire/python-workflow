import React from 'react';
import BaseNode from '../BaseNode'
import { Handle, Position } from 'reactflow';
import { Card } from 'antd';

interface Name {
    state: {
        card: any
    }
}

class Name extends React.Component<any> {
    constructor(props: any) {
        super(props);
        console.log('Name', this.props.data.value)
        this.state = {
            card: React.createRef(),
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
        const className = this.state.card.current.children[0].getAttribute('class') + " custom-drag-handle"
        this.state.card.current.children[0].setAttribute('class', className)
    }

    render() {
        const gridStyle: React.CSSProperties = {
            width: '100%',
            textAlign: 'center',
            /*height: '80',*/
            padding: 5
            //border: 'solid 1px #ccc',
            //borderTop:'0px',
        };

        const parameters = [
            { id: 'name', title: 'name', type: 'source' },
        ]

        const html =
            <Card hoverable
                style={{ width: 150 }}
                ref={this.state.card}
            >
                <Card.Grid style={gridStyle}>
                    <div >{this.props.data.value}</div>
                </Card.Grid>
                <Handle id="next" type="source" position={Position.Right} style={{ background: '#555' }} />
            </Card>

        return html
    }
}

export default Name;