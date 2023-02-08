import {
    IJsonModel,
    IJsonRowNode,
    IJsonTabNode,
    IJsonTabSetNode,
    IJsonBorderNode,
} from "flexlayout-react";

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
    children: [consoleTab, parametersTab]
}

const rightBorder: IJsonBorderNode = {
    type: "border",
    location: "right",
    selected: 0,
    children: [propertyTab]
}

export const mainTabSet: IJsonTabSetNode = {
    id: 'mainTabSet',
    type: "tabset",
    /*maximized: true,*/
    children: []
}

const layoutData: IJsonRowNode = {
    id: 'layoutData',
    type: "row",
    weight: 100,
    children: [mainTabSet]
}

export const modelData: IJsonModel = {
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