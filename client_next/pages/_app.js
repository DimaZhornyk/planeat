import '../styles/globals.css'
import {Provider} from 'react-redux'
import {useStore} from '../store'
import React from "react";
import Header from "../src/components/views/Header/Header";

export default function App({Component, pageProps}) {

    const store = useStore(pageProps.initialReduxState)

    return (
        <Provider store={store}>
            <Header/>
            <Component {...pageProps} />
        </Provider>
    )
}
