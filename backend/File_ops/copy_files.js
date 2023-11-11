import path from "path";
import { check_exists, deleteDirInfo } from "../Utils/fileUtils.js";
import fs from "fs";
import asyncHandler from "express-async-handler";
const copy_files = asyncHandler(async (req, res) => {
  const filesCopied = [];
  const filesNotCopied = [];
  const copyFile = (srcDir, fname, dest, newName) => {
    return new Promise((resolve) => {
      const srcPath = path.join(srcDir, fname);
      const destPath = path.join(dest, newName);
      fs.copyFile(srcPath, destPath, (err) => {
        if (err) {
          // console.log(err)
          filesNotCopied.push(fname);
          resolve();
        } else {
          filesCopied.push(newName);
          resolve();
        }
      });
    });
  };
  const checknCopy = async (f) => {
    const srcDir = f.srcDir;
    const fname = f.name;
    const destDir = f.destDir;
    const ext = path.extname(fname);
    const new_name = path.basename(fname, ext) + "-Copy-" + Date.now() + ext;
    if (await check_exists(path.join(destDir, fname))) {
      await copyFile(srcDir, fname, destDir, new_name);
    } else {
      await copyFile(srcDir, fname, destDir, fname);
    }
  };
  await Promise.all(req.actualPathObjs.map(checknCopy)).then(async() => {
    await deleteDirInfo(req.actualPathObjs[0].destDir)
    res.status(200).json({ filesCopied, filesNotCopied });
  });
});

export default copy_files;
