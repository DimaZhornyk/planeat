import React from "react";
import Auth from "../../src/hoc/Auth";

function Profile() {
    return (
        <div>
            <h1>YOUR PROFILE</h1>
            DELAY CHTO HOCHESH
            DIMA DURIK
            VSE V REDUX
        </div>
    )
}

export default Auth(Profile, true);