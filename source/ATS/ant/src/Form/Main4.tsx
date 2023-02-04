import React from 'react';
import {
    Layout, Model,
    TabNode,
    IJsonModel,
    IJsonRowNode,
    IJsonTabNode,
    IJsonTabSetNode,
    IJsonBorderNode
} from "flexlayout-react";
import 'flexlayout-react/style/light.css'
import FlowChart from '../flowchart/FlowChart'
import NodeTree from '../nodes/NodeTree3'
import Parameters from '../Parameters'

function Main() {

    const filesTab: IJsonTabNode = {
        id: 'files',
        type: "tab",
        name: "文件",
        enableClose: false,
        component: "files"
    }

    const componentsTab: IJsonTabNode = {
        id: 'components',
        type: "tab",
        name: "组件",
        enableClose: false,
        component: "components"
    }

    const historyTab: IJsonTabNode = {
        id: 'history',
        type: "tab",
        name: "最近使用",
        enableClose: false,
        component: "history"
    }

    const parametersTab: IJsonTabNode = {
        id: 'parameters',
        type: "tab",
        name: "变量",
        enableClose: false,
        component: "parameters"
    }

    const consoleTab: IJsonTabNode = {
        id: 'console',
        type: "tab",
        name: "输出",
        enableClose: false,
        component: "console"
    }

    const propertyTab: IJsonTabNode = {
        id: 'property',
        type: "tab",
        name: "属性",
        enableClose: false,
        component: "property"
    }

    const mainTab1: IJsonTabNode = {
        id: '随机id',
        type: "tab",
        name: "流程图1",
        component: "FlowChart"
    }

    const mainTab2: IJsonTabNode = {
        id: '随机id2',
        type: "tab",
        name: "流程图2",
        component: "FlowChart"
    }

    const leftBorder: IJsonBorderNode = {
        type: "border",
        location: "left",
        selected: 0,
        children: [filesTab, componentsTab, historyTab]
    }

    const bottomBorder: IJsonBorderNode = {
        type: "border",
        location: "bottom",
        selected: 0,
        children: [parametersTab, consoleTab]
    }

    const rightBorder: IJsonBorderNode = {
        type: "border",
        location: "right",
        selected: 0,
        children: [propertyTab]
    }

    const mainTabSet: IJsonTabSetNode = {
        type: "tabset",
        /*maximized: true,*/
        children: [mainTab1, mainTab2]
    }

    const layoutData: IJsonRowNode = {
        id: 'layoutData',
        type: "row",
        weight: 100,
        children: [mainTabSet]
    }

    const modelData: IJsonModel = {
        global: {
            tabEnableFloat: true,
            tabSetEnableMaximize: true,
            tabSetMinWidth: 100,
            tabSetMinHeight: 100,
            borderMinSize: 100
        },
        borders: [leftBorder, rightBorder, bottomBorder],
        layout: layoutData
    }

    const [model, setModel] = React.useState(Model.fromJson(modelData));

    const factory = (node: any) => {
        var component = node.getComponent();
        switch (component) {
            case "files":
                return <div>文件</div>
            case "components":
                return <NodeTree />
            case "history":
                return <div>最近使用</div>
            case "console":
                return <div>输出</div>
            case "parameters":
                return <Parameters />
            case "FlowChart":
                return <FlowChart />
        }
    }

    return (<Layout model={model} factory={factory} />);
}

export default Main;