import { Response } from "express";
import { ModelService } from "../db/ModelService";
import { ApiError } from "./ApiError";

export abstract class ApiController<T> {
  constructor(protected service: ModelService<T>) {}

  protected handleError(error: unknown, res: Response): Response {
    if (error instanceof ApiError) {
      return res.status(error.getHttpStatus()).json(error.getResponse(true));
    }
    return res.status(500).json({
      error: "unknown",
      message: "An error occurred.",
    });
  }
}
