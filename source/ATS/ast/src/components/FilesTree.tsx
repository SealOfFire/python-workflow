import React from 'react';
import { IMainData, IFileDataList, sample } from '../form/IMainData'
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import IconButton from '@mui/material/IconButton';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

function FilesTree(props: any) {
    // console.log(props.data.files)

    const init = (files: IFileDataList): any => {
        const resultFolder: any = [];
        const resultFile: any = [];

        for (let k in files) {
            const key = files[k].path + files[k].fileName
            if (files[k].type == 'folder') {
                resultFolder.push(
                    <TreeItem key={key} nodeId={key} label={files[k].fileName}>
                        {init(files[k].children!)}
                    </TreeItem>
                )
            }
            else {
                resultFile.push(<TreeItem key={key}
                    nodeId={key} label={files[k].fileName}
                    onDoubleClick={() => props.showFlowChart(key)} />)
            }
        }

        // 排序

        return [...resultFolder, ...resultFile];
    }

    const onNodeFocus = (event: React.SyntheticEvent, value: string) => {
        console.log('onNodeFocus', value);
    }

    const onNodeSelect = (event: React.SyntheticEvent, nodeIds: Array<string> | string) => {
        console.log('onNodeSelect', nodeIds);
        // 切换流程图的显示
        //props.showMain(nodeIds)
    }

    return (
        <>
            <IconButton aria-label="新建文件夹">
                <CreateNewFolderIcon />
            </IconButton>
            <IconButton aria-label="新建流程文件">
                <NoteAddIcon />
            </IconButton>
            <TreeView
                onNodeFocus={onNodeFocus}
                onNodeSelect={onNodeSelect}
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: '100%', flexGrow: 1, overflowY: 'auto' }}
            >
                {init(props.data.files)}
                {/*{init(sample.files)}*/}
            </TreeView>
        </>
    );
}

export default FilesTree;