import express from "express";

// import controllers for events and locations
import EventsController from "../controllers/events.js";

const router = express.Router();

// send json containing event data
router.get("/", EventsController.getEvents);

// define routes to get events and locations
export default router;
