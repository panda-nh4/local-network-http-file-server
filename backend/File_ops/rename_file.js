import path from "path";
import { check_exists, deleteDirInfo } from "../Utils/fileUtils.js";
import mv from "mv";
import asyncHandler from "express-async-handler";
const renameFile = asyncHandler(async (req, res) => {
  const dirPath = req.actualPath
  const renamed = [];
  const notRenamed = [];
  //   Takes in source dir, destination dir and filename
  const move_file = (src, initFname, dest, fname) => {
    return new Promise((resolve) => {
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
    res.status(200).json({err:"File name already exists."});
  } else {
    await move_file(dirPath, req.body.fname, dirPath, req.body.newName).then(
      async() => {
        await deleteDirInfo(dirPath)
        res.status(200).json({ renamed, notRenamed });
      }
    );
  }
});

export default renameFile;
