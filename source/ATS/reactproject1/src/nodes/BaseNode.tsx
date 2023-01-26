/**
 * 节点基类
 */

import React from 'react';
import { Handle, Position } from 'reactflow';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShareIcon from '@mui/icons-material/Share';
import StartIcon from '@mui/icons-material/Start';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { red } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Divider from '@mui/material/Divider';
import InputIcon from '@mui/icons-material/Input';

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

const ITEM_HEIGHT = 48;

interface BaseNode {
    state: {
        expanded: boolean
        anchorEl: any | null
        open: boolean,
    }
}

class BaseNode extends React.Component<any> {
    constructor(props: any) {
        super(props);
        this.state = {
            expanded: false,
            anchorEl: null,
            open: false,
        };
    }

    handleExpandClick = () => {
        console.log('handleExpandClick');
        this.setState({ expanded: !this.state.expanded });
    }

    handleClick = (event: React.MouseEvent<HTMLElement>) => {
        console.log('handleClick', event.currentTarget);
        this.setState({ anchorEl: event.currentTarget });
        this.setState({ open: true });
    }

    handleClose = () => {
        console.log('handleClose');
        this.setState({ anchorEl: null });
        console.log('handleClose');
        this.setState({ open: false });
    }

    cut = () => {
        console.log('cut');
        this.setState({ open: false });
    }

    copy = () => {
        console.log('copy');
        this.setState({ open: false });
    }

    delete = () => {
        console.log('delete');
        this.props.data.onDeleteNode(this.props.data.id);
        this.setState({ open: false });
    }
    render() {

        const items = this.props.parameters?.map((item: any) =>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <InputIcon />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                </ListItemButton>
            </ListItem>);

        const list = this.props.parameters === undefined ? "" : <List>{items}</List>

        console.log(list)

        const html =
            <Card sx={{ minWidth: 50 }}>
                <CardHeader
                    className="custom-drag-handle"
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            <StartIcon />
                        </Avatar>
                    }
                    action={
                        <div>
                            <IconButton
                                aria-label="settings"
                                aria-controls={this.state.open ? 'long-menu' : undefined}
                                aria-expanded={this.state.open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleClick}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu id="long-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                }}
                                anchorEl={this.state.anchorEl}
                                open={this.state.open}
                                onClose={this.handleClose}
                                PaperProps={{
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: '14ch',
                                    },
                                }}>
                                <MenuItem onClick={this.cut}>
                                    <ListItemIcon>
                                        <ContentCutIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Cut</ListItemText>
                                </MenuItem >
                                <MenuItem onClick={this.copy}>
                                    <ListItemIcon>
                                        <ContentCopyIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Copy</ListItemText>
                                </MenuItem >
                                <MenuItem onClick={this.delete}>
                                    <ListItemIcon>
                                        <DeleteOutlineIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Delete</ListItemText>
                                </MenuItem >
                            </Menu>
                        </div>
                    }
                    title={this.props.title}
                    subheader={this.props.subheader}
                />
                <CardContent>
                    {this.props.content}
                    {list}
                </CardContent>
                {/* 
                <CardActions disableSpacing>
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={this.state.expanded}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {this.props.expand}
                    </CardContent>
                </Collapse>
                */}
                {
                    this.props.hasPrevious &&
                    <Handle id="previous" type="target" position={Position.Left} style={{ background: '#555' }} />
                }
                {
                    this.props.hasNext &&
                    <Handle id="next" type="source" position={Position.Right} style={{ background: '#555' }} />
                }
                {this.props.handles}
            </Card>

        return html
    }

}

export default BaseNode;