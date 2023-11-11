import fs from "fs";
import path from "path";
import { deleteDirInfo } from "../Utils/fileUtils.js";
import asyncHandler from "express-async-handler";
const delete_files = asyncHandler(async (req, res) => {
  const successfullyDeleted = [];
  const doesNotExist = [];
  const unableToDelete = [];
  const mapfun = async (fname) => {
    const filePath = path.join(fname.dir, fname.fname);
    // console.log(`File name :${filePath}`);
    try {
      await fs.promises.access(filePath);
      try {
        await fs.promises.unlink(filePath);
        successfullyDeleted.push(fname.fname);
      } catch (err) {
        unableToDelete.push(fname.fname);
        // console.log(err);
      }
    } catch (err) {
      doesNotExist.push(fname.fname);
      //   console.error(err);
    }
  };
  await Promise.all(req.actualPathObjs.map(mapfun)).then(async() => {
    // console.log(req.actualPathObjs[0].dir)
    await deleteDirInfo(req.actualPathObjs[0].dir)
    res.status(200).json({ successfullyDeleted, unableToDelete, doesNotExist });
  });
});
export default delete_files;
