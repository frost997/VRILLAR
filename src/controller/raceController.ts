import { errorHandler } from "../helper/error.js";
import Race from "../model/Race.js";
import sanitize from "mongo-sanitize";
import { getTopSkip } from "../helper/util.js";

//get specific Race
export const getRace = async (req, res, next) => {
  try {
    const { params, query } = req;
    if (!params.grandPrix) {
      return next(errorHandler(404, "data not found"));
    }
    const condition = {};
    if (
      query.year &&
      parseInt(query.year) &&
      !Number.isNaN(parseInt(query.year))
    ) {
      condition["Year"] = sanitize(parseInt(query.year));
    }
    if (params.grandPrix) {
      condition["GrandPrix"] = sanitize(params.grandPrix);
    }

    const { skip, limit } = getTopSkip(query);
    const race = await Race.find(condition)
      .sort({ Pts: -1, _id: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json(race);
  } catch (error) {
    next(error);
  }
};
