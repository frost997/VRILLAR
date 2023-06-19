import { errorHandler } from "../helper/error.js";
import Race from "../model/Race.js";
import sanitize from "mongo-sanitize";
import { getTopSkip } from "../helper/util.js";
//get specific Year
export const getYear = async (req, res, next) => {
  try {
    const {params} = req
    if (
      !params.year ||
      !parseInt(params.year) ||
      Number.isNaN(parseInt(params.year))
    ) {
      return next(errorHandler(404, "data not found"));
    }
    const condition = { Year: sanitize(parseInt(params.year)) };

    const {skip,limit} = getTopSkip(req.query)

    const race = await Race.find(condition)
      .sort({ Pts: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(race);
  } catch (error) {
    next(error);
  }
};

export const getYearlyRanking = async (req, res, next) => {
  try {
    const {params} = req
    if (
      !params.year ||
      !parseInt(params.year) ||
      Number.isNaN(parseInt(params.year))
    ) {
      return next(errorHandler(404, "data not found"));
    }
    const condition = { Year: sanitize(parseInt(params.year)) };
    let groupByCond;

    switch (params.category) {
      case "race": {
        groupByCond = [
          { $sort: { Grandprix: 1, Pts: -1 } },
          {
            $group: {
              _id: { GrandPrix: `$GrandPrix` },
              race: { $first: "$$ROOT" }
            }
          },
          { $replaceWith: "$race" },
          {
            $project: {
              _id: 0,
              GrandPrix: 1,
              Driver: 1,
              Car: 1,
              Laps: 1,
              Time: 1,
              Pts: 1
            }
          }
        ];
        break;
      }
      case "driver": {
        groupByCond = [
          {
            $group: {
              _id:{ Driver: `$Driver` },
              Driver: { $first: "$Driver" },
              Car: { $first: "$Car" },
              Count: { $sum: "$Pts" }
            }
          },
          {
            $project: {
              _id: 0,
              Driver: 1,
              Car: 1,
              Count: 1
            }
          },{ $sort: { Count: -1} }
        ];
        break;
      }
      case "team": {
        groupByCond = [
          {
            $group: {
              _id: `$Car`,
              Car: { $first: "$Car" },
              Laps: { $first: "$Laps" },
              Count: { $sum: "$Pts" }
            }
          },
          {
            $project: {
              _id: 0,
              Car: 1,
              Laps: 1,
              Count: 1
            }
          },{ $sort: { Count: -1} }
        ];
        break;
      }
      default:
        break;
    }

    if (groupByCond?.length) {
      const {skip,limit} = getTopSkip(req.query)
      let races = await Race.aggregate([
        { $match: { ...condition } },
        ...groupByCond,
        {$skip:skip},{$limit:limit}
      ]);
      res.status(200).json(races);
    } else {
      return next(errorHandler(404, "data not found"));
    }
  } catch (error) {
    next(error);
  }
};
