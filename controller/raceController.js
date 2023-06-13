import { errorHandler } from "../helper/error.js";
import { parameterCheck } from "../helper/util.js";
import Race from "../model/Race.js";
import sanitize from "mongo-sanitize";

//get specific Driver
export const getYear = async (req, res, next) => {
  try {
    if (
      !req.params.year ||
      !parseInt(req.params.year) ||
      parseInt(req.params.year) === NaN
    ) {
      return next(errorHandler(404, "data not found"));
    }
    const condition = { Year: sanitize(parseInt(req.params.year)) };
    const driver = await Race.find(condition);
    driver = driver.sort((a, b) => {
      return b.Pts - a.Pts;
    });
    res.status(200).json(driver);
  } catch (error) {
    next(error);
  }
};

//get specific Driver
export const getRace = async (req, res, next) => {
  try {
    if (
      !req.params.year ||
      !parseInt(req.params.year) ||
      parseInt(req.params.year) === NaN
    ) {
      return next(errorHandler(404, "data not found"));
    }
    const condition = { Year: sanitize(parseInt(req.params.year)) };

    if (req.params.grandPrix && req.params.grandPrix !== "All") {
      condition["GrandPrix"] = sanitize(req.params.grandPrix);
    }

    let race = await Race.find(condition);
    race = race.sort((a, b) => {
      return b.Pts - a.Pts;
    });
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
      parseInt(req.params.year) === NaN
    ) {
      return next(errorHandler(404, "data not found"));
    }
    const condition = { Year: sanitize(parseInt(req.params.year)) };
    if (req.params.driver && req.params.driver !== "All") {
      condition["Driver"] = sanitize(req.params.driver);
    }
    const driver = await Race.find(condition);
    driver = driver.sort((a, b) => {
      return b.Pts - a.Pts;
    });
    res.status(200).json(driver);
  } catch (error) {
    next(error);
  }
};

//get specific Driver
export const getTeam = async (req, res, next) => {
  try {
    if (
      !req.params.year ||
      !parseInt(req.params.year) ||
      parseInt(req.params.year) === NaN
    ) {
      return next(errorHandler(404, "data not found"));
    }
    const condition = { Year: sanitize(parseInt(req.params.year)) };
    if (req.params.car && req.params.car !== "All") {
      condition["Car"] = sanitize(req.params.car);
    }
    const team = await Race.find(condition);
    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  try {
    if (!req.query.q) {
      return;
    }
    const query = sanitize(req.query.q);
    const races = await Race.find({
      $or: [
        { GrandPrix: { $regex: query, $options: "i" } },
        { Driver: { $regex: query, $options: "i" } },
        { Car: { $regex: query, $options: "i" } },
        { Year: parseInt(query) }
      ]
    });
    res.status(200).json(races);
  } catch (error) {
    next(error);
  }
};

export const getYearlyRanking = async (req, res, next) => {
  if (
    !req.params.category ||
    !req.params.year ||
    !parseInt(req.params.year) ||
    parseInt(req.params.year) === NaN
  ) {
    return next(errorHandler(404, "data not found"));
  }
  const category = req.params.category;

  const responseField = {};
  switch (category) {
    case "Team": {
      responseField["Car"] = 1;
      break;
    }
    case "Driver": {
      responseField["Driver"] = 1;
      break;
    }
    default:
      break;
  }

  const yearLyRanking = await Race.find({
    Year: parseInt(req.params.year)
  }).projection(responseField);

  let queryCondition = {};
};

export const getFilter = async (req, res, next) => {
  try {
    if (
      !req.params.year ||
      !parseInt(req.params.year) ||
      parseInt(req.params.year) === NaN
    ) {
      return next(errorHandler(404, "data not found"));
    }
    const condition = { Year: sanitize(parseInt(req.params.year)) };
    if (req.params.car && req.params.car !== "All") {
      condition["Car"] = sanitize(req.params.car);
    }
    const team = await Race.find(condition);
    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};
