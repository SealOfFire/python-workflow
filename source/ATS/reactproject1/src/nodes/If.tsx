/**
 * 条件判断 if
 */

import React from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from './BaseNode'


class If extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }


    render() {

        const handles =
            <div>
                <Handle id="test" type="target" position={Position.Left} style={{ top: 120, background: '#00ff00' }} />
                <Handle id="body" type="source" position={Position.Right} style={{ top: 167, background: '#555' }} />
                <Handle id="orelse" type="source" position={Position.Right} style={{ top: 215, background: '#555' }} />
            </div>

        const html = <BaseNode
            data={this.props.data}
            title="IF"
            hasPrevious={true}
            hasNext={true}
            subheader="条件判断语句"
            handles={handles}
            parameters={["TEST", "BODY", "OR ELSE"]}
        />

        //<Handle id="previous" type="target" position={Position.Left} style={{ top: 30, background: '#555' }} />
        //<Handle id="next" type="source" position={Position.Right} style={{ top: 30, background: '#555' }} />
        //<Handle id="test" type="target" position={Position.Left} style={{ top: 100, background: '#00ff00' }} />
        //<Handle id="body" type="source" position={Position.Right} style={{ top: 120, background: '#555' }} />
        //<Handle id="orelse" type="source" position={Position.Right} style={{ top: 140, background: '#555' }} />


        return html
    }
}

export default If;