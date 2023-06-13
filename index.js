import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import raceRoute from "./routes/raceRoute.js";
const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connected to server");
    })
    .catch(error => {
      throw error;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use("/api/races", raceRoute);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "  ";
  return res.status(status).json({
    success: false,
    status,
    message
  });
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.listen(8800, () => {
  connect();
  console.log("connecting to server");
});
