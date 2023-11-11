import fs from "fs";
import path from "path";
import { getDirSize, getFileInfo } from "../Utils/fileUtils.js";
import asyncHandler from "express-async-handler";
const get_dir_contents = asyncHandler(async (req, res) => {
  const dirPath = req.actualPath;
  const jsonFile = path.join(dirPath, "dirInfo.json");
  // console.log(jsonFile)
  var o = { folders: [], files: [] };
  var errors = false;
  // const error_debug=[]
  fs.access(dirPath, (err) => {
    if (!err) {
      fs.readFile(jsonFile, "utf-8", (err, data) => {
        if (err) {
          fs.readdir(dirPath, async (err, files) => {
            const check_file = async (file) => {
              const file_name = path.join(dirPath, file);
              await getFileInfo(file_name).then(
                async (result) => {
                  result.fName = file;
                  if (result.isDirectory()) {
                    await getDirSize(path.join(dirPath, file)).then((res1) => {
                      result.actualSize = res1.size;
                      o["folders"].push(result);
                    });
                  } else {
                    o["files"].push(result);
                  }
                },
                (err) => {
                  console.log(err, file_name);
                  errors = true;
                }
              );
            };
            await Promise.all(files.map(check_file)).then(() => {
              if (errors && o.files.length === 0 && o.folders.length === 0) {
                res.status(500).json("Error");
              } else {
                if(o.files.length === 0 && o.folders.length === 0){
                  o={files:[],folders:[]}
                }
                fs.writeFile(jsonFile, JSON.stringify(o), {encoding:'utf8',flag:"w"},(err)=>{
                  if(err){
                    console.log("Error writing data")
                  }
                  res.status(200).json(o);
                } );
              }
            });
          });
        }
        else{
          try{
          const dir_data = JSON.parse(data);
          res.status(200).json(dir_data)}
          catch{
            res.status(500).json("Error")
          }
        }
      });
    } else {
      res.status(404).json("Path does not exist.");
    }
  });
});
export default get_dir_contents;
