import React, { useRef, useCallback, useState, useEffect } from 'react';
//import create from 'zustand';
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
    //FitViewOptions,
    updateEdge,
    //useNodesState,
    //useEdgesState,
    ReactFlowInstance,
    Node,
    Edge,
    DefaultEdgeOptions,
    ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './flow-chart.css'
import nodeTypes from '../nodes/nodeTypes'
import { CustomNode/*, INodeData*/ } from '../nodes/INodeData'
//import NodeContextMenu from './NodeContextMenu'
import { v4 as uuidv4 } from 'uuid';
//import useStore from './store';
//import { shallow } from 'zustand/shallow';

//const selector = (state: any) => ({
//    nodes: state.nodes,
//    edges: state.edges,
//    onNodesChange: state.onNodesChange,
//    onEdgesChange: state.onEdgesChange,
//    onConnect: state.onConnect,
//});

function FlowChart(props: any) {
    console.log('FlowChart', 'props', props);

    const key = props.data.path + props.data.fileName;
    const edgeUpdateSuccessful = useRef(true);
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const rfInstance = useRef<HTMLElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
    const [nodes, setNodes] = useState<CustomNode[]>(props.data.nodes);
    const [edges, setEdges] = useState<Edge[]>(props.data.edges);
    const [hasChange, setHasChange] = useState<boolean>(false);
    // const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode[]>([]);
    // const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode[]>(props.data.nodes);
    // const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(props.data.edges);

    const edgeOptions: DefaultEdgeOptions = {
        animated: true,
        style: { stroke: 'black', },
        markerEnd: { type: MarkerType.ArrowClosed, color: 'black', },
    }

    // const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);
    //const onConnect = useCallback((params: any) => setEdges((eds: any) => addEdge(params, eds)), []);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            setNodes((nds: CustomNode[]) => applyNodeChanges(changes, nds));
            //setHasChange(true);
        },
        [setNodes]
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds))
            //setHasChange(true);
            // 数据回写
        },
        [setEdges]
    );

    const onConnect = useCallback(
        (connection: Connection) => {
            setEdges((eds: Edge[]) => addEdge(connection, eds))
            setHasChange(true);
            // 数据回写
        },
        [setEdges]
    );

    const onEdgeUpdateStart = useCallback(() => {
        edgeUpdateSuccessful.current = false;
    }, []);

    const onEdgeUpdate = useCallback((oldEdge: any, newConnection: any) => {
        edgeUpdateSuccessful.current = true;
        setEdges((els: any) => updateEdge(oldEdge, newConnection, els));
    }, []);

    const onEdgeUpdateEnd = useCallback((_: any, edge: any) => {
        if (!edgeUpdateSuccessful.current) {
            setEdges((eds: any) => eds.filter((e: any) => e.id !== edge.id));
        }

        edgeUpdateSuccessful.current = true;
    }, []);

    const onDrop = useCallback(
        (event: any) => {
            event.preventDefault();

            const reactFlowBounds: any = reactFlowWrapper.current?.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');
            const type2 = eval('(' + type + ')');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance?.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            console.log('FlowChart', 'onDrop', reactFlowInstance)
            console.log('FlowChart', 'onDrop', nodes, nodes)
            addNode(type2, position);

            //const newNode = {
            //    id: uuidv4(),
            //    type: type2.type,
            //    position,
            //    data: { label: `${type} node` },
            //};
            //setNodes((nds: any) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    useEffect(() => {
        console.log('FlowChart', 'useEffect', nodes, edges);
        console.log('FlowChart', 'useEffect', props.callSave);

        if (hasChange) {
            console.log('FlowChart', 'useEffect', 'key', key);
            // 节点数据传到外面
            props.changeNodes(key, nodes);
            props.changeEdges(key, edges);
            props.changeSave();
            setHasChange(false);
        }

        //if()
    })

    /**
    * 节点数据修改
    */
    const onDataChange = (data: any) => {
        console.log('FlowChart', "onDataChange", data);
        const changeNodes = nodes.slice();
        console.log('FlowChart', 'onDataChange', 'nodes1', nodes);

        for (let i = 0; i < nodes.length; i++) {
            if (changeNodes[i].id === data.id) {
                changeNodes[i]!.data = data;
            }
        }
        console.log('FlowChart', 'onDataChange', 'nodes2', nodes);
        setNodes(nodes);

        setHasChange(true);
        // 保存到外层
        //props.changeNodes(key, nodes)
    }

    const deleteEdge = (node: CustomNode, targetHandle: string) => {
        console.log('FlowChart', "deleteEdge", node, targetHandle);

        // 查找所有指向删除节点的连线
        const remove = []
        for (let i = 0; i < edges.length; i++) {
            if (edges[i].targetHandle === targetHandle && edges[i].target === node.id) {
                remove.push(edges[i])
            }
        }
        if (remove.length > 0) {
            reactFlowInstance?.deleteElements({ edges: remove });
            setHasChange(true);
        }
    }

    /**
    * 创建一个节点
    */
    const addNode = (type: any, position: any) => {
        console.log('FlowChart', 'addNode', type);
        //type = "baseNode";
        const id = uuidv4();
        const newNode: any = {
            id: id,
            type: type.type,
            position: position,
            data: {
                //nodes: props.data.nodes,
                path: props.data.path,
                fileName: props.data.fileName,
                id: id,
                label: `${type.type} node`,
                value: type.value,
                type: type.type,
                op: '',
                list: [],
                target: '',
                targets: '',
                onDataChange: onDataChange,
                onDeleteNode: deleteNode,
                changeNodes: props.changeNodes,
                changeEdges: props.changeEdges,
                getNodes: props.getNodes,
                flowChartRef: reactFlowInstance,
                onDeleteEdge: deleteEdge,
            },
            /*dragHandle: '.custom-drag-handle',*/ // 控制可拖动的位置
        };

        console.log('FlowChart', 'addNode', 'nodes1', nodes);
        setNodes((nds: Node[]) => nds.concat(newNode));

        setHasChange(true);

        //console.log('FlowChart', 'addNode', 'nodes3', reactFlowInstance?.getNodes());
        //const nds = reactFlowInstance?.getNodes().concat([newNode]);

        //console.log('FlowChart', 'addNode', 'nodes2', nds);
        // 保存到外层
        //props.changeNodes(key, nds)
    }

    /**
     * 删除节点
     */
    const deleteNode = (node: any) => {
        console.log('FlowChart', "deleteNode", node);

        if (reactFlowInstance !== undefined) {
            console.log('FlowChart', "deleteNode", 'nodes1');
            const deleteNode: any = reactFlowInstance.getNode(node.id)
            reactFlowInstance.deleteElements({ nodes: [deleteNode] });

            const nodes = reactFlowInstance.getNodes()
            console.log('FlowChart', "deleteNode", 'nodes2', nodes);

            setHasChange(true);
            // 保存到外层
            //props.changeNodes(key, nodes)
        }
    }

    // 恢复数据时设置节点的回调函数
    const nds = props.data.nodes.slice();
    console.log('FlowChart', 'nds0', nds)
    for (let i = 0; i < nds.length; i++) {
        console.log('FlowChart', 'nds1', nds[i])
        console.log('FlowChart', 'nds2', nds[i].data)
        nds[i].data.onDataChange = onDataChange;
        nds[i].data.onDeleteNode = deleteNode;
        nds[i].data.onDeleteEdge = deleteEdge;
        //nds[i].data.flowChartRef = reactFlowInstance;
    }
    console.log('FlowChart', 'nds', nds)

    ////setNodes(nds)
    //const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode[]>(nds);

    return (
        <div className="reactflow-wrapper"
            style={{ height: '100%', width: '100%', flexGrow: 1, }}
            ref={reactFlowWrapper}>
            <ReactFlow
                className="touchdevice-flow"
                defaultEdgeOptions={edgeOptions}
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onEdgeUpdate={onEdgeUpdate}
                onEdgeUpdateStart={onEdgeUpdateStart}
                onEdgeUpdateEnd={onEdgeUpdateEnd}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                style={{ backgroundColor: '#D3D2E5' }}>
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
}

function FlowWithProvider(props: any) {
    return (
        <ReactFlowProvider>
            <FlowChart {...props} />
        </ReactFlowProvider>
    );
}

export default FlowWithProvider;