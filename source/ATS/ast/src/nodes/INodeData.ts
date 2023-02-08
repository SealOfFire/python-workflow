import { Node, Edge } from 'reactflow';
import React from 'react'

export interface INodeData {
    //nodes?: CustomNode[]
    path?: string,
    fileName?: string,
    id: string,
    type: string
    label?: string
    value?: string
    op?: string
    list?: []
    target?: string,
    targets?: string,
    onDataChange?: (node: CustomNode) => void,
    onDeleteNode?: (node: CustomNode) => void,
    changeNodes?: (id: string, nodes: CustomNode[]) => void,
    changeEdges?: (id: string, edges: Edge[]) => void,
    getNodes?: (id: string) => CustomNode[]
    flowChartRef?: any
    onDeleteEdge?: (node: CustomNode, handle: string) => void,
}

export type CustomNode = Node<INodeData>;