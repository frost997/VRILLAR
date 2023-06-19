import { errorHandler } from "../helper/error.js";
import Race from "../model/Race.js";
import sanitize from "mongo-sanitize";
import { getTopSkip } from "../helper/util.js";

//get specific Driver
export const getDriver = async (req, res, next) => {
  try {
    const { params, query } = req;
    const { skip, limit } = getTopSkip(query);
    const condition = {};
    if (
      query.year &&
      parseInt(query.year) &&
      !Number.isNaN(parseInt(query.year))
    ) {
      condition["Year"] = sanitize(parseInt(query.year));
    }
    const sortCond: object = {
      _id: -1
    };
    switch (params.category) {
      case "Driver": {
        condition["Driver"] = sanitize(params.id);
        sortCond["Driver"] = 1;
        break;
      }
      case "Team": {
        condition["Car"] = sanitize(params.id);
        sortCond["Car"] = 1;
        break;
      }
      default: {
        return next(errorHandler(404, "data not found"));
      }
    }

    const categoryResponse = await Race.find(condition)
      .sort({ Pts: -1, ...sortCond })
      .limit(limit)
      .skip(skip);

    res.status(200).json(categoryResponse);
  } catch (error) {
    next(error);
  }
};
