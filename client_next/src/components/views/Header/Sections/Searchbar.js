import React, {useState} from "react"
import {Menu, Dropdown, Input} from 'antd';
import Client from "../../../../../lib/apollo"
import gql from "graphql-tag";
import {BACKEND_URL} from "../../../../../config";
import Link from "next/link";

const {Search} = Input;

const allCategories = {
    categoryDisplayNameUA: "Усі страви",
    id: "-1"
};

const QUERY = gql`
    query{
        recipes{
            recipeCaption
            time
            calories
            recipeImage{
                url
            }
        }
    }`;

function Searchbar({categories, recipes}) {
    const [selectedCategory, setSelectedCategory] = useState(allCategories.categoryDisplayNameUA);
    const [selectedKey, setSelectedKey] = useState(allCategories.id);
    const [searchItems, setSearchItems] = useState(<></>);
    const [recipesData, setRecipesData] = useState([]);

    Client.query({
        query: QUERY
    }).then(res => {
        setRecipesData(res.data.recipes)
    });

    const updateSearchTerm = (event) => {
        let newSearchTerm = event.currentTarget.value
        if (newSearchTerm === "") {
            setSearchItems(<></>)
        } else {
            setSearchItems(
                <Menu>
                    {recipesData.filter((rec) => {
                        return rec.recipeCaption.toLowerCase().includes(newSearchTerm.toLowerCase());
                    }).map((recipe, index) => {
                        return (
                            <Menu.Item key={index}>
                                <Link href={"/recipe/" + recipe.id}>
                                    <div style={{display: "flex"}}>
                                        <img src={`${BACKEND_URL}${recipe.recipeImage.url}`}
                                             style={{width: "67px", height: "50px"}} alt={"recipeImage"}/>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            fontSize: "16px",
                                            width: "100%",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <p style={{margin: "0 0 0 10px"}}>{recipe.recipeCaption}</p>
                                            <p style={{
                                                margin: 0,
                                                fontSize: "14px",
                                                fontWeight: "600"
                                            }}>{recipe.calories} калорій, {recipe.timeText} хв</p>
                                        </div>
                                    </div>
                                </Link>
                            </Menu.Item>
                        )
                    })}
                </Menu>
            )
        }
    };


    const menu = (
        <Menu>
            {
                categories.map((category) =>
                    (
                        <Menu.Item key={category.id} onClick={handleCategoryChange}>
                            <a href="#">{category.categoryDisplayNameUA}</a>
                        </Menu.Item>
                    )
                )
            }
            <li className={"ant-dropdown-menu-item-divider"}/>
            <Menu.Item key={-1} onClick={handleCategoryChange}>
                {allCategories.categoryDisplayNameUA}
            </Menu.Item>
        </Menu>
    );

    function handleCategoryChange(itemProps) {
        let index = categories.findIndex((category) => category.id === itemProps.key);
        setSelectedKey(index);
        if (index !== -1)
            setSelectedCategory(categories[index].categoryDisplayNameUA);
        else
            setSelectedCategory(allCategories.categoryDisplayNameUA)

    }


    return (
        <div style={{alignSelf: "center", display: "flex"}}>
            <Dropdown overlay={menu}
                      trigger={['hover']}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    padding: "0",
                }}>
                    <p style={{justifySelf: "center", margin: "auto"}}>
                        {selectedCategory}
                    </p>
                </div>
            </Dropdown>
            <Dropdown
                placement="bottomCenter"
                overlay={searchItems}
            >
                <Search placeholder="Пошук..."
                        onSearch={value => console.log(value)}
                        onChange={updateSearchTerm}
                        style={{width: "450px", padding: "0", border: "none"}}
                        width={450}
                        enterButton/>
            </Dropdown>
        </div>
    )
}

export default Searchbar