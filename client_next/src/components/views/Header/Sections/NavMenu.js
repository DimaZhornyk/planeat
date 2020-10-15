import React, {useState} from "react"
import {Menu} from 'antd'
import {DishIcon, MoreIcon} from "./Icons"


function NavMenu({categories}) {

    const [current, setCurrent] = useState()

    const handleMenuClick = e => {
        setCurrent(e.key)
        // TODO redirect to the category page
    };


    return (
        <Menu onClick={handleMenuClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="all" icon={<MoreIcon/>}>
                Усі страви
            </Menu.Item>
            {
                categories.map((category) => (
                    <Menu.Item key={category.id} icon={<DishIcon/>} style={{alignItems: "center"}}>
                        {category.categoryName}
                    </Menu.Item>
                ))
            }
        </Menu>
    )
}

export default NavMenu