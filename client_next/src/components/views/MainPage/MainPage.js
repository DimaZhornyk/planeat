import React, {useEffect, useState} from "react"
import Strapi from 'strapi-sdk-javascript';
import Header from "../Header/Header";

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
        <div className={"main-page-wrapper"}>
            <Header/>
            {displayPosts}
            <p>MainPage</p>
        </div>
    )
}

export default MainPage;