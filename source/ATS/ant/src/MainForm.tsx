import React from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import MoveLayout from './MoveLayout';

function MainForm() {

    const [view, setView] = React.useState('list');
    const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
        setView(nextView);
    };

    return (
        <Grid container spacing={1}>
            <Grid width={100}>
                <Box style={{ top: 200, backgroundColor: '#1A2027' }}>
                    <Stack spacing={8}>
                        <Button variant="outlined" style={{ transform: 'rotate(90deg)' }}>文件
                        </Button>
                        <Button variant="outlined" style={{ transform: 'rotate(90deg)' }}>组件</Button>
                        <Button variant="outlined" style={{ transform: 'rotate(90deg)' }}>最近使用</Button>
                    </Stack>
                </Box>
            </Grid>
            <Grid mdOffset="auto">
                <MoveLayout />
            </Grid>
            <Grid width={20}>
                <div style={{ writingMode: 'vertical-lr' }}>
                    <button><p style={{ writingMode: 'vertical-lr' }}>pippo</p></button>
                    cddddd
                </div>
            </Grid>
        </Grid>
    );
}

export default MainForm;