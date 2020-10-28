import React, {useEffect} from "react"
import gql from "graphql-tag";
import Client from "../../../../lib/apollo";
import queryString from "query-string"
import {connect, useDispatch, useSelector} from "react-redux";
import Header from "../../../../src/components/views/Header/Header";
import styles from "../../../../styles/Main.module.css";
import {Collapse, Dropdown, Menu} from "antd";
import SearchFilter from "../../../../src/components/utils/filter/SearchFilter";
import Recipes from "../../../../src/components/utils/Recipes";
import Markdown from "markdown-to-jsx";
import {getRecipes, sortByTime} from "../../../../src/_actions/sort_actions";
import RecipesSort from "../../../../src/components/utils/filter/RecipesSort";
import FirstLoad from "../../../../src/components/utils/FirstLoad";

export async function getStaticPaths() {
    let {data} = await Client.query({
        query: gql`query {
        categories{
            categoryName   
        }
        products{
          name
        }
        utensils{
          name
        }
    }`
    });

    let products = data.products.concat({});
    let utensils = data.utensils.concat({});
    let categories = data.categories.concat({categoryName: "all"});
    let paths = [];

    categories.forEach((category) => (
        products.forEach((product) => {
            utensils.forEach((utensil) => {
                let params = {};
                if (Object.keys(product).length === 0 && Object.keys(utensil).length === 0) {
                    params.all = null;
                } else {
                    params.product = product ? product.name : undefined;
                    params.utensil = utensil ? utensil.name : undefined
                }
                paths.push(
                    {
                        params: {
                            category: category.categoryName,
                            params: queryString.stringify(params, {sort: false})
                        }
                    })
            });
            paths.push({
                params: {
                    category: category.categoryName,
                    params: "all"
                }
            })
        }))
    );
    console.log(paths);
    return {
        paths: paths,
        fallback: false
    }
}

const getQueryFilter = category => {
    if (category !== "all") {
        return `(where: {category: "${category}"})`
    }
    return ""
};

export async function getStaticProps(context) {
    const filter = getQueryFilter(context.params.category);
    console.log(filter);
    const {data} = await Client.query({
        query: gql` query {
            recipes ${filter}{
            id
            calories
            time
            recipeCaption
            recipeDescription
            recipeImage{
                url
            }
            category
            products {
                name
            }
            utensils {
                name
            }
        }
        categories{
            id
            categoryName
            categoryImage{
                url
            }
            categoryDisplayNameUA
        }
        categoriesTexts{
          CategoryNameText
          CategoryText
        }
        products{
          caption
          name
          icon{
            url
          }
          category
        }
        utensils{
          caption
          name
          icon{
            url
          }
          category
        }
        categoriesProducts{
          categoryName
          categoryDisplayNameUA
        }
        categoriesUtensils{
          categoryName
          categoryDisplayNameUA
        }   
    }`
    });
    return {
        props: {
            data: {
                category: context.params.category,
                recipes: data.recipes,
                categories: data.categories,
                categoriesTexts: data.categoriesTexts,
                products: data.products,
                utensils: data.utensils,
                categoriesProducts: data.categoriesProducts,
                categoriesUtensils: data.categoriesUtensils,
                params: queryString.parse(context.params.params)
            }
        }
    };
}

function FilteredPage({data, getRecipes, sortByTime}) {

    console.log(data);

    const sort = useSelector(state => state.recipesReducer.sort);
    const dispatch = useDispatch();

    useEffect(() => {
        getRecipes(data.recipes);
        dispatch({type: sort, payload: null});
    }, [data]);

    const category = data.categoriesTexts.find((category) => {
        return category.CategoryNameText === data.category
    });

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Header categories={data.categories}/>
            <div className={styles["main-page-wrapper"]}>
                <Collapse defaultActiveKey={['1']} onChange={() => console.log("smth")}
                          style={{width: "100%", margin: "20px", borderRadius: "7px"}}>
                    <Collapse.Panel header="Фільтри" key="1">
                        <FirstLoad options={data.products} categories={data.categoriesProducts}
                                   params={data.params.product}/>
                        <FirstLoad options={data.utensils} categories={data.categoriesUtensils}
                                      params={data.params.utensil}/>
                    </Collapse.Panel>
                </Collapse>

                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h1>Заголовок H1</h1>
                    <RecipesSort/>
                </div>
                <Recipes recipes={data.recipes}/>
                <Markdown>{category.CategoryText}</Markdown>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    getRecipes,
    sortByTime
};

export default connect(null, mapDispatchToProps)(FilteredPage)