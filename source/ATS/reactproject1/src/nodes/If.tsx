/**
 * 条件判断 if
 */

import React from 'react';
import { Handle, Position } from 'reactflow';

import './text-updater-node.css'

class If extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        const html =
            <div className="node-border">
                <div>
                    IF
                </div>
                <div>
                    TEST
                </div>
                <div>
                    BODY
                </div>
                <div>
                    OR ELSE
                </div>
                <Handle id="previous" type="target" position={Position.Left} style={{ top: 15, background: '#555' }} />
                <Handle id="next" type="source" position={Position.Right} style={{ top: 15, background: '#555' }} />
                <Handle id="test" type="target" position={Position.Left} style={{ top: 38, background: '#00ff00' }} />
                <Handle id="body" type="source" position={Position.Right} style={{ top: 60, background: '#555' }} />
                <Handle id="orelse" type="source" position={Position.Right} style={{ top: 80, background: '#555' }} />
            </div>

        return html
    }
}

export default If;