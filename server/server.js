require('dotenv').config()
require("./mongo")
const express = require('express')
const { join } = require('path')
const http = require('http');
const cookieParser = require('cookie-parser')

//apollo
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');
const { makeExecutableSchema } = require('@graphql-tools/schema');

//typeDefs and resolvers

const { typeDefs } = require('./typeDefs/typeDefs')
const postTypeDefs = require('./typeDefs/postTypedef')
const resolvers = require('./resolvers/resolvers');

//schemas

const User = require('./models/userSchema')
const Post = require('./models/postSchema')
const auth = require('./utils/auth')


//directives
const authDirectiveTransformer = require('./directives/authDirective')
const { authorizationDirectiveTransformer } = require('./directives/authorizationDirective')





async function startApolloServer(typeDefs, resolvers) {

    const app = express();
    const httpServer = http.createServer(app);
    //defaults

    // app.disable("x-powered-by")
    // app.set('trust proxy', process.env.NODE_ENV !== 'production')
    app.use(cookieParser())
    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
    app.use(auth)

    app.use(express.static(join(__dirname, "build")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "build", "index.html"))
    })

    let corsOptions = {
        // origin: ['http://localhost:3000', 'https://studio.apollographql.com',],
        origin: ['https://mayowatodo.herokuapp.com'],
        credentials: true,
    };


    let schema = makeExecutableSchema({
        typeDefs: [typeDefs, postTypeDefs],
        resolvers
    });

    schema = authDirectiveTransformer(schema, 'auth');
    schema = authorizationDirectiveTransformer(schema)


    const server = new ApolloServer({
        schema,
        context: async ({ req, res }) => {
            let { isAuth, user } = req
            // console.log({user});
            // console.log({isAuth});
            return {
                res,
                req,
                isAuth,
                user,
                User,
                Post,

            }
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });




    await server.start();


    server.applyMiddleware({
        app,
        path: '/',
        cors: corsOptions
    });

    // Modified server startup
    await new Promise(resolve => httpServer.listen({ port: process.env.PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
}



startApolloServer(typeDefs, resolvers)

