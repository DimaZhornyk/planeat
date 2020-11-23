import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import {BACKEND_URL} from "../../config";

function GoogleAuthCallback() {
    const [auth, setAuth] = useState();
    useEffect(() => {
        if (!location) {
            return
        }
        axios({
            method: "GET",
            url: `${BACKEND_URL}/auth/google/callback`,
        })
            .then(res => res.data)
            .then(setAuth)
    }, []);

    console.log(auth);

    return (
        <div>
            {auth && (
                <>
                    <div>Jwt: {auth.jwt}</div>
                    <div>User Id: {auth.user.id}</div>
                    <div>Provider: {auth.user.provider}</div>
                </>
            )}
        </div>
    )
}

export default GoogleAuthCallback