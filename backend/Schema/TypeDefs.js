 const {gql} = require('apollo-server-express');

 const typeDefs = gql`
    type ShoppingItem {
        id: ID
        itemName: String
        itemDescription: String
        itemCount: Int
        itemPurchased: Boolean
    }

    # Queries
    type Query{
        getShoppingItem(id:ID): ShoppingItem
        getAllShoppingItems:[ShoppingItem]
    }

    # Mutations
    type Mutation {
        createShoppingItem(
            itemName:String!,
            itemDescription:String!,
            itemCount:Int!
            ): ShoppingItem!
        deleteShoppingItem(id:ID!): Boolean!
        patchShoppingItem(
            id:ID!,
            itemName:String!,
            itemDescription:String!,
            itemCount:Int!,
            itemPurchased: Boolean!):ShoppingItem
        patchShoppingItemPurchased(
            id:ID!,
            itemPurchased: Boolean!):ShoppingItem
    }
 `;

 module.exports = {typeDefs};