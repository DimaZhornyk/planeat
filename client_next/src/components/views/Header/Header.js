import React, {useEffect} from "react"
import Icon from '@ant-design/icons'
import {Logo} from "./Sections/Icons"
import Searchbar from "./Sections/Searchbar"
import styles from "./header.module.css"
import NavMenu from "./Sections/NavMenu";
import {useMediaQuery} from "react-responsive";
import {Button} from "antd";
import Avatar from "../../../static/icons/avatar.svg"


function Header(props) {
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'});
    if (isTabletOrMobile) {
        return (
            <div className={styles["planeat-header"]} style={{width: "100vw"}}>
                <div className={styles["header-first-horizontal-row"]} style={{justifyContent: "space-between"}}>
                    <Logo/>
                    <Searchbar categories={props.categories}/>
                    <Button type={"text"}
                            style={{display: "flex", alignSelf: "center"}}
                            icon={<Icon component={Avatar} style={{fontSize: "24px"}}/>}
                            onClick={() => window.location = "https://www.admin.planeat.co.ua/connect/google"}>
                        Увійти
                    </Button>
                    <NavMenu categories={props.categories}/>
                </div>
            </div>
        )
    } else return (
        <div className={styles["planeat-header"]} style={{width: "100vw"}}>
            <div className={styles["header-first-horizontal-row"]} style={{justifyContent: "center"}}>
                <Logo/>
                <Searchbar categories={props.categories}/>
                <Button type={"text"}
                        style={{display: "flex", alignSelf: "center"}}
                        icon={<Icon component={Avatar} style={{fontSize: "24px"}}/>}
                        onClick={() => window.location = "https://www.admin.planeat.co.ua/connect/google"}>
                    Увійти
                </Button>
            </div>
            <div className={styles["header-second-horizontal-row"]}>
                <NavMenu categories={props.categories}/>
            </div>
        </div>
    )
}

export default Header