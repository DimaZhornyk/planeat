import gql from "graphql-tag";

export default function query(param) {
  return gql`query {
      recipes(where:{category:"${param}"}){
        id
        time
        calories
        recipeCaption
        text
        recipeImage{
          url
        }
        category
        products {
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
        #calories
        #productProteins
        #productFats
        #productCarbohydrates
        icon{
          url
        }
        category
      }
      categoriesProducts{
        categoryName
        categoryDisplayNameUA
      }   
  }`;
}
