// @flow
const path = require("path");
const express = require("express");
const graphql = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
const {
  schema: { typeDefs },
  content,
} = require("@react-finland/content-2018");

function createRouter() {
  const router = new express.Router();

  router.all(
    "/graphql-2018",
    graphql({
      graphiql: process.env.NODE_ENV === "development",
      pretty: true,
      schema: makeExecutableSchema({
        typeDefs,
        resolvers: {
          Query: generateQueries(),
        },
      }),
    })
  );

  router.use(
    "/graphql-2018/images",
    express.static(
      path.resolve(
        __dirname,
        "..",
        "node_modules",
        "@react-finland/content-2018/images"
      )
    )
  );

  return router;
}

function generateQueries() {
  const ret = {};

  Object.keys(content).forEach(k => {
    ret[k] = () => Object.values(content[k]);
  });

  return ret;
}

module.exports = createRouter;
