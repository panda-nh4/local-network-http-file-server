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

const router=express.Router();

router.post("/copy",copy_dir)
router.post("/create",create_dir)
router.post("/delete",delete_dir)
router.get('/info',get_dir_info)
router.get('/view',get_dir_contents)
router.post('/move',move_dir)
router.post('/download',zip_dir)
router.post('/search',search_file)
router.post('/getSize',get_dir_size)

export default router;