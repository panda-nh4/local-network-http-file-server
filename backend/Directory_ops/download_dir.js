import fs from 'fs';
import asyncHandler from "express-async-handler";
const zip_dir=asyncHandler(async(req,res)=>{
    res.status(200).json("Download dir!");
}
)
export default zip_dir;