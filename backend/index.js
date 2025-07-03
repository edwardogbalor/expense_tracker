"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const graphql_passport_1 = require("graphql-passport");
const dotenv_1 = __importDefault(require("dotenv"));
const index_js_1 = __importDefault(require("./resolvers/index.js"));
const index_js_2 = __importDefault(require("./typeDefs/index.js"));
const connectDB_js_1 = require("./db/connectDB.js");
const passport_config_js_1 = require("./passport/passport.config.js");
dotenv_1.default.config();
(0, passport_config_js_1.configurePassport)();
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/expense_tracker",
        collection: "sessions",
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
const server = new server_1.ApolloServer({
    typeDefs: index_js_2.default,
    resolvers: index_js_1.default,
    plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })]
});
// Ensure we wait for our server to start
await server.start();
// and our expressMiddleware function.
app.use('/', (0, cors_1.default)({ origin: "http://localhost:3000",
    credentials: true, }), express_1.default.json(), 
// expressMiddleware accepts the same arguments:
// an Apollo Server instance and optional configuration options
(0, express4_1.expressMiddleware)(server, {
    context: async ({ req, res }) => (0, graphql_passport_1.buildContext)({ req, res }),
}));
// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, () => resolve()));
await (0, connectDB_js_1.connectDB)();
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
