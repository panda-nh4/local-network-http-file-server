import mv from "mv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { check_exists } from "../Utils/fileUtils.js";
import asyncHandler from "express-async-handler";
const upload_files = asyncHandler(async (req, res) => {
  const upload_error = [];
  const success_upload = [];
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const base = path.join(__dirname, "..", "Files", "Users");

  //   Takes in source dir, destination dir and filename
  const move_file = (src, initFname, dest, fname) => {
    return new Promise((resolve, reject) => {
      mv(path.join(src, initFname), path.join(dest, fname), (err) => {
        if (err) {
          console.log(err);
          upload_error.push(fname);
        } else {
          success_upload.push(fname);
        }
        resolve();
      });
    });
  };
  const checknMove = async (f) => {
    const src = path.dirname(f.path);
    const fname = f.filename;
    const dest = path.join(base, req.body.dest);
    const ext = path.extname(fname);
    const new_name = path.basename(fname, ext) + "-Copy-" + Date.now() + ext;
    if (await check_exists(path.join(dest, fname))) {
      await move_file(src, fname, dest, new_name);
    } else {
      await move_file(src, fname, dest, fname);
    }
  };
  await Promise.all(req.files.map(checknMove)).then(() => {
    res.status(200).json({ success_upload, upload_error });
  });
});

export default upload_files;
