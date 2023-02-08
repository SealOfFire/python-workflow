/**
 * 全局数据
 */
import { useRef } from 'react'
import { Node, Edge, } from 'reactflow';
import { CustomNode } from '../nodes/INodeData'

/**
 * 整体数据格式
 */
export interface IMainData {
    files: IFileDataList,// 文件名:数据 组成的图形列表
}

export interface IFileDataList { [id: string]: IFileData }

export interface IFileData {
    fileName: string,
    path: string,
    type: 'folder' | 'flowchart' | 'json' | 'python', // 文件类型
    children?: IFileDataList // 类型为文件夹的时候，会有子文件,
    content?: string // 文件的内容
    nodes?: CustomNode[],
    edges?: Edge[],
    parameters: IParameterType[], // 变量列表.不同作用域可以同名，所以
}

/**
 * 变量数据格式
 */
export interface IParameterType {
    name: string,
    type?: 'string' | 'int' | 'dict',
    scope?: string | null
    value: string | null
}

export function findFileData(id: string, files: IFileDataList): IFileData | undefined {
    console.log('findFileData', id, files);
    for (let k in files) {
        console.log('findFileData', 'k', k);
        const key = files[k].path + files[k].fileName
        console.log('findFileData', '===', id, key);
        if (id === key) {
            console.log('findFileData', 'return', files[k]);
            return files[k]
        }
        findFileData(id, files[k].children!)
    }
}

//export function createFlowChartRef(ref: { [id: string]: React.RefObject<any> }, files: IFileDataList) {
//    console.log('createFlowChartRef', ref, files);
//    for (let k in files) {
//        console.log('createFlowChartRef', 'k', k);
//        const key = files[k].path + files[k].fileName
//        if (files[k].type === 'flowchart') {
//            ref[k] = useRef(null);
//        }
//        createFlowChartRef(ref, files[k].children!)
//    }
//}

export const sample: IMainData = {
    files: {
        "文件夹1": {
            fileName: '文件夹1',
            path: './',
            type: 'folder',
            parameters: [],
            children: {
                "文件2": {
                    fileName: '文件2',
                    path: './',
                    type: 'json',
                    parameters: []
                },
                "文件3": {
                    fileName: '文件3',
                    path: './',
                    type: 'json',
                    parameters: []
                },
                "文件夹2": {
                    fileName: '文件夹2',
                    path: './文件夹1',
                    type: 'folder',
                    parameters: [],
                    children: {
                        "文件4": {
                            fileName: '文件4',
                            path: './文件夹2',
                            type: 'json',
                            parameters: [],
                        },
                    }
                },
                "文件夹3": {
                    fileName: '文件夹3',
                    path: './文件夹1',
                    type: 'folder',
                    parameters: [],
                }
            }
        }
    }
}