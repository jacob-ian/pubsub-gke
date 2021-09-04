import { Request, Response } from "express";
import { ApiController } from "../ApiController";
import { UserDocument } from "./users.model";
import { UserService } from "./users.service";

export class UserController extends ApiController<UserDocument> {
  constructor() {
    const userService = new UserService();
    super(userService);
  }

  public async getUsers(req: Request, res: Response): Promise<Response> {
    return await this.getAll(res);
  }

  public async getUserById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    return await this.getById(id, res);
  }

  public async updateUserById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const update = req.body;
    return await this.updateById(id, update, res);
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const body = req.body as UserDocument;
    return await this.create(body, res);
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    return await this.deleteById(id, res);
  }
}
