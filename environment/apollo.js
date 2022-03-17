import Apollo, {ApolloError} from "apollo-server";
import schema from "../gqlSchema/schema.js";
import {SubscriptionServer} from "subscriptions-transport-ws";
import HTTP from "http";
import GQL from 'graphql';
import getTokenData from "./getTokenData.js";
import {ERROR} from '../config/response.js'
import {Context} from './context.js'

const {execute, subscribe} = GQL;
const httpServer = HTTP.createServer();
const context = new Context();

httpServer.listen(process.env.APOLLO_WS_PORT);
const apolloServer = new Apollo.ApolloServer({
    schema,
    cors: ['*:*'],
    context: (({ req}) => {
        const userData = getTokenData(req.headers.authorization);
        context.bind(userData);
        context.bind({channels: ['SYSTEM', `USER:${userData.user.userID}`]});
        return context;
    })
});


export default async () => {
    SubscriptionServer.create(
        { schema, execute, subscribe, onConnect: (connectionParams, webSocket) => {
                const {Authorization: token = null} = connectionParams;
                if(!token || !getTokenData(token).isAuth){
                    throw new ApolloError(ERROR.ERR_NOT_AUTH)
                }
                const userData = getTokenData(token);
                context.bind(userData);
                context.bind({channels: ['SYSTEM', `USER:${userData.user.userID}`]});
                return context;
            }},
        {path: '/subscriptions', server: httpServer}
    )
    return apolloServer.listen({port: process.env.APOLLO_HTTP_PORT});
}
