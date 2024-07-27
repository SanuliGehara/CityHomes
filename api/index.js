import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";

dotenv.config();

//connect db
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Mongoose");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//Create api routes
app.use("/api/user", userRouter);
