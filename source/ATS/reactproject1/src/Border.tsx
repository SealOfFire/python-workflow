import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Container from '@mui/material/Container';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import HomeIcon from '@mui/icons-material/Home';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
/*import Link from '@mui/material/Link';*/
import Button from '@mui/material/Button';

// 图表组件
import FlowChart from './FlowChart'

// 路由设置 --------------------------------------------------------
import { createRoot } from "react-dom/client";
import { StaticRouter } from 'react-router-dom/server';
import {
    BrowserRouter,
    createBrowserRouter,
    RouterProvider,
    Route,
    Routes,
    Link as RouterLink,
    LinkProps as RouterLinkProps,
    MemoryRouter,
    useLocation,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/1",
        element: (
            <div>aaaaa
                {/*<h1>Hello World</h1>*/}
                {/*<Link to="flow-chart">flow chart</Link>*/}
                {/*<br></br>*/}
                {/*<Link to="about">About Us</Link>*/}
            </div>
        ),
    },
    {
        path: "/",
        element: <FlowChart></FlowChart>,
    },
    {
        path: "about",
        element: <div>About</div>,
    },
    {
        path: "flow-chart",
        element: <FlowChart></FlowChart>,
    },
]);

function Router(props: { children?: React.ReactNode }) {
    const { children } = props;
    if (typeof window === 'undefined') {
        return <StaticRouter location="/">{children}</StaticRouter>;
    }

    return <MemoryRouter>{children}</MemoryRouter>;
}

const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
    itemProps,
    ref,
) {
    return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});
// 路由设置 --------------------------------------------------------

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);


interface Border {
    state: {
        mdTheme: any,
        open: boolean
    }
}

class Border extends React.Component<any> {
    constructor(props: any) {
        super(props);
        console.log("Border", props);
        this.state = {
            mdTheme: createTheme(),
            open: true
        };
    }

    toggleDrawer = () => {
        this.setState({ open: !this.state.open });
    }

    render() {
        const html =
            <ThemeProvider theme={this.state.mdTheme}>
                <Router>
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        <AppBar position="absolute" open={this.state.open}>
                            <Toolbar
                                sx={{
                                    pr: '24px', // keep right padding when drawer closed
                                }}
                            >
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={this.toggleDrawer}
                                    sx={{
                                        marginRight: '36px',
                                        ...(this.state.open && { display: 'none' }),
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography
                                    component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    sx={{ flexGrow: 1 }}
                                >
                                    Flow Chart
                                </Typography>
                                <IconButton color="inherit">
                                    <Badge badgeContent={4} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <Drawer variant="permanent" open={this.state.open}>
                            <Toolbar
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    px: [1],
                                }}
                            >
                                <IconButton onClick={this.toggleDrawer}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </Toolbar>
                            <Divider />
                            <List component="nav">
                                <ListItemButton component={RouterLink} to='/'>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to='/flow-chart'>
                                    <ListItemIcon>
                                        <AccountTreeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Flow Chart" />
                                </ListItemButton>
                                <Divider sx={{ my: 1 }} />
                                {/*{secondaryListItems}*/}
                            </List>
                        </Drawer>
                        <Box
                            component="main"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? theme.palette.grey[100]
                                        : theme.palette.grey[900],
                                flexGrow: 1,
                                height: '100vh',
                                overflow: 'auto',
                            }}
                        >
                            <Toolbar />
                            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                                <Routes>
                                    <Route path="/" element={<div>home</div>} />
                                    <Route path="/about" element={<div>about</div>} />
                                    <Route path="/flow-chart" element={<FlowChart></FlowChart>} />
                                </Routes>
                            </Container>
                        </Box>
                    </Box>
                </Router>
            </ThemeProvider>

        return html
    }
}

export default Border;