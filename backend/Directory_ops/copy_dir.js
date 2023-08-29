import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import asyncHandler from "express-async-handler";
import fse from 'fs-extra'
const copy_dir = asyncHandler(async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const base = path.join(__dirname, "..", "Files", "Users");
  const dirs_copied=[]
  const dirs_notCopied=[]

  const mapfun=async(srcPath)=>{
    try{
    const src = path.join(base, srcPath.src);
    const destPath=path.join(base,srcPath.dest)
    await fse.copy(src,destPath,{overwrite:false,errorOnExist:true})
    dirs_copied.push(srcPath.src);}
    catch{
      dirs_notCopied.push(srcPath.src)
    }
  }

  await Promise.all(req.body.map(mapfun)).then(()=>{
    res.status(200).json({dirs_copied,dirs_notCopied})
  })
  
});
export default copy_dir;
