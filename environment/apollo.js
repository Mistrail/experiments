import Apollo from "apollo-server";
import schema from "../gqlSchema/schema.js";
import {SubscriptionServer} from "subscriptions-transport-ws";
import HTTP from "http";
import GQL from 'graphql';
import getTokenData from "./getTokenData.js";

const {execute, subscribe} = GQL;
const httpServer = HTTP.createServer();
httpServer.listen(process.env.APOLLO_WS_PORT);
const apolloServer = new Apollo.ApolloServer({
    schema,
    context: (({ req}) => {
        return getTokenData(req.headers.authorization);
    })
});

export default async () => {
    SubscriptionServer.create(
        { schema, execute, subscribe, onConnect: d},
        {path: '/subscriptions', server: httpServer}
    )
    return apolloServer.listen({port: process.env.APOLLO_HTTP_PORT});
}
