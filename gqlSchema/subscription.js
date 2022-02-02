import GQL from "graphql";
import {RedisPubSub} from "graphql-redis-subscriptions";
const pubsub = new RedisPubSub();
const {GraphQLList, GraphQLString, GraphQLObjectType} = GQL;

const fields = Object.assign({
        system: {
            type: new GraphQLList(GraphQLString),
            subscribe: () => pubsub.asyncIterator(["SYSTEM"])
        }
    },
    {}
);

export default new GraphQLObjectType({name: 'Subscription', fields})
