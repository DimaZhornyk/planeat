import React, {useState} from "react"
import {Menu, Dropdown, Input} from 'antd';
import styles from "./search.module.css"
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";

const {Search} = Input;

const allCategories = {
    categoryName: "Усі страви",
    id: -1
}

function Searchbar({categories}) {

    const [selectedCategory, setSelectedCategory] = useState(allCategories.categoryName);
    const [selectedKey, setSelectedKey] = useState(allCategories.id);

    const menu = (
        <Menu>
            {
                categories.map((category) =>
                    (
                        <Menu.Item key={category.id} onClick={handleCategoryChange}>
                            <a href="#">{category.categoryName}</a>
                        </Menu.Item>
                    )
                )
            }
            <li className={"ant-dropdown-menu-item-divider"}/>
            <Menu.Item key={-1} onClick={handleCategoryChange} >
                {allCategories.categoryName}
            </Menu.Item>
        </Menu>
    );

    function handleCategoryChange(itemProps) {
        let index = categories.findIndex((category) => category.id === parseInt(itemProps.key));
        console.log(categories);
        console.log(index);
        if (index !== -1) {
            setSelectedCategory(categories[index].categoryName);
            setSelectedKey(index)
        } else {
            //TODO redirect
        }
    }


    return (
        <div style={{alignSelf: "center", display: "flex"}}>
            <Dropdown overlay={menu}
                      trigger={['click']}>
                <p>
                    {selectedCategory}
                </p>
            </Dropdown>
            <Search placeholder="Пошук..."
                    onSearch={value => console.log(value)}
                    enterButton/>
        </div>
    )
}

export default Searchbar