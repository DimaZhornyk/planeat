import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";

import {useRouter} from "next/router";
import {auth, logoutUser} from '../_actions/user_actions';

export default function Auth(SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user.user);
        const dispatch = useDispatch();
        const router = useRouter();

        useEffect(() => {

            const accessToken = window.localStorage.getItem('access_token');
            console.log(accessToken);
            if (accessToken !== null) {
                dispatch(auth(accessToken)).then(response => {
                    if (!response.isAuth) {
                        //If not auth but in secure page => redirect to home
                        if (option) {
                            router.push('/')
                        }
                    } else {
                        if (!option) {
                            router.push('/')
                        }
                    }
                })
            } else {
                dispatch(logoutUser())
            }


        }, []);

        return (
            <SpecificComponent {...props} user={user}/>
        )
    }

    return AuthenticationCheck
}