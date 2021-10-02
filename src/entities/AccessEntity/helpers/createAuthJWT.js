import jwt from "jsonwebtoken";
import EnvironmentModule from "../../../modules/EnvironmentModule";

export default function createAuthJWT(data) {
    jwt.sign(data, EnvironmentModule.get(`KEY`), {
        expiresIn: Number(EnvironmentModule.get(`LOGIN_EXPIRATION`) || 604800),
    });
}
