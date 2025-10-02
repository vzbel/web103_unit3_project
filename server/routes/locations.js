import express from "express";

// import controllers for events and locations
import LocationsController from "../controllers/locations.js";

const router = express.Router();

// send json containing locations data
router.get("/", LocationsController.getLocations);

// define routes to get events and locations
export default router;
