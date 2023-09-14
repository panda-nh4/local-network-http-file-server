import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import asyncHandler from "express-async-handler";

const delete_dir = asyncHandler(async (req, res) => {
  const successfullyDeleted = [];
  const unableToDelete = [];
  const doesNotExist = [];
  const dirs = req.actualPathObjs;
  const delOne = async ({ dir, fname, objDir }) => {
    if (objDir === "") {
      unableToDelete.push(dir);
    } else {
      const dirPath = dir;
      try {
        await fs.promises.access(dirPath);
        try {
          await fs.promises.rm(dirPath, { recursive: true, force: true });
          successfullyDeleted.push(dir);
        } catch {
          unableToDelete.push(dir);
        }
      } catch {
        doesNotExist.push(dir);
      }
    }
  };
  await Promise.all(dirs.map(delOne)).then(() => {
    res.status(200).json({ successfullyDeleted, unableToDelete, doesNotExist });
  });
});
export default delete_dir;
