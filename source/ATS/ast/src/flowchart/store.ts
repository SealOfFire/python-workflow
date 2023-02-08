import create from 'zustand';
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
} from 'reactflow';
import { CustomNode } from '../nodes/INodeData'
import { v4 as uuidv4 } from 'uuid';

import initialNodes from './nodes';
import initialEdges from './edges';

type RFState = {
    nodes: CustomNode[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    onAddNode: (path: string, fileName: string, type: any, position: any) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },
    /** */
    onAddNode: (path: string, fileName: string, type: any, position: any) => {
        const nodes = get().nodes.slice();
        console.log('useStore', 'onAddNode', 'nodes', nodes)

        const id = uuidv4();
        const newNode: any = {
            id: id,
            type: type.type,
            position: position,
            data: {
                //nodes: props.data.nodes,
                path: path,
                fileName: fileName,
                id: id,
                label: `${type.type} node`,
                value: type.value,
                type: type.type,
                op: '',
                list: [],
                target: '',
                targets: '',
                //onDataChange: onDataChange,
                //onDeleteNode: deleteNode,
                //changeNodes: props.changeNodes,
                //changeEdges: props.changeEdges,
                //getNodes: props.getNodes,
                //flowChartRef: reactFlowInstance,
            },
        };

        const changeNodes = nodes.concat(newNode)
        console.log('useStore', 'onAddNode', 'changeNodes', changeNodes);

        set({ nodes: changeNodes })
    },

}));

export default useStore;
