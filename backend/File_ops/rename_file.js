import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { check_exists } from "../Utils/fileUtils.js";
import mv from "mv";
import asyncHandler from "express-async-handler";
const renameFile = asyncHandler(async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const base = path.join(__dirname, "..", "Files", "Users");
  const ext = path.extname(req.body.fname);
  const dirPath = path.join(base, req.body.dir);
  const renamed = [];
  const notRenamed = [];
  //   Takes in source dir, destination dir and filename
  const move_file = (src, initFname, dest, fname) => {
    return new Promise((resolve, reject) => {
      mv(path.join(src, initFname), path.join(dest, fname), (err) => {
        if (err) {
          notRenamed.push(fname);
        } else {
          renamed.push(fname);
        }
        resolve();
      });
    });
  };

  if (await check_exists(path.join(dirPath, req.body.newName))) {
    res.status(401).json("File name already exists.");
  } else {
    await move_file(dirPath, req.body.fname, dirPath, req.body.newName).then(
      () => {
        res.status(200).json({ renamed, notRenamed });
      }
    );
  }
});

export default renameFile;
