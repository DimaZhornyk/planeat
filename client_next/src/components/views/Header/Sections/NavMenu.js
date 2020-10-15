import React, {useState} from "react"
import {Menu} from 'antd'
import {DishIcon, MoreIcon} from "./Icons"
import Link from "next/link"

function NavMenu({categories}) {

    const [current, setCurrent] = useState()

    const handleMenuClick = e => {
        setCurrent(e.key)
        // TODO redirect to the category page
    };


    return (
        <Menu onClick={handleMenuClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="all" icon={<MoreIcon/>}>
                <Link href={'/all'}>Усі страви</Link>
            </Menu.Item>
            {
                categories.map((category) => (
                    
                    <Menu.Item key={category.id} icon={<DishIcon/>} style={{alignItems: "center"}}>
                        <Link href={'/' + category.categoryName}>
                       {category.categoryDisplayNameUA}
                    </Link>
                    </Menu.Item>
                ))
            }
        </Menu>
    )
}

export default NavMenu