import React from 'react';
import { Handle, Position } from 'reactflow';

import './text-updater-node.css'

class Add extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        const html =
            <div className="node-border">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={1}>ADD</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>RIGHT</td>
                            {/*<td rowSpan={2} style={{ textAlign: 'center' }}>RESULT</td>*/}
                        </tr>
                        <tr>
                            <td>LEFT</td>
                        </tr>
                    </tbody>
                </table>
                <Handle id="previous" type="target" position={Position.Left} style={{ top: 18, background: '#555' }} />
                <Handle id="next" type="source" position={Position.Right} style={{ top: 18, background: '#555' }} />
                <Handle id="left" type="target" position={Position.Left} style={{ top: 45, background: '#00ff00' }} />
                <Handle id="right" type="target" position={Position.Left} style={{ top: 70, background: '#00ff00' }} />
                {/*<Handle id="result" type="source" position={Position.Right} style={{ top: 60, background: '#00ff00' }} />*/}
            </div>

        return html
    }
}

export default Add;