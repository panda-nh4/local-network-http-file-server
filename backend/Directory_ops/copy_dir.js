import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import asyncHandler from "express-async-handler";
import fse from 'fs-extra'
const copy_dir = asyncHandler(async (req, res) => {
  const dirs_copied=[]
  const dirs_notCopied=[]

  const mapfun=async(srcPath)=>{
    try{
    const src = srcPath.srcDir
    const destPath=srcPath.destDir
    await fse.copy(src,destPath,{overwrite:false,errorOnExist:true})
    dirs_copied.push(srcPath.srcDir);}
    catch{
      dirs_notCopied.push(srcPath.srcDir)
    }
  }

  await Promise.all(req.actualPathObjs.map(mapfun)).then(()=>{
    res.status(200).json({dirs_copied,dirs_notCopied})
  })
  
});
export default copy_dir;
