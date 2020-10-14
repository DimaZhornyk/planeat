import React from "react"
import styles from "../../styles/Main.module.css"
import {Col} from 'antd'
import {strapi} from "../index"
import ProductCard from "../../src/components/utils/card/Card"

export async function getStaticProps() {
    const breakfasts = await strapi.getEntries("breakfasts")
    const posts = await strapi.getEntries('posts');
    return {props: {posts, breakfasts}}
}

function Main({posts, breakfasts}) {

    const displayPosts = posts.map(post => (
        <h2>{post.Header}</h2>
    ))

    const displayCards = breakfasts.map(breakfast => (
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                <ProductCard id={breakfast.id} caption={breakfast.breakfastCaption}
                             description={breakfast.breakfastDescription}
                             image={breakfast.breakfastImage}/>
        </Col>
))

return (
    <div className={styles["main-page-wrapper"]}>
        <h1 className={styles["heading"]}>Lorem ipsum dolor sit amet, consectetur </h1>
        <p style={{fontSize: "15px", width: "40%", color: "rgba(0, 0, 0, 0.45)", textAlign: "center"}}>Lorem ipsum
            dolor sit amet,
            consectetur adipiscing elit. Sit felis sed nec platea a, magna.</p>
        {displayPosts}
        {displayCards}
    </div>
)
}

export default Main