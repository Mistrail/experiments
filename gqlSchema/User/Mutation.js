import {Type} from "./Type.js";
import {Resolve} from "./Resolve.js";
import GQL from "graphql";
const {GraphQLString, GraphQLNonNull} = GQL;

export const Mutation = {
    signIn: {
        type: GraphQLString,
        args: {
            login: {type: new GraphQLNonNull(GraphQLString)},
            password: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve: (root, {login, password}) => Resolve.signIn({login, password}, )
    },
    signUp: {
        type: GraphQLString,
        args: {
            login: {type: new GraphQLNonNull(GraphQLString)},
            password: {type: new GraphQLNonNull(GraphQLString)},
            firstName: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve: (root, {login, password, firstName}) => Resolve.signUp({login, password, firstName})
    }

}
