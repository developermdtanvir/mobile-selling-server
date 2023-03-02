/*
 * Title : Mobile selling website
 * Description: Mobile selling website backend
 * Author: Tanvir Hossain
 * Date : 2 March 2023
 */

// Dependencies
const express = require("express");
const cors = require("cors");

// object module scaffolding

const api = {};

// port
const port = process.env.PORT || 5000;

// create app using node js fremework express js
const app = express();

// middleware
app.use(cors());

app.get("/", (req, res) => {
  res.send("My Mongodb Server is running");
});

app.listen(port, () => console.log(`listen port ${port}`));

module.exports = api;
