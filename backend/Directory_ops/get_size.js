import { getDirSize } from '../Utils/fileUtils.js';
import asyncHandler from "express-async-handler";

const get_dir_size=asyncHandler(async(req,res)=>{
    const dirPath=req.actualPath
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