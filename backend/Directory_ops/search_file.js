import fs from 'fs';
import asyncHandler from "express-async-handler";
const search_file=asyncHandler(async(req,res)=>{
    res.status(200).json("Search for a file!");
}
)
export default search_file;