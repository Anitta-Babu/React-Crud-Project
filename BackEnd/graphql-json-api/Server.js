const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./schema");
const resolvers = require("./resolver.js");

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4001;
  app.listen(PORT, () => {
    console.log(
      `Server is running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

startServer().catch((err) => {
  console.error("Error starting the server:", err);
});
