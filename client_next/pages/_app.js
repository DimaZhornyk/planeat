import React from "react";
import {Provider} from 'react-redux'
import {useStore} from '../store'
import {applyMiddleware, compose} from "redux";
import thunk from "redux-thunk"
import '../styles/globals.css'
import Head from "next/head"

export default function App({Component, pageProps}) {

    const store = useStore(pageProps.initialReduxState, compose(applyMiddleware(thunk)));

    return (
        <Provider store={store}>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap&subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet"/>
            </Head>
            <Component {...pageProps} />
        </Provider>
    )
}
