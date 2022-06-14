import GQL, {GraphQLList} from 'graphql';
import {Contacts, Permissions} from '../../database/models.js';
import {Type as ContactsType} from '../Contacts/module.js'
import {Type as PermissionsType} from '../Permissions/module.js'

const {GraphQLObjectType, GraphQLID, GraphQLString} = GQL;

export const Type = new GraphQLObjectType({
    name: 'User',
    description: 'Root level of customer`s data environment & authentication',
    fields: ({
        guid: {
            type: GraphQLID
        },
        login: {
            type: GraphQLString
        },
        password: {
            description: 'virtual field returns ******** on all queries',
            type: GraphQLString,
        },
        contacts: {
            type: ContactsType,
            description: ContactsType.description,
            resolve: (root) => Contacts.findOne({where: {users_id: root.id}})
        },
        permissions: {
            type: new GraphQLList(PermissionsType),
            description: PermissionsType.description,
            resolve: (root) => Permissions.findAll({where: {users_id: root.id}}).get()
        },
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        }
    })
})

