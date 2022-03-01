import Apollo from "apollo-server";
import schema from "../gqlSchema/schema.js";
import JWT from "jsonwebtoken";
import {SubscriptionServer} from "subscriptions-transport-ws";
import HTTP from "http";
import GQL from 'graphql';

const {execute, subscribe} = GQL;
const httpServer = HTTP.createServer();
httpServer.listen(process.env.APOLLO_WS_PORT);
const apolloServer = new Apollo.ApolloServer({
    schema,
    context: (({ req}) => {
        try {
            const user = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
            return {user, isAuth: true};
        }catch (e) {
            const user = JWT.decode(req.headers.authorization, process.env.JWT_SECRET);
            return {user, isAuth: false};
        }
    })
});

export default async () => {
    SubscriptionServer.create(
        { schema, execute, subscribe},
        {path: '/subscriptions', server: httpServer}
    )
    return apolloServer.listen({port: process.env.APOLLO_HTTP_PORT});
}
