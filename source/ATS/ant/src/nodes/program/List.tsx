import React from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from '../BaseNode'
import { Card } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

interface List {
    state: {
        list: Array<any>
        refs: Array<any>
        handleRefs: Array<any>
        card: any
    }
}

class List extends React.Component<any> {
    constructor(props: any) {
        super(props);

        let refs = [];
        let handleRefs = []
        if (this.props.parameters) {
            refs = this.props.parameters.map(() => {
                return React.createRef()
            });

            handleRefs = this.props.parameters.map(() => {
                return React.createRef()
            });
        }

        this.state = {
            list: this.props.data.list,
            refs: refs,
            handleRefs: handleRefs,
            card: React.createRef(),
        }
    }

    add = () => {
        console.log("add");

        const node = { ... this.props.data }
        node.list.push(node.list.length - 1 + 1);
        this.props.data.onDataChange(node);

        let refs = []
        let handleRefs = []
        for (let i = 0; i < node.list.length; i++) {
            refs[i] = React.createRef()
            handleRefs[i] = React.createRef()
        }

        this.setState({
            list: node.list,
            refs: refs,
            handleRefs: handleRefs,
        });
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');

        const className = this.state.card.current.children[0].getAttribute('class') + " custom-drag-handle"
        this.state.card.current.children[0].setAttribute('class', className)

        console.log('refs', this.state.refs);
        console.log('handleRefs', this.state.handleRefs);
        this.state.handleRefs.map((item: any, index: number) => {
            console.log('top2', item.current.style.top);
            const top = this.state.refs[index].current.offsetTop + this.state.refs[index].current.offsetHeight / 2
            console.log('top', top);
            item.current.setAttribute('style', `top: ${top}px; background: #00ff00;`)
            console.log('top3', item.current.style.top);
        });
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

        const parameters = []
        console.log("data:", this.state.list.length);
        console.log("array:", this.state.list);

        for (let index = 0; index < this.state.list.length; index++) {
            console.log("parameters:");
            parameters.push({ id: `value[${index}]`, title: index, type: 'target' });

        }
        console.log("parameters:", parameters);

        const actions = [< PlusCircleOutlined key="edit" onClick={this.add} />]

        const parameters2 = parameters?.map((item: any, index: number) =>
            <Card.Grid key={index} style={gridStyle}>
                <div ref={this.state.refs[index]} >{item['title']}</div>
            </Card.Grid>);

        const parametersHandles = parameters?.map((item: any, index: number) =>
            <Handle key={index} id={item['id']} type={item['type']} position={item['type'] == 'target' ? Position.Left : Position.Right}
                style={{ top: 50, background: '#00ff00' }} ref={this.state.handleRefs[index]} />
        );

        const html =
            <Card hoverable
                title={'LIST'}
                style={{ width: 150 }}
                ref={this.state.card}
                actions={actions}
            >
                {parameters2}
                <Handle id="next" type="source" position={Position.Right} style={{ top: 29, background: '#555' }} />

                {parametersHandles}
            </Card>



        return html
    }
}

export default List;