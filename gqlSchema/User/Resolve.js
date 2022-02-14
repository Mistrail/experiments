import User from "../../database/Models/User.js";
import JWT from "jsonwebtoken";
import {ApolloError} from "apollo-server";

export const Resolve = {

    signIn: async ({login, password}) => {
        const user = await User.authorize(login, password);
        return JWT.sign(user, process.env.JWT_SECRET);
    },

    signUp: async ({login, password}) => {
        const user = await User.create({login, password}, {isNewRecord: true});
        return JWT.sign(user.get(), process.env.JWT_SECRET);
    },

    getByUserID: (userID) => {
        return User.findOne({where: userID, isActive: true});
    }

}
