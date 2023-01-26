import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FlowChart from './FlowChart'
import Border from './Border'

// react router --------------------------------------------------------------------
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
// react router --------------------------------------------------------------------

// react router
//const router = createBrowserRouter([
//    {
//        path: "/1",
//        element: (
//            <div>
//                <h1>Hello World</h1>
//                <Link to="flow-chart">flow chart</Link>
//                <br></br>
//                <Link to="about">About Us</Link>
//            </div>
//        ),
//    },
//    {
//        path: "/",
//        element: <Border></Border>,
//    },
//    {
//        path: "about",
//        element: <div>About</div>,
//    },
//    {
//        path: "flow-chart",
//        element: <FlowChart></FlowChart>,
//    },
//]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        {/*<App />*/}
        {/*<FlowChart></FlowChart>*/}
        {/*<RouterProvider router={router} />*/}
        {/*<Container fixed style={{ background: 'red' }}>*/}
        {/*    <BottomNavigation showLabels >*/}
        {/*        <BottomNavigationAction label="home" href="/" />*/}
        {/*        <BottomNavigationAction label="flow chart" href="/flow-chart" />*/}
        {/*        <BottomNavigationAction label="main" href="/main" />*/}
        {/*    </BottomNavigation>*/}
        {/*    <RouterProvider router={router} />*/}
        {/*</Container>*/}
        <Border></Border>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
