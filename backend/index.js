import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import mergedResolvers from './resolvers/index.js';
import mergedTypeDefs from './typeDefs/index.js';

const server = new ApolloServer ({
typeDefs: mergedTypeDefs,
resolvers: mergedResolvers,
});

const {url} = await startStandaloneServer (server);
console. log(`& Server ready at ${url}*`);