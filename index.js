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
const { Configuration, OpenAIApi } = require("openai");

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

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function run() {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "How are you today?",
  });
  console.log(completion.data.choices[0].text);

  try {
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/service/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await serviceCollection.findOne(query);
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
