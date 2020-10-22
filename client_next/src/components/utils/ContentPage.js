import React, {useEffect} from "react"
import {Collapse} from 'antd'
import styles from "../../../styles/Main.module.css"
import Header from "../views/Header/Header";
import SearchFilter from "./filter/SearchFilter";
import Markdown from 'markdown-to-jsx';
import Recipes from "./Recipes";
import {getRecipes} from "../../_actions/sort_actions";
import {connect} from "react-redux";

function GetContentPage({data, type, getRecipes}) {

    useEffect(() => {
        getRecipes(data.recipes)
    }, []);

    const category = data.categoriesTexts.find((category) => {
        return category.CategoryNameText === type
    });

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Header categories={data.categories}/>
            <div className={styles["main-page-wrapper"]}>
                <Collapse defaultActiveKey={['1']} onChange={() => console.log("smth")}
                          style={{width: "100%", margin: "20px", borderRadius: "7px"}}>
                    <Collapse.Panel header="Фільтри" key="1">
                        <SearchFilter options={data.products} categories={data.categoriesProducts}/>
                    </Collapse.Panel>
                </Collapse>
                <Recipes recipes={data.recipes}/>
                <Markdown>{category.CategoryText}</Markdown>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    getRecipes
};

export default connect(null, mapDispatchToProps)(GetContentPage);