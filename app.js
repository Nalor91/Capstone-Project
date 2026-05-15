const express = require('express');
const bodyParser = require('body-parser');
const { createHandler } = require('graphql-http/lib/use/express');
const mongoose = require('mongoose');
require('dotenv').config();
const isAuth = require('./middleware/is-auth');

const graphQLResolvers = require('./graphql/resolvers/index');
const graphQLSchema = require('./graphql/schema/index');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);

app.all(
    '/graphql',
    (req, res) =>
     createHandler({
        schema: graphQLSchema,
        rootValue: graphQLResolvers,
        graphiql: true,
        context: () => req.raw || req           
     })(req, res)
    );

mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD
    }@cluster0.gj4qssk.mongodb.net/${process.env.MONGO_DB}`  
    )
    .then(() => {
        app.listen(8000);
    })
    .catch(err => {
        console.log(err);
    });