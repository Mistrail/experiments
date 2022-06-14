import GQL from "graphql";
import pubsub from "../environment/pubsub.js";
const {GraphQLString, GraphQLObjectType} = GQL;

import {Query as UserQuery} from './User/module.js';

const fields = Object.assign(
    {
        version: {type: GraphQLString, resolve: () => {
                pubsub.publish('SYSTEM', {system: [process.env.VERSION]}).then()
                return process.env.VERSION
            }
        }
    },
    UserQuery
);

export default new GraphQLObjectType({name: 'Query', fields})
