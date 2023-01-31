/**
 * 节点右键菜单
 */
import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { DeleteOutlined, CopyOutlined, ScissorOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';
import { Card } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

interface NodeContextMenu {
    state: {}
}

class NodeContextMenu extends React.Component<any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    onClick = () => {
    }

    getItem = (label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group') => {

        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }

    render() {
        const items: MenuProps['items'] = [
            this.getItem('Navigation One', 'sub1', <MailOutlined />, [
                this.getItem('Item 1', 'g1', null, [this.getItem('Option 1', '1'), this.getItem('Option 2', '2')], 'group'),
                this.getItem('Item 2', 'g2', null, [this.getItem('Option 3', '3'), this.getItem('Option 4', '4')], 'group'),
            ]),

            this.getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
                this.getItem('Option 5', '5'),
                this.getItem('Option 6', '6'),
                this.getItem('Submenu', 'sub3', null, [this.getItem('Option 7', '7'), this.getItem('Option 8', '8')]),
            ]),

            { type: 'divider' },

            this.getItem('Navigation Three', 'sub4', <SettingOutlined />, [
                this.getItem('Option 9', '9'),
                this.getItem('Option 10', '10'),
                this.getItem('Option 11', '11'),
                this.getItem('Option 12', '12'),
            ]),

            this.getItem('Group', 'grp', null, [this.getItem('Option 13', '13'), this.getItem('Option 14', '14')], 'group'),
        ];

        const menu = <Menu
            onClick={this.onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />

        const card =
            this.props.open &&
            <Card hoverable
                style={{
                    position: 'absolute',
                    left: this.props.position.x,
                    top: this.props.position.y,
                    zIndex: 1000,
                }}>
                <p>
                    <Button type="dashed" icon={<ScissorOutlined />}> 剪切</Button>
                </p>
                <p>
                    <Button type="dashed" icon={<CopyOutlined />} >复制</Button>
                </p>
                <Button type="dashed" icon={<DeleteOutlined />} onClick={this.props.deleteNode}>删除</Button>
            </Card>

        const html =
            this.props.open &&
            <div style={{
                position: 'absolute',
                left: this.props.position.x,
                top: this.props.position.y,
                display: 'flex',
                flexDirection: 'column',
                zIndex: 1000,
                padding: 5,
                borderRadius: 3,
                border: 'solid 2px #ccc',
                backgroundColor: 'white',
            }}
                onMouseLeave={this.props.onMouseLeave}
            >
                <Button type="dashed" icon={<ScissorOutlined />}> 剪切</Button>
                <Button type="dashed" icon={<CopyOutlined />} >复制</Button>
                <Button type="dashed" icon={<DeleteOutlined />} onClick={this.props.deleteNode}>删除</Button>

            </div >

        return html;
    }
}

export default NodeContextMenu;