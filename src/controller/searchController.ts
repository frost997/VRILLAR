import { errorHandler } from "../helper/error.js";
import Race from "../model/Race.js";
import sanitize from "mongo-sanitize";
import { getTopSkip } from "../helper/util.js";
//get specific Year
export const search = async (req, res, next) => {
  try {
    const { params, query } = req;
    if (!params.search) {
      return;
    }
    const search = sanitize(params.search);
    const { skip, limit } = getTopSkip(query);
    let condition: object[] = [
      { GrandPrix: { $regex: search, $options: "i" } },
      { Driver: { $regex: search, $options: "i" } },
      { Car: { $regex: search, $options: "i" } },
      { Date: { $regex: search, $options: "i" } }
    ];
    if (parseInt(search) || !Number.isNaN(parseInt(search))) {
      condition.push({ Year: parseInt(search) });
    }
    const races = await Race.find({
      $or: condition
    })
      .limit(limit)
      .skip(skip);
    res.status(200).json(races);
  } catch (error) {
    next(error);
  }
};
