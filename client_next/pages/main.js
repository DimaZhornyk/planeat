
import React, {useEffect, useState} from "react"
import Strapi from 'strapi-sdk-javascript';
import Header from "../src/components/views/Header/Header";

const strapi = new Strapi('http://localhost:1337');

export async function getStaticProps(){
    const posts =  await strapi.getEntries('posts');
    return {props:{posts}}
}

function Main({posts}) {
    // const [posts, setPosts] = useState([])
    console.log(posts)
    // useEffect(() => {
    //     getPosts()
    // }, [])

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

export default Main