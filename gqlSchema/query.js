import GQL from "graphql";
import {RedisPubSub} from "graphql-redis-subscriptions";
const pubsub = new RedisPubSub();
const {GraphQLString, GraphQLObjectType} = GQL;

const fields = Object.assign({
        version: {type: GraphQLString, resolve: () => {
                pubsub.publish('SYSTEM', {system: ["0.0.2dev"]}).then()
                return "X"
            }
        }
    },
    {}
);

export default new GraphQLObjectType({name: 'Query', fields})
