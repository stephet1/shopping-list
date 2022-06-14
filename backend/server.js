require('dotenv').config({ path: '../.env' });
require('dotenv').config();  
const express = require('express');
const cors = require('cors');
const {ApolloServer} = require('apollo-server-express');
const {typeDefs} = require('./Schema/TypeDefs');
const {resolvers} = require('./Schema/Resolvers');
const Postgres = require('./Datasource/Postgres');


const port = process.env.PORT || 7331;
const knexConfig = {
    client:"pg",
    connection:{
        host : process.env.POSTGRES_SERVER,
        user : process.env.POSTGRES_USER,
        password : process.env.POSTGRES_PASSWORD,
        database : process.env.POSTGRES_DB,
        port: process.env.POSTGRES_PORT
    }
}

const DB_postgres = new Postgres(knexConfig);
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get('/',async(req,res,next)=>{
    res.status(200).json({title:'Hello World'});
});

const startServer = async (typeDefs,resolvers)=>{
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources:()=>({postgresDB:DB_postgres})
    });
    await server.start();
    server.applyMiddleware({app});
    app.listen(port,(err)=>{
        if(err) throw err;
        
        console.log(`App is listening at http://localhost:${port}`);
    }); 
}

startServer(typeDefs,resolvers);


