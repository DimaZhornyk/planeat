/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {auth, loginUser, logoutUser} from '../_actions/user_actions';
import {useSelector, useDispatch, connect} from "react-redux";
import {useRouter} from "next/router";

export default function Auth(SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user.user);
        const dispatch = useDispatch();
        const router = useRouter();

        useEffect(() => {

            const accessToken = window.localStorage.getItem('access_token');
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
            }
            else{
                props.logoutUser();
            }

        }, []);

        return (
            <SpecificComponent {...props} user={user}/>
        )
    }
    const mapDispatchToState = {
        logoutUser: logoutUser
    }

    return connect(null, mapDispatchToState)(AuthenticationCheck)
}