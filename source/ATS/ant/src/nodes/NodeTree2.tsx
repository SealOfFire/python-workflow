/**
 * ant 样式
 */
import React from 'react';
import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import {
    MehOutlined,
} from '@ant-design/icons';
import nodeTypes, { nodeName } from './nodeTypes'

interface NodeTree {
    state: {
        nodes: DataNode[]
    }
}

class NodeTree extends React.Component {
    constructor(props: any) {
        super(props);

        const program = []

        for (let k in nodeTypes) {
            console.log(k);
            const item = {
                title:
                    <div onDragStart={this.onDragStart.bind(this, { type: k, value: null })} draggable>
                        <MehOutlined />
                        <span style={{ color: '#1890ff' }}>{nodeName[k]}</span>
                    </div>,
                key: k
            };
            program.push(item);
        }

        this.state = {
            nodes: [
                {
                    title: 'program',
                    key: 'program',
                    children: program
                },
            ]
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
    }

    render() {
        const html =
            <React.Fragment>
                <Tree
                    showLine={true}
                    showIcon={true}
                    style={{ height: '100%' }}
                >
                    <Tree.TreeNode title='program' key='program'>
                        <Tree.TreeNode title={<span draggable> aaaa</span>} key='aaaa' icon={<MehOutlined />}>
                            bbbb
                        </Tree.TreeNode>
                    </Tree.TreeNode>
                </Tree>
            </React.Fragment>

        return html;
    }
}

export default NodeTree;
