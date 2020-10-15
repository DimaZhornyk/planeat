import React, {useState} from "react"
import {Menu, Dropdown, Input} from 'antd';

const {Search} = Input;

const allCategories = {
    categoryDisplayNameUA: "Усі страви",
    id: "-1"
}

function Searchbar({categories}) {

    const [selectedCategory, setSelectedCategory] = useState(allCategories.categoryDisplayNameUA);
    const [selectedKey, setSelectedKey] = useState(allCategories.id);

    const menu = (
        <Menu>
            {
                categories.map((category) =>
                    (
                        <Menu.Item key={category.id} onClick={handleCategoryChange}>
                            <a href="#">{category.categoryDisplayNameUA}</a>
                        </Menu.Item>
                    )
                )
            }
            <li className={"ant-dropdown-menu-item-divider"}/>
            <Menu.Item key={-1} onClick={handleCategoryChange}>
                {allCategories.categoryDisplayNameUA}
            </Menu.Item>
        </Menu>
    );

    function handleCategoryChange(itemProps) {
        let index = categories.findIndex((category) => category.id === itemProps.key);
        setSelectedKey(index)
        if (index !== -1)
            setSelectedCategory(categories[index].categoryDisplayNameUA);
        else
            setSelectedCategory(allCategories.categoryDisplayNameUA)

    }


    return (
        <div style={{alignSelf: "center", display: "flex"}}>
            <Dropdown overlay={menu}
                      trigger={['hover']}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    padding: "0"
                }}>
                    <p style={{justifySelf: "center", margin: "auto"}}>
                        {selectedCategory}
                    </p>
                </div>
            </Dropdown>
            <Search placeholder="Пошук..."
                    onSearch={value => console.log(value)}
                    style={{width: "450px"}}
                    width={450}
                    enterButton/>
        </div>
    )
}

export default Searchbar