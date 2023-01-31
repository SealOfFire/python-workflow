import React from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    Connection,
    NodeChange,
    EdgeChange,
    MarkerType,
    FitViewOptions,
    Edge,
    updateEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import nodeTypes from '../nodes/nodeTypes'
import NodeContextMenu from './NodeContextMenu'
import { v4 as uuidv4 } from 'uuid';


const sampleNodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { id: '', label: 'Hello', value: '123' },
        type: 'textUpdater'
    },
    {
        id: '2',
        position: { x: 100, y: 100 },
        data: { id: '', label: 'World', value: '123' },
    },
    {
        id: '3',
        position: { x: 150, y: 150 },
        data: { id: '', label: 'World', value: '123' },
        type: 'start'
    },
]

interface FlowChart {
    state: {
        selectedNode: any, // 选中的节点
        nodeContextMenuPosition: { x: number, y: number }  // 节点菜单弹出位置
        openNodeContextMenu: boolean, // 节点菜单是否显示
        nodeTypes: { [id: string]: any },
        edgeTypes: { [id: string]: any },
        edgeOptions: any
        nodes: Array<any>,
        edges: Array<any>,
        rfInstance: any,
        reactFlowWrapper: any,
        fitViewOptions: FitViewOptions,
        output: string | null,
    }
}

class FlowChart extends React.Component {
    constructor(props: any) {
        super(props);

        this.state = {
            selectedNode: null,
            nodeContextMenuPosition: { x: 0, y: 0 },
            openNodeContextMenu: false,
            nodeTypes: nodeTypes,
            edgeTypes: {},
            edgeOptions: {
                animated: true,
                style: {
                    stroke: 'black',
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: 'black',
                },
            },
            nodes: [],
            edges: [],
            rfInstance: null,
            reactFlowWrapper: React.createRef(),
            fitViewOptions: { padding: 0.2, },
            output: null,
        }
    }

    setNodes = (nds: Array<any>) => {
        console.log('setNodes', nds);
        this.setState({ nodes: nds });
    }

    setEdges = (eds: Array<any>) => {
        console.log('setEdges', eds);
        this.setState({ edges: eds });
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

    /**
     * 右键菜单
     */
    onContextMenu = (event: React.MouseEvent) => {
        console.log('onContextMenu', event);

        event.preventDefault();
    }

    /**
     * 节点右键菜单
     */
    onNodeContextMenu = (event: React.MouseEvent, node: any) => {
        console.log('onNodeContextMenu', event);
        console.log('onNodeContextMenu', node);

        event.preventDefault();
        //console.log('onNodeContextMenu', event.clientX, event.clientY);
        //console.log('onNodeContextMenu', event.screenX, event.screenY);

        //console.log('onNodeContextMenu', this.state.rfInstance.getZoom());
        const zoom = this.state.rfInstance.getZoom();
        console.log('zoom', zoom);
        const reactFlowBounds = this.state.reactFlowWrapper.current.getBoundingClientRect();
        console.log('reactFlowBounds', reactFlowBounds);
        console.log('zoom', event.clientX, event.clientY);
        const position = this.state.rfInstance.project({
            x: (event.clientX - reactFlowBounds.left - 3),
            y: (event.clientY - reactFlowBounds.top - 3),
        });

        const position2 = this.state.rfInstance.project({
            x: (event.clientX - 3),
            y: (event.clientY - 3),
        });

        console.log('position', position);

        this.setState({
            selectedNode: node,
            openNodeContextMenu: true,
            nodeContextMenuPosition: position,
        });
    }

    /**
     * 保存流程图
     */
    save = () => {
        console.log("save");
        //console.log(this.state.rfInstance);
        const flow = this.state.rfInstance.toObject();
        //console.log(flow);
        console.log("save", JSON.stringify(flow));
        // alert(JSON.stringify(flow));

        this.setState({ output: JSON.stringify(flow) });
    }


    /**
     * 读取流程图
     */
    load = () => {
        console.log('load', this.state.output);
        const nds = eval('(' + this.state.output + ')');
        //console.log('load', nds);
        this.setNodes(nds.nodes);
        this.setEdges(nds.edges);
    }


    onInit = (ref: any) => {
        console.log('setRfInstance', ref);
        this.setState({ rfInstance: ref });
    }

    onDrop = (event: any) => {
        console.log('onDrop', event);
        event.preventDefault();

        const reactFlowBounds = this.state.reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        console.log('onDrop type', type);
        const type2 = eval('(' + type + ')');
        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type2.type) {
            return;
        }

        const position = this.state.rfInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        //const newNode = {
        //    id: '111',
        //    type,
        //    position,
        //    data: { label: `${type} node` },
        //};

        this.addNode(type2, position);

        //console.log('newNode:', newNode);
        //const nds = this.state.nodes.slice();
        //console.log('newNode', nds.concat(newNode));
        //this.setState({ nodes: nds.concat(newNode) });
    }

    onDragOver = (event: any) => {
        console.log('onDragOver', event);
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }

    /**
     * 节点数据修改
     */
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

    /**
     * 创建一个节点
     */
    addNode = (type: any, position: any) => {
        console.log('addNode', type);
        //type = "baseNode";
        const id = uuidv4();
        const newNode = {
            id: id,
            type: type.type,
            position: position,
            data: {
                id: id,
                label: `${type.type} node`,
                value: type.value,
                type: type.type,
                op: '',
                list: [],
                target: '',
                targets: '',
                onDataChange: this.onDataChange,
                onDeleteNode: this.deleteNode,
            },
            dragHandle: '.custom-drag-handle',

        };
        const nds = this.state.nodes.slice();
        this.setState({ nodes: nds.concat(newNode) });

        // TODO 最近使用的节点列表
    }

    /**
     * 删除节点
     */
    deleteNode = (node: any) => {
        console.log("deleteNode", node);
        // 删除节点
        const changeNodes = this.state.nodes.slice().filter((n) => n.id !== node.id);
        // const changeNodes2 = changeNodes.filter((n) => n.id !== id);
        this.setNodes(changeNodes);

        // 删除节点的所有连接线
        const changeEdges = this.state.edges.slice().filter((e) => e.sourceHandle !== node.id && e.targetHandle !== node.id);
        this.setEdges(changeEdges);

    }

    /**
     * 通过右键菜单删除组件
     */
    deleteNodeByContextMenu = (node: any) => {
        console.log("deleteNodeByContextMenu", node);
        this.deleteNode(node);
        this.setState({ openNodeContextMenu: false });
    }

    render() {
        const html =
            <React.Fragment>
                <div style={{ height: '100%', flexGrow: 1 }} ref={this.state.reactFlowWrapper}>
                    <ReactFlow
                        defaultViewport={{ x: 0, y: 0, zoom: 1.0 }}
                        nodes={this.state.nodes}
                        edges={this.state.edges}
                        nodeTypes={this.state.nodeTypes}
                        defaultEdgeOptions={this.state.edgeOptions}
                        onNodesChange={this.onNodesChange}
                        onEdgesChange={this.onEdgesChange}
                        onEdgeUpdate={this.onEdgeUpdate}
                        onEdgeUpdateStart={this.onEdgeUpdateStart}
                        onEdgeUpdateEnd={this.onEdgeUpdateEnd}
                        onConnect={this.onConnect}
                        onContextMenu={this.onContextMenu}
                        onNodeContextMenu={this.onNodeContextMenu}
                        style={{ backgroundColor: '#D3D2E5' }}
                        onInit={this.onInit}
                        onDrop={this.onDrop}
                        onDragOver={this.onDragOver}
                    >
                        <MiniMap />
                        <Controls />
                        <Background />
                        <NodeContextMenu
                            open={this.state.openNodeContextMenu}
                            position={this.state.nodeContextMenuPosition}
                            node={this.state.selectedNode}
                            onMouseLeave={() => { this.setState({ openNodeContextMenu: false }); }}
                            deleteNode={this.deleteNodeByContextMenu.bind(this, this.state.selectedNode)}
                        />
                    </ReactFlow>
                </div>
            </React.Fragment >

        return html;
    }

}

export default FlowChart;