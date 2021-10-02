import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
/* const CONNECT_URL =
  "mongodb+srv://Henry2601:43653661@cluster0.eaztt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; */

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECT_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
  )
  .catch((err) => console.error(err));
