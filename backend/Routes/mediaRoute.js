import express from "express";
import getMediaLocations from "../MediaLocations/getLocations.js";

const router = express.Router();

router.post("/locations", getMediaLocations);

export default router;
