import React from "react"
import gql from "graphql-tag";
import Client from "../../../../lib/apollo";

export async function getStaticPaths() {
    const {data} = await Client.query({
        query: gql`query {
        categories{
            categoryName   
        }
        products{
          productName
        }
        accessories{
          name
        }
    }`
    });

    const paths = data.categories.map((category) => (
        data.products.map((product) => (
            data.accessories.map((accessory) => {})
        ))
    ));
    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    console.log(context);
    return {
        props: {
            category: context.params.category,
            params: context.params.params
        }
    };
}

function FilteredPage({category, params}) {
    return (
        <div>
            <p>{category}</p>
            <p>{params}</p>
        </div>
    )
}

export default FilteredPage