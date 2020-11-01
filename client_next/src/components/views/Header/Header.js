import React, {useEffect} from "react"
import {Logo} from "./Sections/Icons"
import Searchbar from "./Sections/Searchbar"
import styles from "./header.module.css"
import NavMenu from "./Sections/NavMenu";
import {useMediaQuery} from "react-responsive";


function Header(props) {
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'});
    if (isTabletOrMobile) {
        return (
            <div className={styles["planeat-header"]} style={{width: "100vw"}}>
                <div className={styles["header-first-horizontal-row"]} style={{justifyContent: "space-between"}}>
                    <Logo/>
                    <Searchbar categories={props.categories}/>
                    <NavMenu categories={props.categories}/>
                </div>
            </div>
        )
    } else return (
        <div className={styles["planeat-header"]} style={{width: "100vw"}}>
            <div className={styles["header-first-horizontal-row"]} style={{justifyContent: "center"}}>
                <Logo/>
                <Searchbar categories={props.categories}/>
            </div>
            <div className={styles["header-second-horizontal-row"]}>
                <NavMenu categories={props.categories}/>
            </div>
        </div>
    )
}

export default Header