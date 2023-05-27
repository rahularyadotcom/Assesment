const express = require("express");
const { addTour, getTour, updateTour, deleteTour, tourByPlace } = require("./controller");
const Router = express.Router()

Router.get("/tour-by-place-slug/:placeSlug", tourByPlace)
Router.post("/", addTour)
Router.get("/", getTour)
Router.put("/", updateTour)
Router.delete("/", deleteTour)
module.exports = Router;