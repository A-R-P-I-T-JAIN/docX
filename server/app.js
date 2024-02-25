const express = require('express');
require("dotenv").config();
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());


app.get("/",(req,res) => {
    res.json("Hello")
})

module.exports = app;