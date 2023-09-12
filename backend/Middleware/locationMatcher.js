import path from "path";
import locations from "../../locations.js"

const matchLocation = (req, res, next) => {
  const match = req.body.base;
  const location = locations.find((item) => item[match]);
  if (!location) {
    res.status(401).json("Unauthorised");
  } else {
    req.actualPath = path.join(location[match], req.body.dir);
    next();
  }
};

const matchLocations=(req,res,next)=>{
  
}

export { matchLocation };
