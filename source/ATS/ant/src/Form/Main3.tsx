import * as React from 'react';

import { ReactWidget, UseSignal } from '@jupyterlab/apputils';
import { ISignal, Signal } from '@lumino/signaling';
import { Widget } from '@lumino/widgets';

function MyComponent() {
    return <div>My Widget</div>;
}

function UseSignalComponent(props: { signal: ISignal<MyWidget, void> }) {
/*    return <UseSignal signal={props.signal}>{() => <MyComponent />}</UseSignal>;*/
    return <div></div>
}

class MyWidget extends ReactWidget {
    render() {
        return <UseSignalComponent signal={this._signal} />;
    }

    private _signal = new Signal<this, void>(this);
}

export default MyWidget

//const myWidget: Widget = ReactWidget.create(<MyComponent />);
//Widget.attach(myWidget, document.body);