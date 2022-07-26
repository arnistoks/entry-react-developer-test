import { gql } from "@apollo/client";

const getCategories = gql`
  query {
    categories {
      name
    }
  }
`;

// const getProducts = () => (gql`
//   query Products($categoriesInput: CategoryInput) {
//     category(input: $categoriesInput) {
//       name
//       products {
//         id
//         name
//         inStock
//         gallery
//         description
//         category
//         attributes {
//             id
//             name
//             type
//             items {
//                 displayValue
//                 value
//                 id
//             }
//         }
//         prices {
//           currency {
//             label
//             symbol
//           }
//           amount
//         }
//         brand
//       }
//     }
//   }
// `);

const getProducts = (title) => (gql`
  query {
    category(input: {title: "${title}"}) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`);

const getProduct = (title) => (gql`
  query {
      product (id: "${title}") {
        id
        name
        inStock
        gallery
        description
        category
        category
        attributes {
          id
          name
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
  }
`);

const getCurrency = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

export { getCategories, getProducts, getProduct, getCurrency };
