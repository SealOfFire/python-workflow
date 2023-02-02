import React from 'react';
import DockLayout, { BoxData, PanelData, TabData, DividerBox } from 'rc-dock'
import "rc-dock/dist/rc-dock.css";
import FlowChart from './flowchart/FlowChart'
import { ReactFlowProvider } from 'reactflow';
import Parameters from './Parameters'
import NodeTree from './nodes/NodeTree3'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface MoveLayout {
    state: {
        dockRef: any,
        layout: any,
    }
}

class MoveLayout extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            dockRef: React.createRef(),
            layout: null,
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

    render() {
        const fileListTab: TabData = {
            id: 'file_list',
            title: '文件',
            content:
                <div>
                </div>,
        }

        const layoutComponents: any = {
            id: 'components',
            title: '组件',
            content:<NodeTree />,
        }
        const layoutHistory: any = {
            id: 'history',
            title: '最近使用',
            content: <div>最近使用</div>,
        }

        const layoutLeftMenu: any = {
            mode: 'vertical',
            size: 200,
            children: [{
                tabs: [
                    fileListTab,
                    layoutComponents,
                    layoutHistory]
            }]
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


        const menuTabData: TabData = {
            id: 'menuTabData',
            title: '菜单',
            content: <div>
                <button onClick={this.saveLayout}>save</button>
                <button onClick={this.loadLayout}>load</button>
            </div>,
        }

        const menuPanel: PanelData = {
            id: 'menuPanel',
            size: 134,
            minHeight: 50,
            panelLock: { panelStyle: 'menu' },
            tabs: [menuTabData]
        }

        const menuBox: BoxData = {
            id: 'menuBox',
            mode: 'horizontal',
            children: [menuPanel]
        }

        const mainBox: BoxData = {
            id: 'mainBox',
            mode: 'horizontal',
            children: [
                {
                    mode: 'vertical',
                    size: 200,
                    children: [layoutLeftMenu]
                },
                {
                    mode: 'vertical',
                    size: 1000,
                    children: [
                        {
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
                            tabs: [
                                layoutParameter,
                            ],
                        }
                    ],
                    panelLock: { panelStyle: 'main' },
                },
                {
                    size: 200,
                    tabs: [layoutAttribute],
                }
            ],
        }

        const aaa: BoxData = {
            mode: 'vertical',
            children: [/*menuBox, */mainBox]
        }

        const html =
            <ReactFlowProvider>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <DockLayout
                    ref={this.state.dockRef}
                    defaultLayout={{ dockbox: aaa }}
                    style={{ position: 'absolute', left: 10, top: 65, right: 10, bottom: 10 }}
                />
            </ReactFlowProvider>

        return html
    }
}

export default MoveLayout;