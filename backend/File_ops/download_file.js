import fs from "fs";
import path from "path";
import { check_exists } from "../Utils/fileUtils.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import asyncHandler from "express-async-handler";
const download_file = asyncHandler(async (req, res) => {
  const fname = req.body.fname;
  const dir = req.body.dir;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const base = path.join(__dirname, "..", "Files", "Users");
  const filePath = path.join(base, dir, fname);
  if (await check_exists(filePath)) {
    res.download(filePath, fname);
  } else {
    res.status(404).json({ mssg: "File not Found" });
  }
});

export default download_file;
