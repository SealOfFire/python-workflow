import React from 'react';
import DockLayout, { BoxData, PanelData, TabData, DividerBox, LayoutData } from 'rc-dock'
import "rc-dock/dist/rc-dock.css";
import FlowChart from './flowchart/FlowChart'
import { ReactFlowProvider } from 'reactflow';
import Parameters from './Parameters'
import NodeTree from './nodes/NodeTree3'
import { file } from '@babel/types';
/*import ComponentTree from './nodes/ComponentTree'*/

interface MoveLayout {
    state: {
        dockRef: any,
        layout: any,
        menuOpen: { [id: string]: boolean },
        anchorEl: null | HTMLElement
    }
}

const fileListTab: TabData = {
    id: 'files',
    title: '文件',
    closable: true,
    content:
        <div>
            文件
        </div>,
}

const layoutComponents: any = {
    id: 'components',
    title: '组件',
    content: <NodeTree />,
}
const layoutHistory: any = {
    id: 'history',
    title: '最近使用',
    content: <div>最近使用</div>,
}

const leftPanel: PanelData = {
    id: 'leftPanel',
    size: 200,
    tabs: [
        fileListTab,
        layoutComponents,
        layoutHistory]
}

const layoutAttribute: any = {
    id: 'attribute',
    title: '属性',
    content: <div>属性</div>,
}

const layoutParameter: any = {
    id: 'parameters',
    title: '变量',
    content: <Parameters />,
}

//const menuTabData: TabData = {
//    id: 'menuTabData',
//    title: '菜单',
//    content: <div>
//        <button onClick={this.saveLayout}>save</button>
//        <button onClick={this.loadLayout}>load</button>
//    </div>,
//}

//const menuPanel: PanelData = {
//    id: 'menuPanel',
//    size: 134,
//    minHeight: 50,
//    panelLock: { panelStyle: 'menu' },
//    tabs: [menuTabData]
//}

//const menuBox: BoxData = {
//    id: 'menuBox',
//    mode: 'horizontal',
//    children: [menuPanel]
//}

const mainBox: BoxData = {
    id: 'mainBox',
    mode: 'horizontal',
    children: [
        {
            id: 'leftBox',
            mode: 'vertical',
            size: 200,
            children: [leftPanel]
        },
        {
            id: 'editBox',
            mode: 'vertical',
            size: 1000,
            children: [
                {
                    id: 'edit',
                    tabs: [
                        {
                            id: 'defaultName',
                            title: 'default  name',
                            closable: true,
                            content: <FlowChart />
                        },
                        {
                            id: 'defaultName2',
                            title: 'default  name2',
                            closable: true,
                            content: <div>主窗口2</div>
                        },
                    ],
                },
                {
                    id: 'parameter',
                    tabs: [
                        layoutParameter,
                    ],
                }
            ],
            panelLock: { panelStyle: 'main' },
        },
        {
            id: 'parametersBox',
            size: 200,
            tabs: [layoutAttribute],
        }
    ],
}

const aaa = { dockbox: { mode: 'vertical', children: [/*menuBox, */mainBox] } }

class MoveLayout extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            dockRef: React.createRef(),
            layout: { dockbox: mainBox },
            menuOpen: { 'open': false },
            anchorEl: null,
        }
    }

    /**
     * 保存布局
    */
    saveLayout = () => {
        const value = this.state.dockRef.current.saveLayout();
        console.log(value);
        this.setState({ layout: value });
    }

    /**
     * 保存布局
     */
    loadLayout = () => {
        this.state.dockRef.current.loadLayout(this.state.layout);
    }

    /**
     * 拖拽创建组件
     */
    onDragStart = (nodeType: any, event: any) => {
        console.log('onDragStart', 'event', event);
        console.log('onDragStart', 'nodeType', nodeType);

        event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeType));
        event.dataTransfer.effectAllowed = 'move';
    }

    /**
     * 布局改变
     */
    onLayoutChange = (newLayout: any, currentTabId: any, direction: any) => {
        console.log(currentTabId, newLayout, direction);

        if (direction == 'remove') {
            alert('removal of this tab is rejected');
        }
        else {
            this.setState({ layout: newLayout });
        }
    }

    loadTab = (data: any) => {
        console.log('loadTab', data)
        let { id } = data;
        console.log(this.state.layout)

        

        return data
    };

    //menuHandleClose = (key: string) => {
    //    const menuOpen = { ...this.state.menuOpen }
    //    menuOpen[key] = false

    //    this.setState({ menuOpen: menuOpen, anchorEl: null })
    //}

    //handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //    console.log(this.state.anchorEl)
    //    const menuOpen = { ...this.state.menuOpen }
    //    menuOpen['open'] = true
    //    console.log(Boolean(this.state.anchorEl))
    //    this.setState({ menuOpen: menuOpen, anchorEl: event.currentTarget })
    //};

    /**
     * 显示文件窗口
     */
    showFile = () => {
        // 判断文件窗口是否关闭
        //this.state.layout?.dockbox.
        const layout = { ...this.state.layout }
        console.log('showFile layout', layout)
        const data = layout.dockbox.children[0]
        console.log('showFile data', data)
        for (let i = 0; i < data.tabs.length; i++) {
            const bb = data.tabs.filter((item: PanelData) => item.id == 'files')
            //console.log('showFile', bb);
            if (data.tabs.filter((item: PanelData) => item.id == 'files').length == 0) {
                console.log("添加files")
                data.tabs.push({ ...fileListTab })
                console.log(layout)
                this.setState({ layout: layout });
            }
        }

    }

    render() {

        const aaa: BoxData = {
            mode: 'vertical',
            children: [/*menuBox, */mainBox]
        }

        const html =
            <React.Fragment>
                <button onClick={this.showFile}>aaa</button>
                <ReactFlowProvider>
                    <DockLayout
                        layout={this.state.layout}
                        ref={this.state.dockRef}
                        defaultLayout={this.state.layout}
                        loadTab={this.loadTab}
                        onLayoutChange={this.onLayoutChange}
                        style={{ position: 'absolute', left: 5, top: 35, right: 5, bottom: 5 }}
                    />
                </ReactFlowProvider>
            </React.Fragment>
        return html
    }
}

export default MoveLayout;