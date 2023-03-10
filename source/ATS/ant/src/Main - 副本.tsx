import React from 'react';
import {
    Layout,
    Tabs,
    Drawer,
    Button,
    DatePicker,
    Space,
    version,
    Menu
} from "antd";
import NodeTree from './nodes/NodeTree2'
import FlowChart from './flowchart/FlowChart'
import NodeContextMenu from './flowchart/NodeContextMenu'
import { ReactFlowProvider } from 'reactflow';
import Parameters from './Parameters'
import LeftMenu from './LeftMenu'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 84,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 500,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#108ee9',
};

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#3ba0e9',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
};

interface Main {
    state: {
        opens: { [id: string]: boolean }, // 左侧多个抽屉开关控制
        flowChart: any
    }
}


class Main extends React.Component {
    constructor(props: any) {
        super(props);
        console.log("Main", props);

        this.state = {
            opens: {
                'top': false,
            }, // 左侧多个抽屉开关控制
            flowChart: React.createRef()
        };
    }

    showDrawer = (key: string) => {
        console.log("showDrawer:", key);
        const data = { ... this.state.opens };
        //for (let key in data) {
        //    data[key] = false;
        //}
        data[key] = true;
        this.setState({ opens: data });
    }

    onCollapse = (key: string) => {
        console.log("onCollapse:", key);
        const data = { ... this.state.opens };
        console.log("onCollapse:", data);

        data[key] = !data[key];
        this.setState({ opens: data });
    }

    onClose = (key: string) => {
        console.log("close:", key);
        const data = { ... this.state.opens };
        console.log("close:", data);
        //for (let key in data) {
        //    if (data[key] == true) {

        //    }
        //    data[key] = false;
        //}
        data[key] = false;
        this.setState({ opens: data });
    }

    onDragStart = (nodeType: any, event: any) => {
        console.log('onDragStart', 'event', event);
        console.log('onDragStart', 'nodeType', nodeType);

        event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeType));
        event.dataTransfer.effectAllowed = 'move';
    }

    save = () => {
        this.state.flowChart.current.save();
    }

    load = () => {
        this.state.flowChart.current.load();
    }

    onTopMenuClick = (e: any) => {
        console.log('onTopMenuClick ', e);

        switch (e.key) {
            case 'save':
                this.state.flowChart.current.save();
                break;
            case 'load':
                this.state.flowChart.current.load();
                break;
        }
    }

    render() {
        const topMenu: MenuProps['items'] = [
            {
                label: 'File',
                key: 'file',
                icon: <MailOutlined />,
                children: [
                    {
                        key: 'save',
                        label: 'Save',
                        icon: <SettingOutlined />,
                    },
                    {
                        key: 'load',
                        label: 'Load',
                        icon: <SettingOutlined />,
                    },
                ]
            },
        ]

        const html =
            <ReactFlowProvider>
                <Layout>
                    <Header>
                        <Menu mode="horizontal" items={topMenu} onClick={this.onTopMenuClick} />
                    </Header>
               
                    <Layout>
                        {/*右侧 -- start --*/}
                        <Sider collapsible collapsed={this.state.opens['Leftcollapsed']} onCollapse={this.onCollapse.bind(this, 'Leftcollapsed')}>
                            <Button type="primary" onClick={this.showDrawer.bind(this, "components")}>折叠</Button>
                            <Button type="primary" onClick={this.showDrawer.bind(this, "1")}>折叠</Button>
                            <LeftMenu />
                            <div style={{
                                backgroundColor: '#999999',
                                border: '1px solid #1a192b',
                                display: 'flex',
                                cursor: 'grab',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                                onDragStart={this.onDragStart.bind(this, { type: 'binOp', value: null })} draggable>input node</div>
                            Sider1
                            最近使用的组件列表
                        </Sider>
                        <Sider width={0}>
                            <Drawer
                                title="组件"
                                placement="left"
                                mask={false}
                                open={this.state.opens['components']}
                                onClose={this.onClose.bind(this, 'components')}
                                getContainer={false}
                                width={200}>
                                <NodeTree />
                            </Drawer>
                            <Drawer
                                title="Basic Drawer2"
                                placement="left"
                                mask={false}
                                open={this.state.opens['1']}
                                onClose={this.onClose.bind(this, '1')}
                                getContainer={false}
                                width={200}>
                                bbb
                            </Drawer>
                        </Sider>
                        {/*右侧 -- end --*/}
                        <Layout>
                            <Content>
                                <div style={{ height: '800px', width: '100%' }} >
                                    <FlowChart ref={this.state.flowChart} />
                                </div>
                            </Content>
                            <Footer style={{ position: 'relative', height: 0, padding: 0 }}>
                                
                            </Footer>
                            <Footer style={footerStyle}>
                                <Button type="primary" onClick={this.showDrawer.bind(this, 'log')}>日志</Button>
                                <Button type="primary" onClick={this.showDrawer.bind(this, 'variable')}>变量</Button>
                            </Footer>
                        </Layout>
                        {/*左侧 -- start -- */}
                        <Sider style={siderStyle} width={50}>
                            Sider
                        </Sider>
                        {/*左侧 -- end -- */}
                    </Layout>
                    <Drawer
                        title="日志"
                        placement="bottom"
                        mask={false}
                        open={this.state.opens['log']}
                        onClose={this.onClose.bind(this, 'log')}
                        getContainer={false}
                        height={300}>
                    </Drawer>
                    <Drawer
                        title="变量"
                        placement="bottom"
                        mask={false}
                        open={this.state.opens['variable']}
                        onClose={this.onClose.bind(this, 'variable')}
                        getContainer={false}
                        height={300}>
                        <Parameters />
                    </Drawer>
                </Layout>
                {/*<NodeContextMenu*/}
                {/*    open={this.state.openNodeContextMenu}*/}
                {/*    position={this.state.nodeContextMenuPosition}*/}
                {/*    node={this.state.selectedNode}*/}
                {/*    onMouseLeave={() => { this.setState({ openNodeContextMenu: false }); }}*/}
                {/*    deleteNode={this.deleteNodeByContextMenu.bind(this, this.state.selectedNode)}*/}
                {/*/>*/}
            </ReactFlowProvider>

        return html;
    }
}

export default Main;