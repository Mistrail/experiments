import JWT from "jsonwebtoken";

export default function (token){
    try {
        const user = JWT.verify(token, process.env.JWT_SECRET);
        return {user, isAuth: true};
    }catch (e) {
        const user = JWT.decode(token, process.env.JWT_SECRET);
        return {user, isAuth: false};
    }
}
