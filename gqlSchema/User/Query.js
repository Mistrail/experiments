import {Type} from "./Type.js";
import {Resolve} from "./Resolve.js";
import GQL from "graphql";
const {} = GQL;

export const Query = {
    user: {
        type: Type,
        resolve: (root, args, ctx) => Resolve.getByUserID({userID: ctx.user.userID})
    }
}
