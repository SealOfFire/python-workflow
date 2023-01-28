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
    MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './flow-chart.css'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Slide from '@mui/material/Slide';

import { v4 as uuidv4 } from 'uuid';
import { NodeData } from './nodes/NodeData'
import nodeTypes from './nodes/nodeTypes'

// 菜单数据
import menuItem from './nodes/nodeTree'

type CustomNode = Node<NodeData>;

interface FlowChart {
    state: {
        top: boolean,
        left: boolean,
        bottom: boolean,
        right: boolean,
        checked: boolean,
        containerRef: any,
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
            top: true,
            left: true,
            bottom: true,
            right: true,
            checked: false,
            containerRef: React.createRef(),
            nodeTypes: nodeTypes,
            edgeOptions: {
                /*type:'floating',*/
                animated: true,
                style: {
                    stroke: 'black',
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: 'black',
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

    deleteNode = (id: string) => {
        console.log("deleteNode", id);
        // 删除节点
        const changeNodes = this.state.nodes.slice().filter((n) => n.id !== id);
        // const changeNodes2 = changeNodes.filter((n) => n.id !== id);
        this.setNodes(changeNodes);

        // 删除节点的所有连接线
        const changeEdges = this.state.edges.slice().filter((e) => e.sourceHandle !== id && e.targetHandle !== id);
        this.setEdges(changeEdges);
    }

    addNode = (type: string) => {
        console.log("添加节点", type);
        const nds = this.state.nodes.slice();

        const id = uuidv4();
        const newNode = {
            id: id,
            position: { x: 0, y: 0 },
            data: {
                id: id,
                label: null,
                value: '',
                type: type,
                onDataChange: this.onDataChange,
                op: '',
                onDeleteNode: this.deleteNode
            },
            type: type,
            // 只能拖拽标题部分
            /*dragHandle: '.custom-drag-handle',*/
        };

        //if (type === 'compare') {
        //    newNode.data.op = "Eq";
        //}

        this.setState({ nodes: nds.concat(newNode) });
    }

    handleChange = () => {
        this.setState({ checked: !this.state.checked })
    }

    render() {
        // console.log("render");
        const html4 =
            <Box sx={{ background: '#555555' }} ref={this.state.containerRef}>
                <Drawer anchor={'left'}
                    open={this.state.left}
                    container={this.state.containerRef.current}>
                    aaa
                </Drawer>
            </Box>

        const html3 =
            <React.Fragment>
                <Box sx={{ background: '#007555' }}
                    ref={this.state.containerRef}>
                    <FormControlLabel
                        control={<Switch checked={this.state.checked} onChange={this.handleChange} />}
                        label="Show"
                    />
                    <Collapse in={this.state.checked} collapsedSize={40} orientation="horizontal">
                        <Box sx={{ width: 250, height: 250, background: '#555555' }}>
                            aa
                        </Box>
                    </Collapse>
                    <Slide direction="up" in={this.state.checked} container={this.state.containerRef.current}>
                        <Box>bbb</Box>
                    </Slide>
                </Box>
            </React.Fragment >

        const html = <Grid container spacing={1}>
            <Grid xs={2}>
                <div style={{ background: '#929292' }} >
                    <TreeView
                        aria-label="file system navigator"
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                    >
                        {
                            menuItem.map((item) =>
                                <TreeItem nodeId={item.title} label={item.title}>
                                    {item.items.map((child) =>
                                        <TreeItem nodeId={child.title} label={child.title}
                                            onClick={this.addNode.bind(this, child.type)} />)}
                                </TreeItem>)
                        }
                    </TreeView>
                </div>
            </Grid>
            <Grid xs={10}>
                <div style={{ height: '1000px' }}>
                    <ReactFlow
                        className="touchdevice-flow"
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
                            <Button variant="contained" onClick={this.addNode.bind(this, 'baseNode')}>NODE</Button>
                            <br></br>
                            <textarea value={this.state.output} style={{ width: 200, height: 500 }} onChange={this.onTextareaChange} />
                        </div>
                    </ReactFlow >
                </div >
            </Grid>
        </Grid>

        return html
    }
}

export default FlowChart
