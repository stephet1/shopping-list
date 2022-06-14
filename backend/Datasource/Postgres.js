const {SQLDataSource} = require('datasource-sql');

class Postgres extends SQLDataSource{
/*
*   Get all shopping list items
*/
    getAllShoppingItems(){
        return (
            this.knex
                .select("*")
                .from("shoppingList")
                .orderBy('id')
        )
    }
/*
*   Get one shopping list item by ID
*/
    getShoppingItem(id){
        let newParam=id;
        if(!id){
            newParam=-999999999;
        }
        return (
            this.knex
                .first("*")
                .from("shoppingList")
                .where("id",newParam)
                .orderBy('id')
        )

    }
/*
*   Delete one shopping list item by ID
*/
    deleteShoppingItem(id){
        return (
            this.knex
                .from("shoppingList")
                .where("id",id)
                .del(["id"])
        )
    }
/*
*   Post one shopping list item
*/
    postShoppingItem(itemName,itemDescription,itemCount){
        return (
            this.knex
                .insert([{
                    itemName:itemName,
                    itemDescription:itemDescription,
                    itemCount:itemCount
                }],['id','itemName','itemDescription','itemCount','itemPurchased'])
                .into("shoppingList")
        )
    }
/*
*   Update one shopping list item by ID
*/
    patchShoppingItem(id,itemName,itemDescription,itemCount,itemPurchased){
        return (
            this.knex("shoppingList")
                .where({"id":id})
                .update({
                    itemName:itemName,
                    itemDescription:itemDescription,
                    itemCount:itemCount,
                    itemPurchased:itemPurchased
                },['id','itemName','itemDescription','itemCount','itemPurchased'])
                
        )
    }
/*
*   Update one shopping list item's purchased field by ID
*/
    patchShoppingItemPurchased(id,itemPurchased){
        return (
            this.knex("shoppingList")
                .where({"id":id})
                .update({
                    itemPurchased:itemPurchased
                },['id','itemName','itemDescription','itemCount','itemPurchased'])
                
        )
    }
}

module.exports = Postgres;