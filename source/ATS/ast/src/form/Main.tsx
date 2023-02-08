import React, { useRef, useState } from 'react';
import {
    Layout, Model,
    IJsonTabNode,
    IJsonTabSetNode,
    Action
} from "flexlayout-react";
import 'flexlayout-react/style/light.css'
//import { useNodesState, useEdgesState, ReactFlowProvider, Edge } from 'reactflow';
import { IMainData, IParameterType, IFileData, findFileData } from './IMainData'
import { CustomNode } from '../nodes/INodeData'
import FlowChart from '../flowchart/FlowChart'
import NodeTree from '../nodes/NodeTree'
import Parameters from '../components/Parameters'
import FilesTree from '../components/FilesTree'
import { /*Node,*/ Edge, } from 'reactflow';
import { modelData, mainTabSet } from './initLayout'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';

function Main() {
    //const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode[]>([]);
    //const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
    //const parametersRef = useRef(null);
    const layoutRef: React.RefObject<Layout> = useRef(null);
    const [model, setModel] = React.useState(Model.fromJson(modelData));
    const flowChartRef: { [id: string]: any } = {}
    const [callSave, setCallSave] = useState(false)

    // 流程数据
    const [data, setData] = useState<IMainData>({
        files: {
            "流程1.ast": {
                fileName: '流程1.ast',
                path: './',
                type: 'flowchart',
                nodes: [],
                edges: [],
                parameters: []
            },
            "流程2.ast": {
                fileName: '流程2.ast',
                path: './',
                type: 'flowchart',
                nodes: [],
                edges: [],
                parameters: []
            }
        }
    })

    // 从流程数据中提取第一个作为显示用数据
    const [fileData, setFileData] = useState<IFileData>({
        fileName: '流程1.ast',
        path: './',
        type: 'flowchart',
        nodes: [],
        edges: [],
        parameters: []
    })

    const initMainTabs = (data: IMainData): IJsonTabNode[] => {
        const result: IJsonTabNode[] = [];

        const files = data.files;
        for (let k in files) {
            if (files[k].type === 'flowchart') {
                // 处理流程图
                result.push(
                    {
                        id: files[k].path + files[k].fileName,
                        type: "tab",
                        name: files[k].fileName,
                        enableClose: true,
                        component: "FlowChart"
                    });
            }
        }

        return result;
    }

    mainTabSet.children = initMainTabs(data);

    //createFlowChartRef(flowChartFef, data.files)
    //console.log('Main', createFlowChartRef, flowChartFef);

    /**
     * 切换主页面的显示
     */
    const showMain = (id: string) => {
        console.log('showMain', id);

        const node = model.getNodeById(id)
        console.log('showMain', node)

        if (node === undefined) {
            // 创建窗口
        }
        else {
            // 切换选中的窗口

        }
    }

    /**
     * 双击流程图时，打卡流程，或者切换流程
     */
    const showFlowChart = (id: string) => {
        console.log('showFlowChart', 'showFlowChart', id)

        const findData = findFileData(id, data.files)

        const node = model.getNodeById(id)
        console.log('showFlowChart', node)
        if (node === undefined) {
            // 创建窗口
            (layoutRef!.current!).addTabToActiveTabSet({
                id: findData!.path + findData!.fileName,
                name: findData!.fileName,
                enableClose: true,
                component: "FlowChart"
            })
        }
        else {
            // 切换选中的窗口
            // node._parent
            console.log('showFlowChart', 'model', model);
            const json = model.toJson();
            console.log('showFlowChart', 'json', json);
            const tabSet: IJsonTabSetNode = json.layout.children[0] as IJsonTabSetNode
            console.log('showFlowChart', 'json2', json);
            // 查找名称在当前索引的位置
            let i = 0
            for (i = 0; i < tabSet.children.length; i++) {
                //console.log('showFlowChart', tabSet.children[i])
                if (tabSet.children[i].id === id) {
                    break;
                }
            }
            console.log('showFlowChart', 'i', i)
            tabSet.selected = i;

            setModel(Model.fromJson(json))
        }

        changeParamter(id, findData!.parameters)
    }

    /**
     * 修改节点
     */
    const changeNodes = (id: string, nodes: CustomNode[]) => {

        console.log('Main', 'changeNodes', data)
        const changeData = { ...data }

        const data1 = findFileData(id, changeData.files)
        if (data1 !== undefined) {
            data1.nodes = nodes;
            setData(changeData)
        }

        console.log('Main', 'changeNodes', data)
    }

    /**
     * 获取节点
     */
    const getNodes = (id: string) => {
        console.log('main', 'getNodes', id)
        const data1 = findFileData(id, data.files)
        return data1?.nodes;
    }

    /**
     * 修改连线
     */
    const changeEdges = (id: string, edges: Edge[]) => {
        const changeData = { ...data }

        const data1 = findFileData(id, changeData.files)
        if (data1 !== undefined) {
            data1.edges = edges;
            setData(changeData)
        }

        console.log('changeEdges', data)
    }

    /**
     * 修改变量
     */
    const changeParamter = (id: string, paramters: IParameterType[]) => {
        console.log('main', 'changeParamter', id, paramters)

        const changeData = { ...data }
        const data1 = findFileData(id, changeData.files)
        console.log('main', 'changeParamter', data1)
        if (data1 !== undefined) {
            data1.parameters = paramters;
            setData(changeData)
        }

        const data2 = findFileData(id, changeData.files)
        if (data2 !== undefined) {
            data2.parameters = paramters;
            setFileData(data2)
        }

        // setFileData(fileData)
    }

    const factory = (node: any) => {
        //console.log('factory', node);
        var component = node.getComponent();
        switch (component) {
            case "files":
                return <FilesTree data={data} showMain={showMain} showFlowChart={showFlowChart} />
            case "components":
                return <NodeTree />
            case "history":
                return <div>最近使用</div>
            case "console":
                return <div>输出</div>
            case "parameters":
                return <Parameters data={fileData}
                    onChangeParamters={(id: string, paramters: IParameterType[]) => changeParamter(id, paramters)} />
            case "FlowChart":
                console.log("Main", "factory", "FlowChart")
                return <FlowChart data={findFileData(node.getId(), data.files)}
                    changeNodes={(id: string, nodes: CustomNode[]) => changeNodes(id, nodes)}
                    changeEdges={(id: string, edges: Edge[]) => changeEdges(id, edges)}
                    getNodes={(id: string) => getNodes(id)}
                    callSave={callSave} changeSave={changeSave}
                //onRef={(item: any) => flowChartRef[node.getId()] = item}
                />
        }
    }

    const onAction = (action: Action) => {
        console.log('action', action);

        if (action.type === "FlexLayout_DeleteTab") {
            // todo 删除tab
            // action.data
        } else if (action.type === "FlexLayout_SelectTab") {
            const node = findFileData(action.data.tabNode, data.files)
            if (node === undefined) {
                console.log('action', '不是流程图')
            }
            else {
                console.log('action', '设置变量', node)
                const key = node.path + node.fileName
                const fileData = findFileData(key, data.files)
                console.log('action', 'fileData', fileData)
                if (fileData !== undefined) {
                    setFileData(fileData)
                }
                // parametersRef.current.showData(fileData)
                //const data = findFileData(node, data.files) 
            }
        }

        return action
    }

    const save = (event: any) => {
        console.log('main', 'save');
        // 保存所有打开的文档
        console.log(flowChartRef)
        setCallSave(true);
    }

    const exportData = () => {
        console.log('main', 'exportData', data);

        // create file in browser
        const fileName = "flowChart";
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);

        // create "a" HTLM element with href to file
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }

    const changeSave = () => {
        setCallSave(false);
    }

    return (
        <>
            <Layout
                ref={layoutRef}
                model={model}
                factory={factory}
                onAction={onAction}
            />
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 20, right: 20 }}
                icon={<SpeedDialIcon />}
            >
                <SpeedDialAction icon={<SaveIcon />} tooltipTitle={'保存'} onClick={save} />
                <SpeedDialAction icon={<PlayArrowIcon />} tooltipTitle='运行' />
                <SpeedDialAction icon={<DownloadIcon />} tooltipTitle='导出文件' onClick={exportData} />
            </SpeedDial>
        </>
    );
}

export default Main;