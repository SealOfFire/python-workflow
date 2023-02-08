import React from 'react';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { nodeData, INode } from './nodeTypes'

function NodeTree() {
    const treeRef = React.useRef<HTMLElement>(null);

    /**
    * 拖拽创建节点
    */
    const onDragStart = (event: any, nodeType: any) => {
        console.log('onDragStart', 'event', event);
        console.log('onDragStart', 'nodeType', nodeType);
        event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeType));
        event.dataTransfer.effectAllowed = 'move';
        // DataTransfer.setDragImage()
        //event.target.appendChild(<div>aaaaa</div>)
    }

    const createNode = (nodes: Array<INode>) => {
        return nodes.map((node) =>
            node.children
                ? <TreeItem key={node.id} nodeId={node.id} label={node.title}>{node.children && createNode(node.children)}</TreeItem>
                : <TreeItem key={node.id} nodeId={node.id} label={node.title} onDragStart={(event) => onDragStart(event, { type: node.id, value: null })} draggable />
        );
    }

    React.useEffect(() => {
        // console.log('NodeTree', 'useEffect', treeRef.current);
        treeRef.current?.addEventListener('focusin', (e: any) => {
            //console.log(e)
            e.stopImmediatePropagation()
        })
    });

    return (
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            style={{ overflow: 'auto', height: '100%' }}
            ref={treeRef}
        >
            {createNode(nodeData)}
        </TreeView>
    );
}

export default NodeTree;