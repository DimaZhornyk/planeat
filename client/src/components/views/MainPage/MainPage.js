import React, {useEffect, useState} from "react"
import {withRouter} from "react-router-dom";
import Strapi from 'strapi-sdk-javascript';

const strapi = new Strapi('http://localhost:1337');

function MainPage(props) {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        getPosts()
    }, [])
    const getPosts = async () => {
        console.log(await strapi.getEntries('posts'))
        setPosts(await strapi.getEntries('posts'))
    }

    const displayPosts = posts.map(post => (
        <h2>{post.Header}</h2>
    ))


    return (
        <>
            {displayPosts}
            <p>MainPage</p>
        </>
    )
}

export default withRouter(MainPage);