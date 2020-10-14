import React from "react"
import {Menu, Dropdown, Input} from 'antd';

const {Search} = Input;

const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="http://www.google.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="http://www.google.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
);

function Searchbar(props) {


    return (
        <div style={{alignSelf: "center", display: "flex"}}>
            <Dropdown overlay={menu} trigger={['click']}>
                <a>ddd</a>
            </Dropdown>
            <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton/>
        </div>
    )
}

export default Searchbar