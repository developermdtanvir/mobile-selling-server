/*
 * Title : Mobile selling website
 * Description: Mobile selling website backend
 * Author: Tanvir Hossain
 * Date : 2 March 2023
 */

// Dependencies
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// object module scaffolding
const service = {};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.338egrb.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

const client = new MongoClient(uri);

const db = client.db("mobile-selling");
const serviceCollection = db.collection("service");
async function run() {
  try {
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
// module export
module.exports = run;
