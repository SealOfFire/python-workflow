import React, { useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Handle, Position } from 'reactflow';
import Avatar from '@mui/material/Avatar';
import StartIcon from '@mui/icons-material/Start';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function BaseNode(props: any) {
    console.log('BaseNode', props);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const cardRef = useRef(null);

    let refs: Array<any> = []
    let handleRefs: Array<any> = []
    if (props.parameters) {
        refs = props.parameters.map(() => {
            return React.createRef()
        });

        handleRefs = props.parameters.map(() => {
            return React.createRef()
        });
    }

    const gridStyle: React.CSSProperties = {
        width: '100%',
        textAlign: 'center',
        /*height: '80',*/
        padding: 5,
        //alignItems: 'center',
        //flexWrap: 'wrap',
        //display: 'flex',
        //border: 'solid 1px #ccc',
        //borderTop:'0px',
        //border: '1px dashed grey'
    };

    const parameters = props.parameters?.map((item: any, index: number) =>
        <>
            <Box key={index} ref={refs[index]} style={gridStyle}>
                {item['title']}
                <IconButton onClick={() => props.minus(index)} className="nodrag">
                    <RemoveCircleOutlineIcon />
                </IconButton>
            </Box>
            <Divider />
        </>);

    const parametersHandles = props.parameters?.map((item: any, index: number) =>
        <Handle
            key={index}
            id={item['id']}
            type={item['type']}
            position={item['type'] == 'target' ? Position.Left : Position.Right}
            style={{ top: 70, background: '#00ff00' }}
            ref={handleRefs[index]} />
    );

    const onDelete = () => {
        console.log('BaseNode', 'delete1', props.data.id);
        //console.log('BaseNode', 'delete2', props.data.flowChartRef.getNodes());
        //const node = props.data.flowChartRef.getNode(props.data.id)
        //console.log('BaseNode', 'delete3', node
        //props.data.flowChartRef.deleteElements({ nodes: [node] });
        //console.log('BaseNode', 'delete4', props.data.flowChartRef.getNodes());

        props.data.onDeleteNode(props.data);

        handleClose();
    }

    useEffect(() => {
        console.log('BaseNode', 'useEffect');

        //const className = cardRef.current.children[0].getAttribute('class') + " custom-drag-handle"
        //cardRef.current.children[0].setAttribute('class', className)

        console.log('BaseNode', 'refs', refs);
        console.log('BaseNode', 'handleRefs', handleRefs);
        handleRefs.map((item: any, index: number) => {
            if (item.current !== null) {
                console.log('BaseNode', 'item', item);
                console.log('BaseNode', 'top2', item.current.style.top);
                const top = refs[index].current.offsetTop + refs[index].current.offsetHeight / 2
                console.log('BaseNode', 'top', top);
                item.current.setAttribute('style', `top: ${top}px; background: #00ff00;`)
                console.log('BaseNode', 'top3', item.current.style.top);
            }
        });
    })

    return (
        <>
            <Card elevation={12} ref={cardRef} sx={{ width: 200 }}>
                <CardHeader
                    sx={{ backgroundColor: '#FAE7E3' }}
                    avatar={
                        <Avatar>
                            <StartIcon />
                        </Avatar>}
                    action={
                        <IconButton aria-label="settings" size="small" onClick={handleClick} className="nodrag">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={props.title}
                    subheader={props.subheader}
                />
                {
                    props.content &&
                    <CardContent>
                        {props.content}
                    </CardContent>
                }
                {
                    props.parameters &&
                    <CardContent>
                        {parameters}
                    </CardContent>
                }

                {
                    props.hasPrevious &&
                    <Handle id="previous" type="target" position={Position.Left} style={{ top: 36 }} />
                }
                {
                    props.hasNext &&
                    <Handle id="next" type="source" position={Position.Right} style={{ top: 36 }} />
                }
                {parametersHandles}
                {/*<CardActions disableSpacing>*/}
                {/*    <ExpandMore*/}
                {/*        expand={expanded}*/}
                {/*        onClick={handleExpandClick}*/}
                {/*        aria-expanded={expanded}*/}
                {/*        aria-label="show more"*/}
                {/*        className="nodrag"*/}
                {/*    >*/}
                {/*        <ExpandMoreIcon />*/}
                {/*    </ExpandMore>*/}
                {/*</CardActions>*/}
                {/*<Collapse in={expanded} timeout="auto" unmountOnExit>*/}
                {/*    <CardContent>*/}
                {/*        <IconButton size="small" className="nodrag">*/}
                {/*            <DeleteForeverIcon />*/}
                {/*        </IconButton>*/}
                {/*    </CardContent>*/}
                {/*</Collapse>*/}
            </Card>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {/*<MenuItem onClick={handleClose}>*/}
                {/*    <ListItemIcon>*/}
                {/*        <ContentCopyIcon />*/}
                {/*    </ListItemIcon>*/}
                {/*    折叠*/}
                {/*</MenuItem>*/}
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <ContentCopyIcon />
                    </ListItemIcon>
                    复制
                </MenuItem>
                <MenuItem onClick={handleClose} >
                    <ListItemIcon>
                        <ContentCutIcon />
                    </ListItemIcon>
                    剪切
                </MenuItem>
                <MenuItem onClick={onDelete}>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    删除
                </MenuItem>
            </Menu>
        </>
    );
}

export default BaseNode;