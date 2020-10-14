import React, {useState} from "react"
import {Menu} from 'antd'
import {DishIcon} from "./Icons"


function NavMenu(props) {

    const [current, setCurrent] = useState()

    const handleMenuClick = e => {
        setCurrent(e.key)
        // TODO redirect to the category page
    };


    return (
        <Menu onClick={handleMenuClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="all" icon={<DishIcon/>}>
                Усі страви
            </Menu.Item>
            <Menu.Item key="breakfasts" icon={<DishIcon/>}>
                Сніданки
            </Menu.Item>
            <Menu.Item key="dinners" icon={<DishIcon/>}>
                Обіди
            </Menu.Item>
            <Menu.Item key="mainDishes" icon={<DishIcon/>}>
                Основні страви
            </Menu.Item>
            <Menu.Item key="salads" icon={<DishIcon/>}>
                Салати
            </Menu.Item>
        </Menu>
    )
}

export default NavMenu