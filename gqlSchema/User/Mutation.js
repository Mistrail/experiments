import GQL from "graphql";
import {Users} from "../../database/models.js";
import {ApolloError} from "apollo-server";
import JWT from "jsonwebtoken";
const {GraphQLString, GraphQLNonNull, GraphQLBoolean} = GQL;

export const Mutation = {
    signIn: {
        type: GraphQLString,
        args: {
            login: {type: new GraphQLNonNull(GraphQLString)},
            password: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve: async (root, {login, password}) => {
            const user = await Users.findOne({where: {login}});
            if (!user) throw new ApolloError("ERR_INVALID_LOGIN");
            if (!password) throw new ApolloError("ERR_INVALID_PASSWORD");
            if(!user.isAuth({password})){
                throw new ApolloError('ERR_NOT_AUTHORIZED');
            }
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
            const user = await Users.create({login, password}, {isNewRecord: true});
            if(user){
                // await Contacts.upsert({userID: user.userID, firstName});
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
            const user = await Users.findByPk(ctx.user.id);
            await user.update({password: newPassword});
            return JWT.sign(await user.get(), process.env.JWT_SECRET);
        }
    },
    changeLogin: {
        type: GraphQLString,
        args: {
            newLogin: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve: async (root, {newLogin}, ctx) => {
            if(!ctx.isAuth){
                throw new ApolloError('ERR_NOT_AUTHORIZED');
            }
            const user = await Users.findByPk(ctx.user.id);
            await user.update({login: newLogin});
            return JWT.sign(await user.get(), process.env.JWT_SECRET);
        }
    },
    delete: {
        type: GraphQLBoolean,
        resolve: async (root, args, ctx) => {
            if(!ctx.isAuth){
                throw new ApolloError('ERR_NOT_AUTHORIZED');
            }
            await (await Users.findByPk(ctx.user.id)).destroy();
            return true;
        }
    }
}
