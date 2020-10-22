import React, {useEffect, useState} from "react"
import {useRouter} from "next/router";
import SearchFilter from "./filter/SearchFilter";

/**
 * @return {null}
 */
function FirstLoad(props) {

    console.log(useRouter().query);

    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if(!hasMounted) return null;

    return (
        <SearchFilter {...props}/>
    )
}

export default FirstLoad;