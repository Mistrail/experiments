import GQL from "graphql";
import {Mutation as UserMutation} from "./User/module.js"
const {GraphQLString, GraphQLObjectType} = GQL;

const fields = Object.assign({
        test: {
            type: GraphQLString,
            args: {
                request: {type: GraphQLString}
            },
            resolve: (_, {request}) => `mutation via ${request}`
        }
    },
    UserMutation
);

export default new GraphQLObjectType({name: 'Mutation', fields})
