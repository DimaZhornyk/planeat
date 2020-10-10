import React, {Suspense} from 'react'
import {Route, Switch} from 'react-router-dom'
import './App.css';
import Auth from '../src/hoc/Auth'
import MainPage from "./components/views/MainPage/MainPage";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path="/" component={MainPage}/>
                {/*<Route path="/" component={Auth(MainPage, true)}/>*/}
            </Switch>
        </Suspense>
    );
}

export default App;
