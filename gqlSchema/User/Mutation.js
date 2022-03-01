import GQL from "graphql";
import User from "../../database/Models/User.js";
import {ApolloError} from "apollo-server";
import JWT from "jsonwebtoken";
import Contacts from "../../database/Models/Contacts.js";
const {GraphQLString, GraphQLNonNull, GraphQLBoolean} = GQL;

export const Mutation = {
    signIn: {
        type: GraphQLString,
        args: {
            login: {type: new GraphQLNonNull(GraphQLString)},
            password: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve: async (root, {login, password}, ctx) => {
            const user = await User.findByPk({where: {login, isActive: true}});
            if (!user) throw new ApolloError("ERR_INVALID_LOGIN");
            if (!password) throw new ApolloError("ERR_INVALID_PASSWORD");
            return JWT.sign(user.get(), process.env.JWT_SECRET);
        }
    },
    signUp: {
        type: GraphQLString,
        args: {
            login: {type: new GraphQLNonNull(GraphQLString)},
            password: {type: new GraphQLNonNull(GraphQLString)},
            firstName: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve: async (root, {login, password, firstName}) => {
            const user = await User.create({login, password}, {isNewRecord: true});
            if(user){
                await Contacts.upsert({userID: user.userID, firstName})
            }
            return JWT.sign(user.get(), process.env.JWT_SECRET);
        }
    },
    changePassword: {
        type: GraphQLString,
        args: {
            password: {type: new GraphQLNonNull(GraphQLString)},
            newPassword: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve: async (root, {password, newPassword}, ctx) => {
            if(!ctx.isAuth){
                throw new ApolloError('ERR_NOT_AUTHORIZED');
            }
            const user = await User.findByPk(ctx.user.userID)
            await user.update({password: newPassword});
            return JWT.sign(await user.get(), process.env.JWT_SECRET);
        }
    },

    deleteUser: {
        type: GraphQLBoolean,
        resolve: async (root, args, ctx) => {
            if(!ctx.isAuth){
                throw new ApolloError('ERR_NOT_AUTHORIZED');
            }
            await (await User.findByPk(ctx.user.userID)).destroy();
            return true;
        }
    }

}
