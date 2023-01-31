/**
 * buleprint 样式
 */
import React from 'react';
import cloneDeep from "lodash/cloneDeep";
import { Classes, Icon, Intent, Tree, TreeNodeInfo, IconSize } from "@blueprintjs/core";

type NodePath = number[];

interface NodeTree {
    state: {
        nodes: TreeNodeInfo[]
    }
}

type TreeAction =
    | { type: "SET_IS_EXPANDED"; payload: { path: NodePath; isExpanded: boolean } }
    | { type: "DESELECT_ALL" }
    | { type: "SET_IS_SELECTED"; payload: { path: NodePath; isSelected: boolean } };

class NodeTree extends React.Component {
    constructor(props: any) {
        super(props);

        this.state = {
            nodes: [
                {
                    id: 0,
                    hasCaret: false,
                    icon: 'document',
                    label:
                        <div onDragStart={this.onDragStart.bind(this, 'input')} draggable>
                            <Icon icon="tag" intent={Intent.PRIMARY} className={Classes.TREE_NODE_ICON} />aaa
                        </div>,
                },
                {
                    id: 1,
                    icon: "folder-close",
                    isExpanded: true,
                    label: '',
                    childNodes: [
                        {
                            id: 2,
                            icon: "document",
                            label: "Item 0",
                            secondaryLabel: '',
                        },
                        {
                            id: 3,
                            icon: <Icon icon="tag" intent={Intent.PRIMARY} className={Classes.TREE_NODE_ICON} />,
                            label: "Organic meditation gluten-free, sriracha VHS drinking vinegar beard man.",
                        },
                        {
                            id: 4,
                            hasCaret: true,
                            icon: "folder-close",
                            label: '',
                            childNodes: [
                                { id: 5, label: "No-Icon Item" },
                                { id: 6, icon: "tag", label: "Item 1" },
                                {
                                    id: 7,
                                    hasCaret: true,
                                    icon: "folder-close",
                                    label: '',
                                    childNodes: [
                                        { id: 8, icon: "document", label: "Item 0" },
                                        { id: 9, icon: "tag", label: "Item 1" },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 2,
                    hasCaret: true,
                    icon: "folder-close",
                    label: "Super secret files",
                    disabled: true,
                },
            ],
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

    forEachNode = (nodes: TreeNodeInfo[] | undefined, callback: (node: TreeNodeInfo) => void) => {
        if (nodes === undefined) {
            return;
        }

        for (const node of nodes) {
            callback(node);
            this.forEachNode(node.childNodes, callback);
        }
    }

    forNodeAtPath = (nodes: TreeNodeInfo[], path: NodePath, callback: (node: TreeNodeInfo) => void) => {
        callback(Tree.nodeFromPath(path, nodes));
    }

    treeExampleReducer = (state: TreeNodeInfo[], action: TreeAction) => {
        switch (action.type) {
            case "DESELECT_ALL":
                const newState1 = cloneDeep(state);
                this.forEachNode(newState1, node => (node.isSelected = false));
                return newState1;
            case "SET_IS_EXPANDED":
                const newState2 = cloneDeep(state);
                this.forNodeAtPath(newState2, action.payload.path, node => (node.isExpanded = action.payload.isExpanded));
                return newState2;
            case "SET_IS_SELECTED":
                const newState3 = cloneDeep(state);
                this.forNodeAtPath(newState3, action.payload.path, node => (node.isSelected = action.payload.isSelected));
                return newState3;
            default:
                return state;
        }
    }

    /**
     * 节点点击
     */
    handleNodeClick = (node: TreeNodeInfo, nodePath: NodePath, e: React.MouseEvent<HTMLElement>) => {
        console.log('handleNodeClick');
        const originallySelected = node.isSelected;

        let newState1: TreeNodeInfo[] = [];
        if (!e.shiftKey) {
            // 所有的节点取消设置
            newState1 = this.treeExampleReducer(this.state.nodes, { type: 'DESELECT_ALL' });
            //console.log('DESELECT_ALL', newState1);
            //this.setState({ nodes: newState1 });
        }

        //console.log(this.state.nodes);
        newState1 = this.treeExampleReducer(newState1, {
            payload: { path: nodePath, isSelected: originallySelected == null ? true : !originallySelected },
            type: "SET_IS_SELECTED",
        });
        //console.log('SET_IS_SELECTED', newState1);
        this.setState({ nodes: newState1 });

    }

    /**
     * 点击折叠
     */
    handleNodeCollapse = (_node: TreeNodeInfo, nodePath: NodePath) => {
        console.log('handleNodeCollapse', nodePath);

        const newState = this.treeExampleReducer(this.state.nodes, {
            payload: { path: nodePath, isExpanded: false },
            type: "SET_IS_EXPANDED",
        });
        this.setState({ nodes: newState });
    }

    /**
     * 点击展开
    */
    handleNodeExpand = (_node: TreeNodeInfo, nodePath: NodePath) => {
        console.log('handleNodeExpand', nodePath);

        const newState = this.treeExampleReducer(this.state.nodes, {
            payload: { path: nodePath, isExpanded: true },
            type: "SET_IS_EXPANDED",
        });
        this.setState({ nodes: newState });
    }

    render() {
        const html =
            <React.Fragment>
                <Tree
                    contents={this.state.nodes}
                    onNodeClick={this.handleNodeClick}
                    onNodeCollapse={this.handleNodeCollapse}
                    onNodeExpand={this.handleNodeExpand}
                    className={Classes.ELEVATION_0}
                />
            </React.Fragment>

        return html;
    }
}

export default NodeTree;

const INITIAL_STATE: TreeNodeInfo[] = [
    {
        id: 0,
        hasCaret: true,
        icon: "folder-close",
        label: <div draggable>aaa</div>,
    },
    {
        id: 1,
        icon: "folder-close",
        isExpanded: true,
        label: '',
        childNodes: [
            {
                id: 2,
                icon: "document",
                label: "Item 0",
                secondaryLabel: '',
            },
            {
                id: 3,
                icon: <Icon icon="tag" intent={Intent.PRIMARY} className={Classes.TREE_NODE_ICON} />,
                label: "Organic meditation gluten-free, sriracha VHS drinking vinegar beard man.",
            },
            {
                id: 4,
                hasCaret: true,
                icon: "folder-close",
                label: '',
                childNodes: [
                    { id: 5, label: "No-Icon Item" },
                    { id: 6, icon: "tag", label: "Item 1" },
                    {
                        id: 7,
                        hasCaret: true,
                        icon: "folder-close",
                        label: '',
                        childNodes: [
                            { id: 8, icon: "document", label: "Item 0" },
                            { id: 9, icon: "tag", label: "Item 1" },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        hasCaret: true,
        icon: "folder-close",
        label: "Super secret files",
        disabled: true,
    },
];