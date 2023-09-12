import fs from "fs";
import path from "path";
import asyncHandler from "express-async-handler";

const create_dir = asyncHandler( async(req, res) => {
  const dirPath = req.actualPath
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
