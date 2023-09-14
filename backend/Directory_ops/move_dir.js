import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import asyncHandler from "express-async-handler";
import fse from 'fs-extra'
const move_dir = asyncHandler(async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const base = path.join(__dirname, "..", "Files", "Users");
  const dirs_moved = [];
  const dirs_notmoved = [];

  const mapfun = async (srcPath) => {
    try {
      const src = srcPath.srcDir;
      const destPath = srcPath.destDir;
      await fse.move(src, destPath);
      dirs_moved.push(srcPath.srcDir);
    } catch (err){
      console.log(err)
      dirs_notmoved.push(srcPath.srcDir);
    }
  };

  await Promise.all(req.actualPathObjs.map(mapfun)).then(() => {
    res.status(200).json({ dirs_moved, dirs_notmoved });
  });
});
export default move_dir;
