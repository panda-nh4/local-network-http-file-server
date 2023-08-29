import fs from "fs";
import { promisify } from "util";
import fastFolderSize from "fast-folder-size";
import { resolve } from "path";

//   Takes in a file path
//   Returns true if file exists else returns false
const check_exists = async (filePath) => {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch (err) {
    return false;
  }
};
//takes in file path returns details
const getInfo = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject({ fileInfo: "Not Found" });
      }
      resolve(stats);
    });
  });
};

// // Get size in appropriate magnitude
// const getProperSize=async(s)=>{
//   const units=["Bytes", "KB", "MB", "GB", "TB"]
//   if (s==0){
//     return "0 Bytes"
//   }
//   else{
//     const index= parseInt(Math.floor(Math.log(s)/Math.log(1024)))
//     if (index===0){
//       return s+" "+"Bytes"
//     }
//     else{
//       return (s/Math.pow(1024,index)).toFixed(2)+ " "+units[index]
//     }
//   }
// }
const getDirSize = async (dirPath) => {
  return new Promise((resolve, reject) => {
    fastFolderSize(dirPath, (err, bytes) => {
      if (err) {
        reject({ err });
      } else {
        resolve({ size: bytes });
      }
    });
  });
};
export { check_exists, getInfo as getFileInfo ,getDirSize};
