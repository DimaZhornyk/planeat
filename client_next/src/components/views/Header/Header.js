import React, {useEffect} from "react"
import {Logo} from "./Sections/Icons"
import Searchbar from "./Sections/Searchbar"
import styles from "./header.module.css"
import NavMenu from "./Sections/NavMenu";


function Header(props) {
    useEffect(() => {
        console.log(props)
    }, [])
    return (
        <header className={styles["header"]}>
            <div className={styles["header-first-horizontal-row"]}>
                <Logo/>
                <Searchbar/>
            </div>
            <div className={styles["header-second-horizontal-row"]}>
                <NavMenu/>
            </div>
        </header>
    )
}

export default Header