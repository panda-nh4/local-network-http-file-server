import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import asyncHandler from "express-async-handler";
import { deleteDirInfo } from "../Utils/fileUtils.js";

const delete_dir = asyncHandler(async (req, res) => {
  const successfullyDeleted = [];
  const unableToDelete = [];
  const doesNotExist = [];
  const dirs = req.actualPathObjs;
  const delOne = async ({ dir, fname, objDir }) => {
    if (objDir === "" && fname==="") {
      unableToDelete.push(fname);
    } else {
      const dirPath = path.join(dir,fname);
      try {
        await fs.promises.access(dirPath);
        try {
          await fs.promises.rm(dirPath, { recursive: true, force: true });
          successfullyDeleted.push(fname);
        } catch {
          unableToDelete.push(fname);
        }
      } catch {
        doesNotExist.push(dir);
      }
    }
  };
  await Promise.all(dirs.map(delOne)).then(async() => {
    await deleteDirInfo(dirs[0].dir)
    res.status(200).json({ successfullyDeleted, unableToDelete, doesNotExist });
  });
});
export default delete_dir;
