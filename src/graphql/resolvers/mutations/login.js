import AccessEntity from "../../../entities/AccessEntity";
import createAuthJWT from "../../../entities/AccessEntity/helpers/createAuthJWT";

export default {
    Mutation: {
        login: async (_, { username, password }, { ipAddress }) => {
            const access = AccessEntity.getByLogin(username, password);

            if (!access) throw new Error("INVALID_LOGIN");

            const token = createAuthJWT({
                type: "login",
                accessId: access._id,
                ipAddress,
            });

            res.setHeader("Set-Cookie", `authToken=${token}; HttpOnly; Path=/`);

            return true;
        },
    },
};
