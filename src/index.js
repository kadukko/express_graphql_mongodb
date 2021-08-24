import express from "express";
import cors from "cors";
import helmet from "helmet";
import EnvironmentModule from "./modules/EnvironmentModule";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";

async function start() {
    const app = express();

    const corsOptions = {
        origin: EnvironmentModule.getCorsOrigin(),
        optionsSuccessStatus: 200,
    };

    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const httpServer = http.createServer(app);

    const apolloServer = new ApolloServer({
        resolvers,
        typeDefs,
        context: ({ req, res }) => {
            return {};
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
