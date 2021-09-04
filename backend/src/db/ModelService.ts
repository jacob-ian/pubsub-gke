import { Model } from "mongoose";

export class ModelService<T> {
  private model: typeof Model;

  constructor(model: typeof Model) {
    this.model = model;
  }

  public async create(doc: T): Promise<T> {
    try {
      return await this.model.create(doc);
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<T[]> {
    try {
      return await this.model.find({}).exec();
    } catch (error) {
      throw error;
    }
  }

  public async findById(id: string): Promise<T> {
    try {
      return await this.model.findById(id).exec();
    } catch (error) {
      throw error;
    }
  }

  public async updateById(id: string, update: Partial<T>): Promise<T> {
    try {
      return await this.model.findByIdAndUpdate(id, update).exec();
    } catch (error) {
      throw error;
    }
  }

  public async deleteById(id: string): Promise<string> {
    try {
      return await this.model.findByIdAndDelete(id).exec();
    } catch (error) {
      throw error;
    }
  }
}
