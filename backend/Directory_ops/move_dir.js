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
      const src = path.join(base, srcPath.src);
      const destPath = path.join(base, srcPath.dest);
      await fse.move(src, destPath);
      dirs_moved.push(srcPath.src);
    } catch (err){
      console.log(err)
      dirs_notmoved.push(srcPath.src);
    }
  };

  await Promise.all(req.body.map(mapfun)).then(() => {
    res.status(200).json({ dirs_moved, dirs_notmoved });
  });
});
export default move_dir;
