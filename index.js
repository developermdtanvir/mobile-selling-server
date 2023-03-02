/*
 * Title : Mobile selling website
 * Description: Mobile selling website backend
 * Author: Tanvir Hossain
 * Date : 2 March 2023
 */

// Dependencies
const express = require("express");
const cors = require("cors");
const services = require("./routes/service");

// object module scaffolding

const api = {};

// port
const port = process.env.PORT || 5000;

// create app using node js famework express js
const app = express();

// middleware
app.use(cors());

// service api
app.get("/services", services.getService);

app.get("/", (req, res) => {
  res.send("My Mongodb Server is running");
});

app.listen(port, () => console.log(`listen port ${port}`));

// export module
module.exports = api;

// username of DB : mobile-selling
// password of DB : 2JO887DHCmj0RziO
