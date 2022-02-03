import GQL from "graphql";
const {GraphQLObjectType, GraphQLID, GraphQLString} = GQL;

export const Type = new GraphQLObjectType({
    name: 'User',
    fields: ({
        userID: {
            type: GraphQLID
        },
        login: {
            type: GraphQLString
        },
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        }
    })
})

