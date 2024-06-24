import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import resolvers from "./resolvers";
import { readFileSync } from "fs";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import "dotenv/config";
import express from "express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";

const typeDefs = readFileSync("./src/schema.graphql", { encoding: "utf-8" });

const checkJwt = () => {
  const check = auth({
    audience: process.env.AUTH_AUDIENCE,
    secret: process.env.AUTH_SECRET,
    issuerBaseURL: process.env.AUTH_ISSUER_BASEURL,
    tokenSigningAlg: process.env.AUTH_SIGNING_ALG,
  });
  return (req, res, next) => {
    if (!req.headers.authorization) {
      console.log("UNAUTHORIZED");
      next();
    } else {
      console.log(req.headers.authorization);
      console.log(req.headers);
      check(req, res, next);
    }
  };
};

const allowed = requiredScopes("poop");

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    "/",
    cors<cors.CorsRequest>(),
    express.json(),
    checkJwt(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        console.log(req.headers);
        return {
          token: req.headers.authorization,
        };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4001 }, resolve)
  );

  console.log(`🚀  Server ready at: localhost:4001`);
}

startServer();
