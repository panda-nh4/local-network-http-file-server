import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mv from "mv";
import path from "path";
import { check_exists } from "../Utils/fileUtils.js";
import asyncHandler from "express-async-handler";
const move_files = asyncHandler(async (req, res) => {
  const files_moved = [];
  const files_unmoved = [];
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const base = path.join(__dirname, "..", "Files", "Users");

  //   Takes in source dir, destination dir and filename
  const move_file = (src, initFname, dest, fname) => {
    return new Promise((resolve, reject) => {
      mv(path.join(src, initFname), path.join(dest, fname), (err) => {
        if (err) {
          files_unmoved.push(fname);
        } else {
          files_moved.push(fname);
        }
        resolve();
      });
    });
  };
  const checknMove = async (f) => {
    const src = path.join(base, f.sourceDir);
    const fname = f.fName;
    const dest = path.join(base, f.destDir);
    const ext = path.extname(fname);
    const new_name = path.basename(fname, ext) + "-Copy-" + Date.now() + ext;
    if (await check_exists(path.join(dest, fname))) {
      await move_file(src, fname, dest, new_name);
    } else {
      await move_file(src, fname, dest, fname);
    }
  };
  await Promise.all(req.body.map(checknMove)).then(() => {
    res.status(200).json({ files_moved, files_unmoved });
  });
});
export default move_files;
