import mv from "mv";
import path from "path";
import { check_exists } from "../Utils/fileUtils.js";
import asyncHandler from "express-async-handler";
const move_files = asyncHandler(async (req, res) => {
  const files_moved = [];
  const files_unmoved = [];

  //   Takes in source dir, destination dir and filename
  const move_file = (src, initFname, dest, fname) => {
    return new Promise((resolve) => {
      mv(path.join(src, initFname), path.join(dest, fname), (err) => {
        if (err) {
          files_unmoved.push(initFname);
        } else {
          files_moved.push(initFname);
        }
        resolve();
      });
    });
  };
  const checknMove = async (f) => {
    const src = f.srcDir;
    const fname = f.name;
    const dest = f.destDir;
    const ext = path.extname(fname);
    const new_name = path.basename(fname, ext) + "-Copy-" + Date.now() + ext;
    if (await check_exists(path.join(dest, fname))) {
      await move_file(src, fname, dest, new_name);
    } else {
      await move_file(src, fname, dest, fname);
    }
  };
  await Promise.all(req.actualPathObjs.map(checknMove)).then(() => {
    res.status(200).json({ files_moved, files_unmoved });
  });
});
export default move_files;
