import User from "../../database/Models/User.js";
import JWT from "jsonwebtoken";
import {ApolloError} from "apollo-server";
import Contacts from "../../database/Models/Contacts.js";

export const Resolve = {
    signIn: async ({login, password}) => {
        const user = await User.findOne({where: {login, isActive: true}});
        if (!user) throw new ApolloError("ERR_INVALID_LOGIN");
        if (!password) throw new ApolloError("ERR_INVALID_PASSWORD");

        return JWT.sign(user.get(), process.env.JWT_SECRET);
    },

    signUp: async ({login, password, firstName}) => {
        const user = await User.create({login, password}, {isNewRecord: true});
        if(user){
            await Contacts.upsert({userID: user.userID, firstName})
        }
        return JWT.sign(user.get(), process.env.JWT_SECRET);
    },

    getByUserID: ({userID}) => {
        return User.findOne({where: {userID, isActive: true}});
    }

}
