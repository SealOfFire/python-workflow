import React from 'react';
import {
    Button,
    Menu,
    MenuTrigger,
    MenuList,
    MenuItem,
    MenuPopover,
    MenuDivider,
    MenuProps,
    MenuItemCheckbox
}
    from "@fluentui/react-components";
import { bundleIcon, ClipboardPasteRegular, ClipboardPasteFilled, CutRegular, CutFilled, CopyRegular, CopyFilled } from '@fluentui/react-icons';

const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);
const CopyIcon = bundleIcon(CopyFilled, CopyRegular);
const CutIcon = bundleIcon(CutFilled, CutRegular);

/**
 * 窗口显示控制菜单
 */
function ShowViews() {
    const [open, setOpen] = React.useState(false);
    const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
        setOpen(data.open);
    };

    const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({ views: ['file', 'component'] });

    const onChange: MenuProps['onCheckedValueChange'] = (e, { name, checkedItems }) => {
        console.log("checkedItems", checkedItems);
        console.log("checkedValues1", checkedValues);
        setCheckedValues(s => { console.log('s', s); return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems }; });
        console.log("checkedValues2", checkedValues);
    };

    return <>
        <Menu open={open} onOpenChange={onOpenChange} checkedValues={checkedValues} onCheckedValueChange={onChange}>
            <MenuTrigger disableButtonEnhancement>
                <MenuItem>窗口</MenuItem>
            </MenuTrigger>

            <MenuPopover>
                <MenuList>
                    <MenuItemCheckbox name="views" value="file">文件窗口</MenuItemCheckbox>
                    <MenuItemCheckbox name="views" value="component">组件窗口</MenuItemCheckbox>
                    <MenuItemCheckbox name="views" value="history">最近使用窗口</MenuItemCheckbox>
                    <MenuDivider />
                    <MenuItemCheckbox name="views" value="paste3">属性窗口</MenuItemCheckbox>
                    <MenuDivider />
                    <MenuItemCheckbox name="views" value="paste4">变量窗口</MenuItemCheckbox>
                    <MenuItemCheckbox name="views" value="paste5">日志窗口</MenuItemCheckbox>
                </MenuList>
            </MenuPopover>
        </Menu>
    </>;
}

function MainMenu() {


    return <>
        <Menu hasIcons>
            <MenuTrigger disableButtonEnhancement>
                <Button appearance="transparent">文件(F)</Button>
            </MenuTrigger>

            <MenuPopover>
                <MenuList>
                    <MenuItem icon={<CutIcon />}>New </MenuItem>
                    <MenuItem icon={<CopyIcon />}>New Window</MenuItem>
                    <MenuDivider />
                    <MenuItem disabled>Open File</MenuItem>
                    <MenuItem>Open Folder</MenuItem>
                    <ShowViews />
                </MenuList>
            </MenuPopover>
        </Menu>

        <Menu hasIcons>
            <MenuTrigger disableButtonEnhancement>
                <Button appearance="transparent">文件2</Button>
            </MenuTrigger>

            <MenuPopover>
                <MenuList>
                    <MenuItem icon={<CutIcon />}>New </MenuItem>
                    <MenuItem icon={<CopyIcon />}>New Window</MenuItem>
                    <MenuDivider />
                    <MenuItem disabled>Open File</MenuItem>
                    <MenuItem>Open Folder</MenuItem>
                </MenuList>
            </MenuPopover>
        </Menu>
    </>;
}

export default MainMenu;