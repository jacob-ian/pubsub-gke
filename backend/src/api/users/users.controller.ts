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
    try {
      const users = await this.service.findAll();
      return res.status(200).json({
        data: users,
      });
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  public async getUserById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      const user = await this.service.findById(id);
      return res.status(200).json({
        data: {
          user,
        },
      });
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  public async updateUserById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const update = req.body;
    try {
      const user = await this.service.updateById(id, update);
      return res.status(201).json({
        data: {
          user,
        },
      });
    } catch (err) {
      return this.handleError(err, res);
    }
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const body = req.body as UserDocument;
    try {
      const newUser = await this.service.create(body);
      return res.status(201).json({
        data: {
          user: newUser,
        },
      });
    } catch (err) {
      return this.handleError(err, res);
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      const deletedUser = await this.service.deleteById(id);
      return res.status(200).json({
        data: {
          user: deletedUser,
        },
      });
    } catch (error) {
      return this.handleError(error, res);
    }
  }
}
