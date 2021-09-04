import { Model, Error } from "mongoose";
import { ApiError } from "../api/ApiError";

export class ModelService<T> {
  private model: typeof Model;

  constructor(model: typeof Model) {
    this.model = model;
  }

  private createApiError(error: unknown): ApiError {
    if (error instanceof Error.ValidationError) {
      return new ApiError(
        "bad_request",
        `Couldn't complete request due to bad input(s).`,
        error
      );
    }
    if (error instanceof Error.DisconnectedError) {
      return new ApiError("internal", "Connection to database timed out.");
    }
    if (error instanceof Error.DocumentNotFoundError) {
      return new ApiError(
        "not_found",
        "Could not find the requested document.",
        error
      );
    }
    return new ApiError(
      "unknown",
      "An error occurred while processing this request.",
      error
    );
  }

  public async create(doc: T): Promise<T> {
    try {
      return await this.model.create(doc);
    } catch (error) {
      throw this.createApiError(error);
    }
  }

  public async findAll(): Promise<T[]> {
    try {
      return await this.model.find({}).exec();
    } catch (error) {
      throw this.createApiError(error);
    }
  }

  public async findById(id: string): Promise<T> {
    try {
      return await this.model.findById(id).exec();
    } catch (error) {
      throw this.createApiError(error);
    }
  }

  public async updateById(id: string, update: Partial<T>): Promise<T> {
    try {
      return await this.model
        .findByIdAndUpdate(id, update, { new: true })
        .exec();
    } catch (error) {
      throw this.createApiError(error);
    }
  }

  public async deleteById(id: string): Promise<string> {
    try {
      return await this.model.findByIdAndDelete(id).exec();
    } catch (error) {
      throw this.createApiError(error);
    }
  }
}
