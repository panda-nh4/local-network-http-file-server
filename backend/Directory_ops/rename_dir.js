import fs from 'fs';
import asyncHandler from "express-async-handler";
const renameDir=asyncHandler(async(req,res)=>{
    res.status(200).json("rename dir!");
}
)
export default renameDir;