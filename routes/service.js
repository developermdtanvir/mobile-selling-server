/*
 * Title : Mobile selling website
 * Description: Mobile selling website backend
 * Author: Tanvir Hossain
 * Date : 2 March 2023
 */

// Dependencies
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// object module scaffolding
const service = {};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.338egrb.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

console.log(uri);

service.getService = (req, res) => {
  res.send("Service API Hear");
};

// module export
module.exports = service;
