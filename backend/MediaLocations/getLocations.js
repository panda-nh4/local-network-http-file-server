import AsyncHandler from "express-async-handler";
import locations from "../../locations.js";

const getMediaLocations = AsyncHandler(async (req, res) => {
  var locs = [];
  await Promise.all(locations.map((_) => locs.push(Object.keys(_)[0]))).then(
    res.status(200).json(locs)
  );
});

export default getMediaLocations;
