import GQL from "graphql";
import {Mutation as UserMutation} from "./User/module.js"
const {GraphQLString, GraphQLObjectType} = GQL;

const fields = Object.assign({},
    UserMutation
);

export default new GraphQLObjectType({name: 'Mutation', fields})
