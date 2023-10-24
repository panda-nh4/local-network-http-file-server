import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import fileRoute from "./Routes/fileRoute.js";
import dirRoute from "./Routes/dirRoute.js";
import mediaRoute from "./Routes/mediaRoute.js";
import path from "path";
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/file", fileRoute);
app.use("/dir", dirRoute);
app.use("/media", mediaRoute);
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "frontend", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});
// app.get("/", (req, res) => res.send("home"));
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
