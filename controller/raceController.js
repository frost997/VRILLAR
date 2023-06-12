import { errorHandler } from "../helper/error.js";
import Race from "../model/Race.js";
import sanitize from "mongo-sanitize";
export const getRace = async (req, res, next) => {
  try {
    if (!req.body.year) {
    }

    const condition = {
      Year: sanitize(req.body.year),
      GrandPrix: sanitize(req.body.grandPrix),
      Driver: sanitize(req.body.driver),
    };
    const race = await Race.find(condition);
    res.status(200).json(race);
  } catch (error) {
    next(error);
  }
};
