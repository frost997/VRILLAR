import { errorHandler } from "../helper/error.js";
import Race from "../model/Race.js";
import sanitize from "mongo-sanitize";
import { getTopSkip } from "../helper/util.js";

export const getAll = async (req, res, next) => {
  try {
    const { query } = req;
    const condition = {};
    if (
      query.year &&
      parseInt(query.year) &&
      !Number.isNaN(parseInt(query.year))
    ) {
      condition["Year"] = sanitize(parseInt(query.year));
    }
    const { skip, limit } = getTopSkip(query);
    const race = await Race.find(condition)
      .sort({ Year: -1, Pts: -1, _id: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json(race);
  } catch (error) {
    next(error);
  }
};
