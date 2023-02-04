import React from 'react';
import MoveLayout from './MoveLayout';
import MainMenu from './MainMenu';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

function MainForm() {

    const [views, setViews] = React.useState('list');

    const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
        setViews(nextView);
    };

    return <>
        <FluentProvider theme={webLightTheme}>
            <MainMenu />
            <MoveLayout />
        </FluentProvider>
    </>
}

export default MainForm;