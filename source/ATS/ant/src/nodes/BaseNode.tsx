import React from 'react';
import { Handle, Position } from 'reactflow';
//import NodeContextMenu from '../flowchart/NodeContextMenu'
import { Card } from 'antd';

const { Meta } = Card;

interface BaseNode {
    state: {
        refs: Array<any>
        handleRefs: Array<any>
        card: any,
        connectionNodeId: any
    }
}

class BaseNode extends React.Component<any> {
    constructor(props: any) {
        super(props);

        const aaa = [{ id: '', title: '', type: '' }]

        let refs = [];
        let handleRefs = []
        if (this.props.parameters) {
            //for (let k in this.props.parameters) {
            //    refs.push(React.createRef())
            //    handleRefs.push(React.createRef())
            //}
            refs = this.props.parameters.map(() => {
                return React.createRef()
            });

            handleRefs = this.props.parameters.map(() => {
                return React.createRef()
            });
        }

        console.log(refs);
        this.state = {
            refs: refs,
            handleRefs: handleRefs,
            card: React.createRef(),
            connectionNodeId: null,
        };
    }

    componentDidMount() {
        console.log('componentDidMount');
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
        //console.log("props", this.state.connectionNodeId)

        const gridStyle: React.CSSProperties = {
            width: '100%',
            textAlign: 'center',
            /*height: '80',*/
            padding: 5
            //border: 'solid 1px #ccc',
            //borderTop:'0px',
        };


        const parameters = this.props.parameters?.map((item: any, index: number) =>
            <Card.Grid key={index} style={gridStyle}>
                <div ref={this.state.refs[index]} >{item['title']}</div>
            </Card.Grid>);

        const parametersHandles = this.props.parameters?.map((item: any, index: number) =>
            <Handle key={index} id={item['id']} type={item['type']} position={item['type'] == 'target' ? Position.Left : Position.Right}
                style={{ top: 50, background: '#00ff00' }} ref={this.state.handleRefs[index]} />
        );

        //if (this.props.parameters) {
        //    for (let k in this.props.parameters) {
        //        <Handle key={index} id={item} type="target" position={Position.Left}
        //            style={{ top: 50, background: '#00ff00' }} ref={this.state.handleRefs[index]} />
        //    }
        //}

        // 是否显示标题
        let handleStyle: any = { top: 29, background: '#555' }
        let title = null;
        if (this.props.showTitle) {
            title = this.props.title
        }
        else {
            handleStyle = { background: '#555' }
        }
        const html =
            <Card hoverable
                title={title}
                style={{ width: 150 }}
                ref={this.state.card}
                actions={this.props.actions}
            >
                {
                    // 标题显示在内容中
                    !this.props.showTitle &&
                    <Card.Grid style={gridStyle}>
                        {this.props.title}
                    </Card.Grid>
                }
                {
                    this.props.content &&
                    <Card.Grid style={gridStyle}>
                        {this.props.content}
                    </Card.Grid>
                }
                {parameters}
                {
                    this.props.hasPrevious &&
                    <React.Fragment>
                        <Handle id="previous" type="target" position={Position.Left} style={handleStyle} />
                        {/*<Handle id="previous2" type="target" position={Position.Top} style={handleStyle} />*/}
                    </React.Fragment>
                }
                {
                    this.props.hasNext &&
                    <React.Fragment>
                        <Handle id="next" type="source" position={Position.Right} style={handleStyle} />
                        {/*<Handle id="next2" type="source" position={Position.Bottom} style={handleStyle} />*/}
                    </React.Fragment>
                }
                {/*<Handle id='value1' type='target' position={Position.Left} style={{ top: 70, background: '#00ff00' }} ></Handle>*/}
                {parametersHandles}
            </Card>

        return html;
    }
}

export default BaseNode;