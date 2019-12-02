const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(cors());

mongoose.connect(
  `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cocktails-shard-00-00-akrnn.gcp.mongodb.net:27017,cocktails-shard-00-01-akrnn.gcp.mongodb.net:27017,cocktails-shard-00-02-akrnn.gcp.mongodb.net:27017/cocktails?ssl=true&replicaSet=Cocktails-shard-0&authSource=admin&retryWrites=true&w=majority`
);

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
