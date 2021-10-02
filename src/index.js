import express from "express";
import cors from "cors";
import helmet from "helmet";
import EnvironmentModule from "./modules/EnvironmentModule";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import database from "./database";
import CookieModule from "./modules/CookieModule";

async function start() {
    await database.start();

    const app = express();

    const corsOptions = {
        origin: EnvironmentModule.getCorsOrigin(),
        optionsSuccessStatus: 200,
    };

    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    CookieModule.applyMiddleware(app);

    const httpServer = http.createServer(app);

    const apolloServer = new ApolloServer({
        resolvers,
        typeDefs,
        context: ({ req, res }) => {
            if (!database.isConnected()) {
                return res.status(500).send({ error: "DATABASE_OFFLINE" });
            }

            return {
                auth: req.auth,
                ipAddress: req.ip,
            };
        },
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: "/graphql" });

    const port = EnvironmentModule.getPort();

    httpServer.listen({ port }, () => {
        const publicUrl = EnvironmentModule.getPublicUrl();
        console.log(`Server ready at ${publicUrl}`);
    });
}

start();
