import path from "path";
import { getFileInfo } from "../Utils/fileUtils.js";
import asyncHandler from "express-async-handler";
const get_file_info =asyncHandler(async (req, res) => {
  const base = req.actualPath;
  const ext = path.extname(req.body.fname);
  await getFileInfo(path.join(base, req.body.fname)).then(
    (result) => {
      result.isDir=result.isDirectory()
      result.name = path.basename(req.body.fname, ext);
      result.extension = ext;
      result.path = req.body.base.concat("/",req.body.dir);
      res.status(200).json(result);
    },
    (err) => {
      res.status(404).json(err);
    }
  );
});

export default get_file_info;
