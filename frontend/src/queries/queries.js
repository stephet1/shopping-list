import {gql} from '@apollo/client';

/* 
*   Get all Shopping List Item
*/
export const GET_ALL_SHOPPING_LIST_ITEM = gql`
    query GetAllShoppingItems {
        getAllShoppingItems {
        id
        itemName
        itemDescription
        itemCount
        itemPurchased
        }
    }
`;
/* 
*   Get one Shopping List Item by ID
*/
export const GET_SHOPPING_LIST_ITEM = gql`
    query GetShoppingItem($getShoppingItemId: ID) {
        getShoppingItem(id: $getShoppingItemId) {
        id
        itemName
        itemDescription
        itemCount
        itemPurchased
        }
    }
`;

/* 
*   Add a Shopping List Item
*/
export const ADD_SHOPPING_LIST_ITEM = gql`
    mutation Mutation($itemName: String!, $itemDescription: String!, $itemCount: Int!) {
        createShoppingItem(itemName: $itemName, itemDescription: $itemDescription, itemCount: $itemCount) {
        id
        itemName
        itemDescription
        itemCount
        itemPurchased
        }
    }
`;
/* 
*   Update a Shopping List Item by ID
*/
export const PATCH_SHOPPING_LIST_ITEM = gql`
    mutation PatchShoppingItem($Id: ID!, $itemName: String!, $itemDescription: String!, $itemCount: Int!, $itemPurchased: Boolean!) {
        patchShoppingItem(id: $Id, itemName: $itemName, itemDescription: $itemDescription, itemCount: $itemCount, itemPurchased: $itemPurchased) {
        id
        itemName
        itemDescription
        itemCount
        itemPurchased
        }
    }
`;
/* 
*   Update a Shopping List Item `Item Purchased` field by ID
*/
export const PATCH_ITEM_PURCHASED_SHOPPING_LIST_ITEM = gql`
    mutation PatchShoppingItemPurchased($Id: ID!, $itemPurchased: Boolean!) {
        patchShoppingItemPurchased(id: $Id, itemPurchased: $itemPurchased) {
        id
        itemName
        itemDescription
        itemCount
        itemPurchased
        }
    }
`;
/* 
*   Delete Shopping List Item by ID
*/
export const DELETE_SHOPPING_LIST_ITEM = gql`
    mutation Mutation($Id: ID!) {
        deleteShoppingItem(id: $Id)
    }
`;