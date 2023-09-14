import path from "path";
import { check_exists } from "../Utils/fileUtils.js";
import asyncHandler from "express-async-handler";
import locations from "../../locations.js";
const download_file = asyncHandler(async (req, res) => {
  const fname = req.query.fname;
  const match = req.query.base;
  const dir = req.query.dir;
  const location = locations.find((item) => item[match]);
  if (!location) {
    res.status(401).json("Unauthorised");
  } else {
    const actualPath = path.join(location[match], dir);
    const filePath = path.join(actualPath, fname);
    if (await check_exists(filePath)) {
      res.download(filePath, fname);
    } else {
      res.status(404).json({ mssg: "File not Found" });
    }
  }
});

export default download_file;
