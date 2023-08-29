import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { getDirSize, getFileInfo } from '../Utils/fileUtils.js';
import asyncHandler from "express-async-handler";

const get_dir_size=asyncHandler(async(req,res)=>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const base = path.join(__dirname, "..", "Files", "Users");
    const dirPath=path.join(base,req.body.dir)
    await getDirSize(dirPath).then(
        (result)=>{
            res.status(200).json(result)
        },
        (err)=>{
            res.status(404).json({"Error occured : ":err.err.code})
        }
    )


})




export default get_dir_size