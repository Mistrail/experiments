import GQL from "graphql";
import pubsub from "../environment/pubsub.js";
const {GraphQLList, GraphQLString, GraphQLObjectType} = GQL;

const fields = Object.assign({
        system: {
            type: new GraphQLList(GraphQLString),
            subscribe: (root, args, context) => {
                return pubsub.asyncIterator(context.get('channels'));
            }
        }
    },
    {}
);

export default new GraphQLObjectType({name: 'Subscription', fields})
