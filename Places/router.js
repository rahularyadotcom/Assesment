const express = require("express");
const { addPlaces, getPlaces, updatePlaces, deletePlaces, placeTree } = require("./controller");
const Router = express.Router()

Router.get("/tree", placeTree)
Router.post("/", addPlaces)
Router.get("/", getPlaces)
Router.put("/", updatePlaces)
Router.delete("/", deletePlaces)
module.exports = Router;