import path from "path";
import locations from "../../locations.js";

const matchLocationArray = (req, res, next) => {
  req.actualPathObjs = [];
  var fail = 0;
  req.body.paths.map((obj) => {
    const match = obj.base;
    const location = locations.find((item) => item[match]);
    if (!location) {
      fail += 1;
    } else {
      const actualPath = path.join(location[match], obj.dir);
      const newObj = {
        dir: actualPath,
        fname: obj.fname,
        objDir:obj.dir
      };
      req.actualPathObjs = [...req.actualPathObjs, newObj];
    }
  });
  if (fail === 0) next();
  else res.status(401).json("Unauthorised");
};

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

const matchLocations = (req, res, next) => {
  req.actualPathObjs = [];
  var fail = 0;
  req.body.map((obj) => {
    const matchSrc = obj.srcDir.base;
    const matchDest = obj.destDir.base;
    const locationSrc = locations.find((item) => item[matchSrc]);
    const locationDest = locations.find((item) => item[matchDest]);
    if (!locationSrc || !locationDest) {
      fail += 1;
    } else {
      const actualSrc = path.join(locationSrc[matchSrc], obj.srcDir.dir);
      const actualDest = path.join(locationDest[matchDest], obj.destDir.dir);
      const newObj = {
        srcDir: actualSrc,
        destDir: actualDest,
        name: obj.name,
      };
      req.actualPathObjs = [...req.actualPathObjs, newObj];
    }
  });
  if (fail === 0) next();
  else res.status(401).json("Unauthorised");
};

export { matchLocation, matchLocations, matchLocationArray };
