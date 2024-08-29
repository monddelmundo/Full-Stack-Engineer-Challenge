import { Result, Status } from './../models/result';
import { check } from "express-validator";

export const resultRules = {
  forCreate: [
    check("Status")
      .custom((status) => (status === Status.FAILURE || status === Status.INPROGRESS || status === Status.QUEUED || status === Status.SUCCESS) )
      .withMessage("Status is incorrect"),
    check("RepositoryName")
      .isString()
      .withMessage("Repository name should be a string")
  ],
};
