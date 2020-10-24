import React from "react";
import {Provider} from 'react-redux'
import {useStore} from '../store'
import {applyMiddleware, compose} from "redux";
import thunk from "redux-thunk"
import '../styles/globals.css'

export default function App({Component, pageProps}) {

    const store = useStore(pageProps.initialReduxState, compose(applyMiddleware(thunk)));

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}
