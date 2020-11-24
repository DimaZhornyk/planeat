import React, { useState, useEffect } from "react"
import axios from "axios"
import {useRouter} from "next/router";
import queryString from "query-string"
import {BACKEND_URL} from "../../config";

function GoogleAuthCallback() {
    const [auth, setAuth] = useState();
    const router = useRouter();

    useEffect(() => {
        if (router.query === {} || router) {
            return
        }
        axios({
            method: "GET",
            url: `${BACKEND_URL}/auth/google/callback?${queryString.stringify(router.query)}`,
        })
            .then(res => res.data)
            .then(setAuth)
    }, [router]);

    console.log(auth);

    return (
        <div>
            {auth && (
                <>
                    <div>{JSON.stringify(auth)}</div>
                </>
            )}
        </div>
    )
}

export default GoogleAuthCallback