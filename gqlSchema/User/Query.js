import {Type} from "./Type.js";
// import GQL from "graphql";
import {Users} from "../../database/models.js";

export const Query = {
    user: {
        type: Type,
        resolve: (root, args, ctx) => Users.findByPk(ctx.user?.id)
    }
}
