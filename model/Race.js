import mongoose from "mongoose";

const raceSchema = new mongoose.Schema(
  {
    Pos: {
      type: String,
    },
    No: {
      type: Number,
    },
    GrandPrix: {
      type: String,
      required: true,
    },
    Date: {
      type: String,
    },
    Pts: {
      type: Number,
    },
    Driver: {
      type: String,
      required: true,
    },
    Car: {
      type: String,
    },
    Laps: {
      type: String,
    },
    Time: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Race", raceSchema);
