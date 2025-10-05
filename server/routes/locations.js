import express from "express";

// import controllers for events and locations
import LocationsController from "../controllers/locations.js";

const router = express.Router();

// send json containing locations data
router.get("/", LocationsController.getLocations);

// by id
router.get("/:id", LocationsController.getLocationByID);
router.get("/:id/events", LocationsController.getEventsForLocation);

// define routes to get events and locations
export default router;
