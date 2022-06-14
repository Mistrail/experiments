import GQL from 'graphql'
const {GraphQLObjectType, GraphQLString} = GQL

export const Type = new GraphQLObjectType({
	name: 'Contacts',
	description: 'Type to contain personal data about customer',
	fields: ({
		firstName:  {type: GraphQLString},
		lastName:  {type: GraphQLString},
	})
})
