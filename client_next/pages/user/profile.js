import React from "react";
import Auth from "../../src/hoc/Auth";
import {connect} from "react-redux";
import Header from "../../src/components/views/Header/Header";
import Client from "../../lib/apollo";
import gql from "graphql-tag";
export async function getStaticProps() {
    const {data} = await Client.query({
        query: gql`
            query {
                categories{
                    id
                    categoryName
                    categoryImage{
                        url
                    }
                    categoryDisplayNameUA
                }
            }`
    });
    return {props: {categories: data.categories}}
}
function Profile({recipes, categories}) {
    if(recipes === undefined)
        console.log(recipes.map(recipes => {return(recipes.id)}));
    return (
        <div>
            <Header categories ={categories}/>

            {JSON.stringify(recipes)}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        recipes: state.user.recipes
    };
}

export default Auth(connect(mapStateToProps)(Profile), true);