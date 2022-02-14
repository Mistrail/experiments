import GQL from 'graphql';
import query from "./query.js";
import mutation from "./mutation.js";
import subscription from "./subscription.js";

const {GraphQLSchema} = GQL;

const schema = new GraphQLSchema({
    query,
    mutation,
    subscription,
    description: "Basic schema for Experimental host"
});

export default schema;
