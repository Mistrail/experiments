import {} from './globals.js'
import Apollo from "apollo-server";
import GQL from 'graphql';
const {execute, subscribe} = GQL;
import {SubscriptionServer} from 'subscriptions-transport-ws';
import schema from './gqlSchema/schema.js';
import HTTP from "http";

const httpServer = HTTP.createServer();

(async () => {
    const apolloServer = new Apollo.ApolloServer({ schema })
    const subServer = SubscriptionServer.create(
        { schema, execute, subscribe},
        {path: '/subscriptions', server: httpServer}
    )

    httpServer.listen(4001);
    await apolloServer.listen();
})().then()

