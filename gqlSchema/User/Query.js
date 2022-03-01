import {Type} from "./Type.js";
import GQL from "graphql";
import User from "../../database/Models/User.js";
const {} = GQL;

export const Query = {
    user: {
        type: Type,
        resolve: (root, args, ctx) => User.findByPk(ctx.user.userID)
    }
}
