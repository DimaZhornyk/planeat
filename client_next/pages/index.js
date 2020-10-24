import React from "react"
import styles from "../styles/Main.module.css"
import {Col, Row} from 'antd'
import Header from "../src/components/views/Header/Header";
import Client from "../lib/apollo"
import gql from 'graphql-tag';
import ProductCard from "../src/components/utils/card/Card";

const QUERY = gql`
    query {
        categories{
            id
            categoryName
            categoryImage{
                url
            }
            categoryDisplayNameUA
        }
    }`;


export async function getStaticProps() {
    const {data} = await Client.query({
        query: QUERY
    });
    return {props: {categories: data.categories}}
}

function Main({categories}) {

    const displayCategories = categories.map((category, index) => (
        <Col xl={8} lg={8} md={12} sm={12} xs={24} key={index}>
            <ProductCard id={category.id} image={category.categoryImage.url} caption={category.categoryDisplayNameUA}
                         name={category.categoryName}/>
        </Col>
    ));


    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Header categories={categories}/>
            <div className={styles["main-page-wrapper"]}>
                <h1 className={styles["heading"]}>Planeat - харчуйся швидко!</h1>
                <p style={{ fontSize: "15px", width: "70%", color: "rgba(0, 0, 0, 0.45)", textAlign: "center" }}>
                    Привіт любий друже! Любиш смачно харчуватися, але нема часу щоб готувати? Тоді ти потрапив куди треба!
                    На нашому сайті ти можеш знайти швидкі і смачні рецепти на кожен день.
                </p>
                <Row gutter={[16, 16]} justify={"center"}>
                    {displayCategories}
                </Row>
            </div>
        </div>
    )
}

export default Main
