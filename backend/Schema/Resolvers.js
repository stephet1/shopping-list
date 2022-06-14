
const resolvers = {
    Query:{
        async getAllShoppingItems(_,__,{dataSources}){
            const result = await dataSources.postgresDB.getAllShoppingItems();
            return result;
        },
        async getShoppingItem(_,{id},{dataSources}){
            const result = await dataSources.postgresDB.getShoppingItem(id);
            return result;
        }
    },

    Mutation:{
        async createShoppingItem(_,{itemName,itemDescription,itemCount},{dataSources}){
            const result = await dataSources.postgresDB.postShoppingItem(itemName,itemDescription,itemCount);
            return result[0];
        },
        async deleteShoppingItem(_,{id},{dataSources}){
            const result = await dataSources.postgresDB.deleteShoppingItem(id);
            return result[0]?true:false;
        },
        async patchShoppingItem(_,{id,itemName,itemDescription,itemCount,itemPurchased},{dataSources}){

            const result = await dataSources.postgresDB.patchShoppingItem(id,itemName,itemDescription,itemCount,itemPurchased);
            return result[0];
        },
        async patchShoppingItemPurchased(_,{id,itemPurchased},{dataSources}){
            const result = await dataSources.postgresDB.patchShoppingItemPurchased(id,itemPurchased);
            return result[0];
        }
    }
};


module.exports = {resolvers};

