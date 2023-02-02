import React from 'react';
import { Button, Menu, Input } from 'antd';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    HistoryOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

interface LeftMenu {
    state: {
        collapsed: boolean,
        items: MenuItem[],
    }
}

class LeftMenu extends React.Component<any> {
    constructor(props: any) {
        super(props);
        this.state = {
            collapsed: false,
            items: [
                {
                    key: 'components', icon: <PieChartOutlined />, label: 'COMPONENTS',
                },
                {
                    key: 'history', icon: <HistoryOutlined />, label: 'HISTORY',
                    children:
                        [
                            { key: '1', icon: <HistoryOutlined />, label: 'base node' },
                        ]
                },
            ]
        }
    }

    toggleCollapsed = () => {
        this.setState({ collapsed: !this.state.collapsed });
    }

    render() {
        const html = <React.Fragment>
            {/*<Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>*/}
            {/*    {this.state.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}*/}
            {/*</Button>*/}
            <Menu
                mode="inline"
            >
                <Menu.SubMenu key={'search'} title={'历史记录'} icon={<HistoryOutlined />}>
                    <Menu.Item key={3} icon={<HistoryOutlined />} draggable>aaa</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key={'1'} title={'组件'} icon={<PieChartOutlined />}>
                    <Menu.Item><Input /></Menu.Item>
                    <Menu.SubMenu key={'2'} title={'开始'} icon={<HistoryOutlined />} >
                        <Menu.Item key={3} icon={<HistoryOutlined />} draggable>aaa</Menu.Item>
                    </Menu.SubMenu>
                </Menu.SubMenu>
                <Menu.Item key={'parameters'} icon={<HistoryOutlined />} >变量</Menu.Item>
                <Menu.Item key={'log'} icon={<HistoryOutlined />} >日志</Menu.Item>
            </Menu>
        </React.Fragment>

        return html
    }
}

export default LeftMenu;