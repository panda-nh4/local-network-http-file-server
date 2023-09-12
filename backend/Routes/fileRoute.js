import express from "express";
import copy_files from "../File_ops/copy_files.js";
import delete_files from "../File_ops/delete_files.js";
import get_file_info from "../File_ops/file_info.js";
import move_files from "../File_ops/move_files.js";
import upload_files from "../File_ops/upload_files.js";
import download_file from "../File_ops/download_file.js"
import { uploadMiddleware } from "../Middleware/uploadMiddleware.js";
import renameFile from "../File_ops/rename_file.js";
import { matchLocation } from "../Middleware/locationMatcher.js";

const router=express.Router();

router.post("/copy",copy_files);
router.post("/delete",delete_files);
router.get("/info", matchLocation ,get_file_info);
router.post("/move",move_files);
router.post("/upload",uploadMiddleware,matchLocation,upload_files);
router.get("/download",matchLocation,download_file)
router.post("/rename",matchLocation,renameFile)


export default router;