import React, {useState} from "react"
import {Menu, Drawer} from 'antd'
import {DishIcon, MoreIcon} from "./Icons"
import Link from "next/link"
import {useMediaQuery} from 'react-responsive'
import {MenuOutlined } from '@ant-design/icons'

function NavMenu({categories}) {
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'});
    const [current, setCurrent] = useState();
    const [menuVisible, setMenuVisible] = useState(false);

    const handleMenuClick = e => {
        setCurrent(e.key);
    };

    const showDrawer = () => {
        setMenuVisible(true);
    }

    const menu =
        <Menu onClick={handleMenuClick} selectedKeys={[current]} mode={isTabletOrMobile ? "vertical" : "horizontal"} style={{border: "none"}}>
            <Menu.Item key="all" icon={<MoreIcon/>}>
                <Link href={'/recipes/all/all'}>Усі страви</Link>
            </Menu.Item>
            {
                categories.map((category) => (
                    <Menu.Item key={category.id} icon={<DishIcon/>} style={{alignItems: "center"}}>
                        <Link href={'/recipes/' + category.categoryName + '/all'}>
                            {category.categoryDisplayNameUA}
                        </Link>
                    </Menu.Item>
                ))
            }
        </Menu>


    if (isTabletOrMobile) {
        return (
            <>
                <MenuOutlined onClick={showDrawer} style={{fontSize: '32px', marginLeft: "30px"}}/>
                <Drawer
                    placement={"right"}
                    closable={true}
                    onClose={() => setMenuVisible(false)}
                    visible={menuVisible}
                >
                    {menu}
                </Drawer>
            </>
        )
    } else {
        return (
            <>
                {menu}
            </>
        )
    }
}

export default NavMenu