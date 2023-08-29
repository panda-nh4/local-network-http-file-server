import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { check_exists } from "../Utils/fileUtils.js";
import fs from 'fs'
import asyncHandler from "express-async-handler";
const copy_files = asyncHandler(async (req, res) => {
  const filesCopied = [];
  const filesNotCopied = [];
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const base = path.join(__dirname, "..", "Files", "Users");
  const copyFile = (srcDir, fname, dest, newName) => {
    return new Promise((resolve, reject) => {
      const srcPath = path.join(srcDir, fname);
      const destPath = path.join(dest, newName);
      fs.copyFile(srcPath, destPath, (err) => {
        if (err) {
          // console.log(err)
          filesNotCopied.push(fname)
          resolve()
        }else{
        filesCopied.push(newName)
        resolve();}
      });
    });
  };
  const checknCopy=async(f)=>{
    const srcDir=path.join(base,f.srcDir)
    const fname=f.name
    const destDir=path.join(base,f.destDir)
    const ext = path.extname(fname);
    const new_name = path.basename(fname, ext) + "-Copy-" + Date.now() + ext;
    if (await check_exists(path.join(destDir,fname))){
        await copyFile(srcDir,fname,destDir,new_name)
    }
    else{
        await copyFile(srcDir,fname,destDir,fname)
    }
  }
  await Promise.all(req.body.map(checknCopy)).then(()=>{
    res.status(200).json({filesCopied,filesNotCopied});
  })

});

export default copy_files;
