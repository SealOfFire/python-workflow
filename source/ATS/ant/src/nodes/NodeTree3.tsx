import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { nodeData, INode } from './nodeTypes'

interface NodeTree3 {
    state: {
        ref: any
    }
}

class NodeTree3 extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            ref: React.createRef()
        }
    }

    /**
    * 拖拽创建节点
    */
    onDragStart = (nodeType: any, event: any) => {
        console.log('onDragStart', 'event', event);
        console.log('onDragStart', 'nodeType', nodeType);
        event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeType));
        event.dataTransfer.effectAllowed = 'move';
        // DataTransfer.setDragImage()
        //event.target.appendChild(<div>aaaaa</div>)
    }

    componentDidMount() {
        console.log('componentDidMount');
        console.log(this.state.ref.current);
        this.state.ref.current.addEventListener('focusin', (e: any) => {
            console.log(e)
            e.stopImmediatePropagation()
        })
    }

    createNode = (nodes: Array<INode>) => {
        return nodes.map((node) =>
            node.children
                ? <TreeItem key={node.id} nodeId={node.id} label={node.title}>{node.children && this.createNode(node.children)}</TreeItem>
                : <TreeItem key={node.id} nodeId={node.id} label={node.title} onDragStart={this.onDragStart.bind(this, { type: node.id, value: null })} draggable />
        );
    }

    render() {

        //const tree = this.createNode(nodeData);

        const html = <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            style={{ overflow: 'auto' }}
            ref={this.state.ref}
        >
            {this.createNode(nodeData)}
        </TreeView>

        return html
    }
}

export default NodeTree3;
