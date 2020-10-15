import React from "react"
import Strapi from 'strapi-sdk-javascript';
import styles from "../../styles/Main.module.css"
import {Col} from 'antd'
import Header from "../../src/components/views/Header/Header";

const strapi = new Strapi('http://localhost:1337');

export async function getStaticProps() {
    const categories = await strapi.getEntries('categories');
    return {props: {categories}}
}

function Main({categories}) {

    const displayCategories = categories.map(category => (
        <h2>{category.categoryName}</h2>
    ));


    return (
        <div>
            <Header categories={categories}/>
            <div className={styles["main-page-wrapper"]}>
                <h1 className={styles["heading"]}>Lorem ipsum dolor sit amet, consectetur </h1>
                <p style={{fontSize: "15px", width: "40%", color: "rgba(0, 0, 0, 0.45)", textAlign: "center"}}>Lorem
                    ipsum
                    dolor sit amet,
                    consectetur adipiscing elit. Sit felis sed nec platea a, magna.</p>
                <Col xs={24} sm={12} md={12} lg={8} xl={8}>

                </Col>
                {displayCategories}
            </div>
        </div>
    )
}

export default Main