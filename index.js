/*
 * Title : Mobile selling website
 * Description: Mobile selling website backend
 * Author: Tanvir Hossain
 * Date : 2 March 2023
 */

// Dependencies
const express = require("express");
const cors = require("cors");
// const services = require("./routes/service");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

// object module scaffolding

const api = {};

// port
const port = process.env.PORT || 5000;

// create app using node js famework express js
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.338egrb.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const serviceCollection = client.db(process.env.DB_USER).collection("service");
const reviewCollection = client.db(process.env.DB_USER).collection("review");

app.get("/", (req, res) => {
  res.send("My Mongodb Server is running");
});

client.connect((err) => {
  const collection = client.db(process.env.DB_USER).collection("products");

  // perform actions on the collection object
  const product = { name: "Modhu", price: 120, quantity: 30 };
  collection.insertOne(product).then((result) => {
    console.log("One product added");
  });
  console.log("database connected");
});

async function run() {
  try {
    app.get("/services", async (req, res) => {
      const query = req.query.order === 'asc' ? 1 : -1
      const cursor = serviceCollection.find({price:{ $lt: 500 }});
      const result = await cursor.sort({"price": query}).toArray();
      res.send(result);
    });

    app.get("/service/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      res.send(result);
    });

    // review section working
    // data comming from frontend and data send to backend
    app.get("/review", async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const result = await cursor.limit(1).toArray();
      res.send(result);
    });
    app.post("/review", async (req, res) => {
      const data = req.body;
      const result = await reviewCollection.insertOne(data);
      res.send(result);
    });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => console.log(`listen port ${port}`));

// export module
module.exports = api;

// username of DB : mobile-selling
// password of DB : 2JO887DHCmj0RziO
