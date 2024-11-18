import express from "express";
import "reflect-metadata";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import * as http from "http";
import datasource from "./lib/datasource";

import {customAuthChecker} from "./lib/authChecker";
import UserResolver from "./resolvers/user.resolver";
const app = express();
const httpServer = http.createServer(app);

async function main() {
    const schema = await buildSchema({
        resolvers: [UserResolver],
        validate: false,
        authChecker: customAuthChecker,
    });

    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();
    app.use(expressMiddleware(server));
    await datasource.initialize();
    await new Promise<void>((resolve) => {
        console.log("server started port 4005");
        httpServer.listen({ port: 4005 }, resolve);
    });
}

main().catch(console.error);