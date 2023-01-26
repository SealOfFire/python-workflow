/**
 * 开始节点
 */

import React from 'react';
import { Handle, Position } from 'reactflow';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShareIcon from '@mui/icons-material/Share';
import StartIcon from '@mui/icons-material/Start';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ListItemIcon from '@mui/material/ListItemIcon';
import { red } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

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


interface Start {
    state: {
        expanded: boolean
        anchorEl: any | null
        open: boolean,
    }
}

class Start extends React.Component<any> {
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
        const html =
            <Card sx={{ minWidth: 50 }}>
                <CardHeader avatar={
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
                    title="START"
                    subheader="开始节点" />
                <CardContent></CardContent>
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
                        展开内容
                    </CardContent>
                </Collapse>
                <Handle id="next" type="source" position={Position.Right} style={{ background: '#555' }} />
            </Card>

        return html
    }
}

export default Start;