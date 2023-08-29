import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import asyncHandler from "express-async-handler";
const delete_files =asyncHandler(async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const base = path.join(__dirname, "..", "Files", "Users");
  const fnames = req.body.fpath;
  const successfullyDeleted = [];
  const doesNotExist = [];
  const unableToDelete = [];
  const mapfun = async (fname) => {
    const filePath = path.join(base, fname.dir, fname.fname);
    // console.log(`File name :${filePath}`);
    try {
      await fs.promises.access(filePath);
      try {
        await fs.promises.unlink(filePath);
        successfullyDeleted.push(fname.fname);
      } catch (err) {
        unableToDelete.push(fname.fname);
        // console.log(err);
      }
    } catch (err) {
      doesNotExist.push(fname.fname);
      //   console.error(err);
    }
  };
  await Promise.all(fnames.map(mapfun)).then(() => {
    res.status(200).json({ successfullyDeleted, unableToDelete, doesNotExist });
  });
});
export default delete_files;
