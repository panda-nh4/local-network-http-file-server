import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { getDirSize, getFileInfo } from "../Utils/fileUtils.js";
import asyncHandler from "express-async-handler";
const get_dir_contents = asyncHandler(async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const base = path.join(__dirname, "..", "Files", "Users");
  const dirPath = path.join(base, req.body.dir);
  var o = { folders: [], files: [] };
  var errors = false;
  // const error_debug=[]

  fs.access(dirPath, (err) => {
    if (!err) {
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
              errors = true;
            }
          );
        };
        await Promise.all(files.map(check_file)).then(() => {
          if (errors) {
            res.status(404).json("Error");
          } else {
            res.status(200).json(o);
          }
        });
      });
    } else {
      res.status(404).json("Path does not exist.");
    }
  });
});
export default get_dir_contents;
