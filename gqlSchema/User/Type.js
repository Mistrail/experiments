import GQL from "graphql";
const {GraphQLObjectType, GraphQLID, GraphQLString} = GQL;

export const Type = new GraphQLObjectType({
    name: 'User',
    fields: ({
        id: {
            type: GraphQLID
        },
        guid: {
            type: GraphQLID
        },
        login: {
            type: GraphQLString
        },
        password: {
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

