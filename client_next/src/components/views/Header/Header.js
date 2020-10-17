import React, {useEffect} from "react"
import {Logo} from "./Sections/Icons"
import Searchbar from "./Sections/Searchbar"
import styles from "./header.module.css"
import NavMenu from "./Sections/NavMenu";


function Header(props) {

    return (
        <div className={styles["planeat-header"]} style={{width: "100vw"}}>
            <div className={styles["header-first-horizontal-row"]}>
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