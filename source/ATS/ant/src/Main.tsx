import React from 'react';
import {
    Layout,
    Tabs,
    Drawer,
    Button,
    DatePicker,
    Space,
    version,
    Menu,
    Breadcrumb
} from "antd";
import NodeTree from './nodes/NodeTree2'
import FlowChart from './flowchart/FlowChart'
import NodeContextMenu from './flowchart/NodeContextMenu'
import { ReactFlowProvider } from 'reactflow';
import Parameters from './Parameters'
import LeftMenu from './LeftMenu'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
//import { restHeight} from '@/pages/constant'

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
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Layout>
                            <Sider collapsible collapsed={this.state.opens['Leftcollapsed']} onCollapse={this.onCollapse.bind(this, 'Leftcollapsed')}>
                                <LeftMenu />
                            </Sider>
                            <Content style={{
                                padding: '0 24px',
                                minHeight: 800,
                                overflow: "auto",
                                backgroundColor: '#888888'
                            }}>
                                <FlowChart ref={this.state.flowChart} />
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
                </Layout>
            </ReactFlowProvider>

        return html;
    }
}

export default Main;