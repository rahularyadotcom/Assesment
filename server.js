const express = require("express")
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser')
const db = require("./config/db");
require('dotenv').config();
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
db()
const placeRouter = require("./Places/router");
const tourRouter = require("./Tours/router");

//Place Modules
app.use("/places", placeRouter);

//Tour Module
app.use("/tour", tourRouter)

app.listen(process.env.PORT, () => {
    console.log('port is running on ' + process.env.PORT);
});

