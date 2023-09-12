import path from "path";
import { check_exists } from "../Utils/fileUtils.js";
import asyncHandler from "express-async-handler";
const download_file = asyncHandler(async (req, res) => {
  const fname = req.body.fname;
  const base = req.actualPath;
  const filePath = path.join(base ,fname);
  if (await check_exists(filePath)) {
    res.download(filePath, fname);
  } else {
    res.status(404).json({ mssg: "File not Found" });
  }
});

export default download_file;
