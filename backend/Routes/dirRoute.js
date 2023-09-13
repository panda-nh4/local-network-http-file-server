import copy_dir from "../Directory_ops/copy_dir.js";
import create_dir from "../Directory_ops/create_dir.js";
import delete_dir from "../Directory_ops/delete_dir.js";
import get_dir_info from "../Directory_ops/dir_info.js";
import get_dir_contents from "../Directory_ops/get_contents.js";
import move_dir from "../Directory_ops/move_dir.js";
import search_file from "../Directory_ops/search_file.js";
import zip_dir from "../Directory_ops/download_dir.js";
import express from "express";
import get_dir_size from "../Directory_ops/get_size.js";
import { matchLocation, matchLocationArray, matchLocations } from "../Middleware/locationMatcher.js";

const router = express.Router();

router.post("/copy",matchLocations, copy_dir);
router.post("/create", matchLocation, create_dir);
router.post("/delete", matchLocationArray,delete_dir);
router.post("/info", matchLocation, get_dir_info);
router.post("/view", matchLocation, get_dir_contents);
router.post("/move", matchLocations,move_dir);
router.post("/download", matchLocation, zip_dir);
router.post("/search", matchLocation, search_file);
router.post("/getSize", matchLocation, get_dir_size);

export default router;
