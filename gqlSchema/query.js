import GQL from "graphql"
import pubSub from "../environment/pubsub.js"
import {Query as UserQuery} from './User/module.js'

const {GraphQLString, GraphQLObjectType} = GQL

const globalQueries = {
    version: {type: GraphQLString, resolve: () => {
            pubSub.publish('SYSTEM', {system: [process.env.VERSION]}).then()
            return process.env.VERSION
        }
    }
}

const fields = Object.assign(
    globalQueries,
    UserQuery
);

export default new GraphQLObjectType({name: 'Query', fields})
