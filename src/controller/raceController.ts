import { errorHandler } from "../helper/error.js";
import Race from "../model/Race.js";
import sanitize from "mongo-sanitize";
import { getTopSkip } from "../helper/util.js";
//get specific Year
export const getYear = async (req, res, next) => {
  try {
    if (
      !req.params.year ||
      !parseInt(req.params.year) ||
      Number.isNaN(parseInt(req.params.year))
    ) {
      return next(errorHandler(404, "data not found"));
    }
    const condition = { Year: sanitize(parseInt(req.params.year)) };

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

//get specific Race
export const getRace = async (req, res, next) => {
  try {
    if (
      !req.params.year ||
      !parseInt(req.params.year) ||
      Number.isNaN(parseInt(req.params.year))
    ) {
      return next(errorHandler(404, "data not found"));
    }
    const condition = { Year: sanitize(parseInt(req.params.year)) };
    if (req.params.grandPrix && req.params.grandPrix !== "All") {
      condition["GrandPrix"] = sanitize(req.params.grandPrix);
    }

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

//get specific Driver
export const getDriver = async (req, res, next) => {
  try {
    if (
      !req.params.year ||
      !parseInt(req.params.year) ||
      Number.isNaN(parseInt(req.params.year))
    ) {
      return next(errorHandler(404, "data not found"));
    }

    
    const {skip,limit} = getTopSkip(req.query)
    const condition = { Year: sanitize(parseInt(req.params.year)) };
    if (req.params.driver && req.params.driver !== "All") {
      condition["Driver"] = sanitize(req.params.driver);
    }

    const driver = await Race.find(condition)
      .sort({ Pts: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(driver);
  } catch (error) {
    next(error);
  }
};

//get specific Team
export const getTeam = async (req, res, next) => {
  try {
    if (
      !req.params.year ||
      !parseInt(req.params.year) ||
      Number.isNaN(parseInt(req.params.year))
    ) {
      return next(errorHandler(404, "data not found"));
    }


    const {skip,limit} = getTopSkip(req.query)

    const condition = { Year: sanitize(parseInt(req.params.year)) };
    if (req.params.car && req.params.car !== "All") {
      condition["Car"] = sanitize(req.params.car);
    }

    const team = await Race.find(condition)
      .sort({ Pts: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  try {
    if (!req.query.search) {
      return;
    }
    
    const query = sanitize(req.query.search);
    const {skip,limit} = getTopSkip(req.query)
    const races = await Race.find({
      $or: [
        { GrandPrix: { $regex: query, $options: "i" } },
        { Driver: { $regex: query, $options: "i" } },
        { Car: { $regex: query, $options: "i" } },
        { Date: { $regex: query, $options: "i" } },
        { Year:  !parseInt(query) || Number.isNaN(parseInt(query)) ? ""  : parseInt(query)  }
      ]
    }).limit(limit).skip(skip);
    res.status(200).json(races);
  } catch (error) {
    next(error);
  }
};

export const getYearlyRanking = async (req, res, next) => {
  try {
    if (
      !req.params.year ||
      !parseInt(req.params.year) ||
      Number.isNaN(parseInt(req.params.year))
    ) {
      return next(errorHandler(404, "data not found"));
    }
    const condition = { Year: sanitize(parseInt(req.params.year)) };
    let groupByCond;

    switch (req.params.category) {
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