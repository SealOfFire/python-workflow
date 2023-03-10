import * as React from 'react';
import * as ReactDOM from 'react-dom';
import JqxDockingLayout, { IDockingLayoutProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxdockinglayout';
import JqxTree from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtree';
class App extends React.PureComponent<{}, IDockingLayoutProps> {
    constructor(props: {}) {
        super(props);
        const layout: IDockingLayoutProps['layout'] = [
            {
                items: [{
                    alignment: 'left',
                    items: [{
                        contentContainer: 'ToolboxPanel',
                        title: 'Toolbox',
                        type: 'layoutPanel'
                    }, {
                        contentContainer: 'HelpPanel',
                        title: 'Help',
                        type: 'layoutPanel'
                    }],
                    type: 'autoHideGroup',
                    unpinnedWidth: 200,
                    width: 80
                },
                {
                    items: [{
                        height: 400,
                        items: [{
                            contentContainer: 'Document1Panel',
                            title: 'Document 1',
                            type: 'documentPanel',
                        },
                        {
                            contentContainer: 'Document2Panel',
                            title: 'Document 2',
                            type: 'documentPanel'
                        }],
                        minHeight: 200,
                        type: 'documentGroup'
                    },
                    {
                        height: 200,
                        items: [{
                            contentContainer: 'ErrorListPanel',
                            title: 'Error List',
                            type: 'layoutPanel'
                        }],
                        pinnedHeight: 30,
                        type: 'tabbedGroup'
                    }],
                    orientation: 'vertical',
                    type: 'layoutGroup',
                    width: 800
                },
                {
                    items: [
                        {
                            contentContainer: 'SolutionExplorerPanel',
                            initContent: () => {
                                // initialize a jqxTree inside the Solution Explorer Panel
                                const source = [{
                                    expanded: true,
                                    icon: './../images/earth.png',
                                    items: [
                                        {
                                            expanded: true,
                                            icon: './../images/folder.png',
                                            items: [{
                                                icon: './../images/nav1.png',
                                                label: 'jqx.base.css'
                                            },
                                            {
                                                icon: './../images/nav1.png',
                                                label: 'jqx.energyblue.css'
                                            }, {
                                                icon: './../images/nav1.png',
                                                label: 'jqx.orange.css'
                                            }],
                                            label: 'css'
                                        },
                                        {
                                            icon: './../images/folder.png',
                                            items: [{
                                                icon: './../images/nav1.png',
                                                label: 'jqxcore.js'
                                            },
                                            {
                                                icon: './../images/nav1.png',
                                                label: 'jqxdata.js'
                                            }, {
                                                icon: './../images/nav1.png',
                                                label: 'jqxgrid.js'
                                            }],
                                            label: 'scripts',
                                        },
                                        {
                                            icon: './../images/nav1.png',
                                            label: 'index.htm'
                                        }],
                                    label: 'Project',
                                }];
                               
                            },
                            title: 'Solution Explorer',
                            type: 'layoutPanel'
                        },
                        {
                            contentContainer: 'PropertiesPanel',
                            title: 'Properties',
                            type: 'layoutPanel'
                        }],
                    minWidth: 200,
                    type: 'tabbedGroup',
                    width: 220
                }],
                orientation: 'horizontal',
                type: 'layoutGroup'
            },
            {
                height: 300,
                items: [{
                    contentContainer: 'OutputPanel',
                    selected: true,
                    title: 'Output',
                    type: 'layoutPanel'
                }],
                position: {
                    x: 350,
                    y: 250
                },
                type: 'floatGroup',
                width: 500
            }
        ];
        this.state = {
            layout
        }
    }
    public render() {
        return (
            // @ts-ignore
            <JqxDockingLayout
                style={{ position: 'absolute', left: 5, top: 35, right: 5, bottom: 5 }}
                layout={this.state.layout} >
                {/* The panel content divs can have a flat structure */}
                {/* autoHideGroup */}
                <div data-container={'ToolboxPanel'}>
                    List of tools
                </div>
                <div data-container={'HelpPanel'}>
                    Help topics
                </div>
                {/* documentGroup */}
                <div data-container={'Document1Panel'}>
                    Document 1 content
                </div>
                <div data-container={'Document2Panel'}>
                    Document 2 content
                </div>
                {/* bottom tabbedGroup */}
                <div data-container={'ErrorListPanel'}>
                    List of errors
                </div>
                {/* right tabbedGroup */}
                <div data-container={'SolutionExplorerPanel'}>
                    <div id="treeContainer" style={{ border: 'none', width: '99%', height: '100%' }} />
                </div>
                <div data-container={'PropertiesPanel'}>
                    List of properties
                </div>
                {/* floatGroup */}
                <div data-container={'OutputPanel'}>
                    <div style={{ fontFamily: 'Consolas' }}>
                        <p>
                            Themes installation complete.
                        </p>
                        <p>
                            List of installed stylesheet files. Include at least one stylesheet Theme file and
                            the images folder:
                        </p>
                        <ul>
                            <li>
                                styles/jqx.base.css: Stylesheet for the base Theme. The jqx.base.css file should
                                be always included in your project.
                            </li>
                            <li>styles/jqx.arctic.css: Stylesheet for the Arctic Theme</li>
                            <li>styles/jqx.web.css: Stylesheet for the Web Theme</li>
                            <li>styles/jqx.bootstrap.css: Stylesheet for the Bootstrap Theme</li>
                            <li>styles/jqx.classic.css: Stylesheet for the Classic Theme</li>
                            <li>styles/jqx.darkblue.css: Stylesheet for the DarkBlue Theme</li>
                            <li>styles/jqx.energyblue.css: Stylesheet for the EnergyBlue Theme</li>
                            <li>styles/jqx.shinyblack.css: Stylesheet for the ShinyBlack Theme</li>
                            <li>styles/jqx.office.css: Stylesheet for the Office Theme</li>
                            <li>styles/jqx.metro.css: Stylesheet for the Metro Theme</li>
                            <li>styles/jqx.metrodark.css: Stylesheet for the Metro Dark Theme</li>
                            <li>styles/jqx.orange.css: Stylesheet for the Orange Theme</li>
                            <li>styles/jqx.summer.css: Stylesheet for the Summer Theme</li>
                            <li>styles/jqx.black.css: Stylesheet for the Black Theme</li>
                            <li>styles/jqx.fresh.css: Stylesheet for the Fresh Theme</li>
                            <li>styles/jqx.highcontrast.css: Stylesheet for the HighContrast Theme</li>
                            <li>styles/jqx.blackberry.css: Stylesheet for the Blackberry Theme</li>
                            <li>styles/jqx.android.css: Stylesheet for the Android Theme</li>
                            <li>styles/jqx.mobile.css: Stylesheet for the Mobile Theme</li>
                            <li>styles/jqx.windowsphone.css: Stylesheet for the Windows Phone Theme</li>
                            <li>styles/jqx.ui-darkness.css: Stylesheet for the UI Darkness Theme</li>
                            <li>styles/jqx.ui-lightness.css: Stylesheet for the UI Lightness Theme</li>
                            <li>styles/jqx.ui-le-frog.css: Stylesheet for the UI Le Frog Theme</li>
                            <li>styles/jqx.ui-overcast.css: Stylesheet for the UI Overcast Theme</li>
                            <li>styles/jqx.ui-redmond.css: Stylesheet for the UI Redmond Theme</li>
                            <li>styles/jqx.ui-smoothness.css: Stylesheet for the UI Smoothness Theme</li>
                            <li>styles/jqx.ui-start.css: Stylesheet for the UI Start Theme</li>
                            <li>styles/jqx.ui-sunny.css: Stylesheet for the UI Sunny Theme</li>
                            <li>styles/images: contains images referenced in the stylesheet files</li>
                        </ul>
                    </div>
                </div>
            </JqxDockingLayout>
        );
    }
}
export default App;