import GQL from 'graphql'
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = GQL

export const Type = new GraphQLObjectType({
	name: 'Permissions',
	description: 'Access permissions to different parts of service for each customer',
	fields: ({
		entity: {
			type: GraphQLString,
			allowNull: false,
		},
		entity_id: {
			type: GraphQLID,
			allowNull: false,
		}
	})
})
