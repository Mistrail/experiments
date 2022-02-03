import User from "../../database/User.js";
import JWT from "jsonwebtoken";



export const Resolve = {

    signIn: async ({login, password}) => {
        const user = await User.authorize(login, password);
        return JWT.sign(user, process.env.JWT_SECRET);
    },

    getByUserID: (userID) => {
        return User.findOne({where: userID, isActive: 1});
    }

}
