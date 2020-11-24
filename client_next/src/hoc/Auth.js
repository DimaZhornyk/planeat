/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {auth} from '../_actions/user_actions';
import {useSelector, useDispatch} from "react-redux";
import {useRouter} from "next/router";

export default function Auth(SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user.user);
        const dispatch = useDispatch();
        const router = useRouter();

        useEffect(() => {

            const accessToken = window.localStorage.getItem('access_token');
            if (accessToken !== undefined) {
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
            }


        }, []);

        return (
            <SpecificComponent {...props} user={user}/>
        )
    }

    return AuthenticationCheck
}