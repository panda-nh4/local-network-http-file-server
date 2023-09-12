import { getFileInfo } from '../Utils/fileUtils.js';
import asyncHandler from "express-async-handler";
const get_dir_info=asyncHandler(async(req,res)=>{
    const dirPath=req.actualPath
    await getFileInfo(dirPath).then(
        async(result)=>{
            result.isDir=result.isDirectory()
            
            res.status(200).json(result)
        },
        (err)=>{
            res.status(404).json(err)
        }
    )
}
)
export default get_dir_info;