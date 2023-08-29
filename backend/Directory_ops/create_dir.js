import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import asyncHandler from "express-async-handler";

const create_dir = asyncHandler( async(req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const base = path.join(__dirname, "..", "Files", "Users");
  const dirPath = path.join(base, req.body.dir);
  fs.access(dirPath,(err)=>{
    if (!err){
      fs.mkdir(path.join(dirPath,req.body.name),(err)=>{
        if(!err){
          res.status(200).json(`${req.body.name} created successfully.`)
        }
        else{
          res.status(400).json(`Error occured : ${err.code}`)
        }
      })
    }
    else{
      res.status(404).json("Path does not exist.")
    }
  })
}
)

export default create_dir;
