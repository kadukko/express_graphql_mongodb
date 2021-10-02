import cookieParser from "cookie-parser";
import decodeJWT from "../helpers/decodeJWT";
import EnvironmentModule from "./EnvironmentModule";

const CookieModule = () => ({
    applyMiddleware(app) {
        app.use(cookieParser(EnvironmentModule.get("KEY")));

        app.use(async (req, res, next) => {
            const hasCookie = Object.prototype.hasOwnProperty.call(
                req.cookies,
                "authToken"
            );

            if (hasCookie) {
                const auth = await decodeJWT(req.cookies.authToken);

                if (auth?.type === "login" && auth?.ipAddress === req.ip) {
                    req.auth = auth;
                }
            }

            next();
        });
    },
});

export default CookieModule();
