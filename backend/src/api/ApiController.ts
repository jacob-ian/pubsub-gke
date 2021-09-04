import { Response } from "express";
import { ModelService } from "../db/ModelService";
import { ApiError } from "./ApiError";
export abstract class ApiController<T> {
  private modelName: string;

  constructor(protected service: ModelService<T>) {
    this.modelName = this.service.getModelName();
  }

  protected handleError(error: unknown, res: Response): Response {
    if (error instanceof ApiError) {
      return res.status(error.getHttpStatus()).json(error.getResponse(true));
    }
    return res.status(500).json({
      error: "unknown",
      message: "An error occurred.",
    });
  }

  protected async create(doc: T, res: Response): Promise<Response> {
    try {
      const createdDoc = await this.service.create(doc);
      return res.status(201).json({
        data: {
          created: createdDoc,
        },
      });
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  protected async updateById(
    id: string,
    update: Partial<T>,
    res: Response
  ): Promise<Response> {
    try {
      const updatedDoc = await this.service.updateById(id, update);
      return res.status(201).json({
        data: {
          updated: updatedDoc,
        },
      });
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  protected async getAll(res: Response): Promise<Response> {
    try {
      const docs = await this.service.findAll();
      return res.status(200).json({
        data: {
          [`${this.modelName}s`]: docs,
        },
      });
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  protected async getById(id: string, res: Response): Promise<Response> {
    try {
      const doc = await this.service.findById(id);
      return res.status(200).json({
        data: {
          [this.modelName]: doc,
        },
      });
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  protected async deleteById(id: string, res: Response): Promise<Response> {
    try {
      const deleted = await this.service.deleteById(id);
      return res.status(200).json({
        data: {
          deleted,
        },
      });
    } catch (error) {
      return this.handleError(error, res);
    }
  }
}
