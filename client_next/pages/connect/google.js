import React, {useState, useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/router";
import queryString from "query-string"
import {BACKEND_URL} from "../../config";
import {setJwtToken} from "../../src/_actions/jwt_actions";
import {connect} from "react-redux";
import {auth, loginUser} from "../../src/_actions/user_actions";

function GoogleAuthCallback({authUser}) {

    const router = useRouter();
    const [error, setError] = useState('');
    useEffect(() => {
        if (Object.keys(router.query).length === 0) {
            return
        }
        let options = queryString.stringify(router.query);
        console.log(options);
        authUser(options)
            .then(router.push('/'))
            .catch(err => setError(err));
    }, [router]);

    return (
        <div>
            <h1>{error}</h1>}
        </div>
    )
}

const mapDispatchToProps = {
    authUser: auth
};

export default connect(null, mapDispatchToProps)(GoogleAuthCallback);