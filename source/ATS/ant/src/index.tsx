import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Main from './Main';
import reportWebVitals from './reportWebVitals';
//import { TreeExample } from './nodes/NodeTree'
import MoveLayout from './MoveLayout';
import MainForm from './MainForm';
import NodeTree from './nodes/NodeTree3'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(<MoveLayout />)
//root.render(
//    <React.StrictMode>
//        {/*<TreeExample id={'ddd'} />*/}
//        < Main />
//    </React.StrictMode>
//);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
