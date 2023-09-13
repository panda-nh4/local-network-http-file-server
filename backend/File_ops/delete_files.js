import fs from "fs";
import path from "path";
import asyncHandler from "express-async-handler";
const delete_files = asyncHandler(async (req, res) => {
  const successfullyDeleted = [];
  const doesNotExist = [];
  const unableToDelete = [];
  const mapfun = async (fname) => {
    const filePath = path.join(fname.dir, fname.fname);
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
  await Promise.all(req.actualPathObjs.map(mapfun)).then(() => {
    res.status(200).json({ successfullyDeleted, unableToDelete, doesNotExist });
  });
});
export default delete_files;
