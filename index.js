import globals from './globals.js'
import Apollo from "apollo-server";
import GQL from 'graphql';
const {execute, subscribe} = GQL;
import {SubscriptionServer} from 'subscriptions-transport-ws';
import schema from './gqlSchema/schema.js';
import HTTP from "http";
import JWT from "jsonwebtoken";

const httpServer = HTTP.createServer();
const WS_PORT = 4001;

import User from "./database/User.js";

(async () => {
    const apolloServer = new Apollo.ApolloServer({
        schema,
        context: (({req}) => {
            try {
                const user = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
                return {user, isAuth: true};
            }catch (e) {
                const user = JWT.decode(req.headers.authorization, process.env.JWT_SECRET);
                return {user, isAuth: false};
            }
        })
    } )
    SubscriptionServer.create(
        { schema, execute, subscribe},
        {path: '/subscriptions', server: httpServer}
    )
    httpServer.listen(WS_PORT);
    await apolloServer.listen();
})().then()

