import GQL from 'graphql';
import query from "./query.js";
import mutation from "./mutation.js";
import subscription from "./subscription.js";

const {GraphQLSchema, printSchema} = GQL;

const schema = new GraphQLSchema({
    query,
    mutation,
    subscription,
});

export default schema;
