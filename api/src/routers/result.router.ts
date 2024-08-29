import { Router } from "express";
import { matchedData, validationResult } from "express-validator";
import { ResultService } from "../services/result.service";
import { Result, ResultViewModel, Status } from "./../models/result";
import { resultRules } from "./../rules/result.rules";

export const resultRouter = Router();
const resultService = new ResultService();

resultRouter.post("/create", resultRules["forCreate"], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(422).json(errors.array());

  const payload = matchedData(req) as Result;
  switch (payload.Status) {
    case Status.INPROGRESS:
      payload.ScanningAt = new Date().toISOString();
      break;
    case Status.QUEUED:
      payload.QueuedAt = new Date().toISOString();
      break;
    case Status.SUCCESS:
      payload.FinishedAt = new Date().toISOString();
      break;
    default:
      break;
  }
  const result = resultService.create({
    ...payload,
    Findings: req.body.findings,
  });

  return result.then((u) => res.json(u));
});

resultRouter.get("/:Id", async (req, res) => {
  const id = req.params.Id
  if(!id) return res.status(422).json({ message: 'Invalid parameter(s)'});
  try {
    const result = await resultService.getById(+id);
    return res.json({ data: result });
  } catch (error) {
    console.error(error);
    return res
      .status(403)
      .json({ message: "Error occurred while fetching item" });
  }
});

resultRouter.get("/", async (req, res) => {
  try {
    const result = await resultService.getAll();
    return res.json({ data: result });
  } catch (error) {
    console.error(error);
    return res
      .status(403)
      .json({ message: "Error occurred while fetching items" });
  }
});
