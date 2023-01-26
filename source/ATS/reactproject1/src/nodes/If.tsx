/**
 * 条件判断 if
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
import AppsIcon from '@mui/icons-material/Apps';
import Divider from '@mui/material/Divider';

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

interface If {
    state: {
        expanded: boolean
        anchorEl: any | null
        open: boolean,
    }
}

class If extends React.Component<any> {
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
                        <AppsIcon />
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
                    title="IF"
                    subheader="条件判断" />
                <CardContent>
                    <Typography variant="body2">
                        TEST
                    </Typography>
                    <Divider />
                    <Typography variant="body2">
                        BODY
                    </Typography>
                    <Divider />
                    <Typography variant="body2">
                        OR ELSE
                    </Typography>
                </CardContent>
                <Handle id="previous" type="target" position={Position.Left} style={{ top: 30, background: '#555' }} />
                <Handle id="next" type="source" position={Position.Right} style={{ top: 30, background: '#555' }} />
                <Handle id="test" type="target" position={Position.Left} style={{ top: 100, background: '#00ff00' }} />
                <Handle id="body" type="source" position={Position.Right} style={{ top: 120, background: '#555' }} />
                <Handle id="orelse" type="source" position={Position.Right} style={{ top: 140, background: '#555' }} />
            </Card>
        //<div className="node-border">
        //    <div>
        //        IF
        //    </div>
        //    <div>
        //        TEST
        //    </div>
        //    <div>
        //        BODY
        //    </div>
        //    <div>
        //        OR ELSE
        //    </div>

        //</div>

        return html
    }
}

export default If;