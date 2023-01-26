import React, { useState, useCallback } from 'react';
import ReactFlow, {
    Node,
    Edge,
    Connection,
    FitViewOptions,
    NodeChange,
    EdgeChange,
    Background,
    Controls,
    applyEdgeChanges,
    applyNodeChanges,
    addEdge,
    updateEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './flow-chart.css'
import Button from '@mui/material/Button';

import { v4 as uuidv4 } from 'uuid';
import { NodeData } from './nodes/NodeData'
import TextUpdaterNode from './nodes/TextUpdaterNode'
import Add from './nodes/Add'
import Constant from './nodes/Constant'
import Start from './nodes/Start'
import CallPrint from './nodes/CallPrint'
import If from './nodes/If'
import Compare from './nodes/Compare'

type CustomNode = Node<NodeData>;

interface FlowChart {
    state: {
        nodeTypes: any,
        nodes: CustomNode[],
        edges: Edge[],
        rfInstance: any,
        fitViewOptions: FitViewOptions,
        edgeOptions: any,
        connectionLineStyle: any,
        output: string
    }
}

class FlowChart extends React.Component {
    constructor(props: any) {
        super(props);
        console.log("构造函数");

        this.state = {
            nodeTypes: {
                textUpdater: TextUpdaterNode,
                start: Start,
                add: Add,
                constant: Constant,
                compare: Compare,
                if: If,
                callPrint: CallPrint,
            },
            edgeOptions: {
                animated: true,
                style: {
                    stroke: 'white',
                },
            },
            connectionLineStyle: { stroke: 'white' },
            fitViewOptions: { padding: 0.2, },
            rfInstance: null,
            nodes: [
                //{
                //    id: '1',
                //    position: { x: 0, y: 0 },
                //    data: { id: '', label: 'Hello', value: '123' },
                //    type: 'textUpdater'
                //},
                //{
                //    id: '2',
                //    position: { x: 100, y: 100 },
                //    data: { id: '', label: 'World', value: '123' },
                //},
                //{
                //    id: '3',
                //    position: { x: 150, y: 150 },
                //    data: { id: '', label: 'World', value: '123' },
                //    type: 'start'
                //},
            ],
            edges: [
                //{
                //    id: '1-2',
                //    source: '1',
                //    target: '2',
                //    label: 'to the',
                //    type: 'step'
                //}
            ],
            output: ''
        };

        //this.onNodesChange = this.onNodesChange.bind(this);
        //this.onEdgesChange = this.onEdgesChange.bind(this);
    }

    setNodes = (nds: Array<any>) => {
        console.log('setNodes', nds);
        this.setState({ nodes: nds });
    }

    setEdges = (eds: Array<any>) => {
        console.log('setEdges', eds);
        this.setState({ edges: eds });
    }

    setRfInstance = (ref: any) => {
        console.log('setRfInstance', ref);
        this.setState({ rfInstance: ref });
    }

    onNodesChange = (changes: NodeChange[]) => {
        console.log('onNodesChange', changes);
        const nds = applyNodeChanges(changes, this.state.nodes);
        //console.log(nds)
        this.setNodes(nds)
    }

    onEdgesChange = (changes: EdgeChange[]) => {
        console.log('onEdgesChange', changes);
        const eds = applyEdgeChanges(changes, this.state.edges);
        console.log(eds);
        this.setEdges(eds);
    }

    onConnect = (connection: Connection) => {
        console.log('onConnect', connection);
        const eds = addEdge(connection, this.state.edges);
        this.setEdges(eds);
    }

    //onNodesChangeProp = this.onNodesChange.bind(this);
    //onEdgesChangeProp = this.onEdgesChange.bind(this);

    onDataChange = (data: any) => {
        console.log("onDataChange", data);
        const nodes = this.state.nodes.slice();

        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === data.id) {
                nodes[i]!.data = data;
            }
        }
        //console.log(nodes);
        this.setNodes(nodes);
    }

    onTextareaChange = (evt: any) => {
        this.setState({ output: evt.target.value });
    }

    save = () => {
        console.log("save");
        console.log(this.state.rfInstance);
        const flow = this.state.rfInstance.toObject();
        console.log(flow);
        console.log(JSON.stringify(flow));
        // alert(JSON.stringify(flow));

        this.setState({ output: JSON.stringify(flow) });
    }

    load = () => {
        console.log('load', this.state.output);
        const nds = eval('(' + this.state.output + ')');
        console.log('load', nds);
        this.setNodes(nds.nodes);
        this.setEdges(nds.edges);
    }

    // 修改连线节点
    onEdgeUpdateStart = () => {
        console.log("onEdgeUpdateStart");
    }

    onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) => {
        console.log("onEdgeUpdate", oldEdge, newConnection);

        const edges = updateEdge(oldEdge, newConnection, this.state.edges);
        this.setEdges(edges);
    }

    onEdgeUpdateEnd = (_: any, edge: Edge) => {
        console.log("onEdgeUpdateEnd", edge);
    }

    addNode = (type: string) => {
        console.log("添加节点", type);
        const nds = this.state.nodes.slice();

        const id = uuidv4();
        const newNode = {
            id: id,
            position: { x: 0, y: 0 },
            data: { id: id, label: null, value: null, type: type, onDataChange: this.onDataChange, op: '' },
            type: type
        };

        if (type === 'compare') {
            newNode.data.op = "Eq";
        }

        //const newNode2 = new Constant(null);

        this.setState({ nodes: nds.concat(newNode) });
    }

    render() {
        console.log("render");
        return <div style={{ height: '800px' }}>
            <ReactFlow
                defaultEdgeOptions={this.state.edgeOptions}
                connectionLineStyle={this.state.connectionLineStyle}
                nodeTypes={this.state.nodeTypes}
                nodes={this.state.nodes}
                onNodesChange={this.onNodesChange}
                edges={this.state.edges}
                onEdgesChange={this.onEdgesChange}
                onEdgeUpdate={this.onEdgeUpdate}
                onEdgeUpdateStart={this.onEdgeUpdateStart}
                onEdgeUpdateEnd={this.onEdgeUpdateEnd}
                onConnect={this.onConnect}
                style={{ backgroundColor: '#D3D2E5' }}
                fitView
                fitViewOptions={this.state.fitViewOptions}
                onInit={this.setRfInstance}
            >
                <Background />
                <Controls />
                <div className="save__controls">
                    <Button variant="contained" onClick={this.save}>SAVE</Button>
                    <Button variant="contained" onClick={this.load}>LOAD</Button>
                    <br></br>
                    <Button variant="contained" onClick={this.addNode.bind(this, 'start')}>START</Button>
                    <Button variant="contained" onClick={this.addNode.bind(this, 'add')}>ADD</Button>
                    <Button variant="contained" onClick={this.addNode.bind(this, 'constant')}>CONSTANT</Button>
                    <Button variant="contained" onClick={this.addNode.bind(this, 'callPrint')}>PRINT</Button>
                    <br></br>
                    <Button variant="contained" onClick={this.addNode.bind(this, 'compare')}>COMPARE</Button>
                    <Button variant="contained" onClick={this.addNode.bind(this, 'if')}>IF</Button>
                    <br></br>
                    <textarea value={this.state.output} style={{ width: 200, height: 500 }} onChange={this.onTextareaChange} />
                </div>
            </ReactFlow >
        </div >
    }
}

export default FlowChart
