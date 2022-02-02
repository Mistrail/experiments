import GQL from "graphql";

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
    {}
);

export default new GraphQLObjectType({name: 'Mutation', fields})
