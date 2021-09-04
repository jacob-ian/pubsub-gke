import { Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import { UserDocument } from "./users.model";
import { UserService } from "./users.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.findAll();
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
      const user = await this.userService.findById(id);
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
      const user = await this.userService.updateById(id, update);
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
      const newUser = await this.userService.create(body);
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
      const deletedUser = await this.userService.deleteById(id);
      return res.status(200).json({
        data: {
          user: deletedUser,
        },
      });
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  private handleError(error: unknown, res: Response): Response {
    if (error instanceof ApiError) {
      return res.status(error.getHttpStatus()).json(error.getResponse(true));
    }
    return res.status(500).json({
      error: "unknown",
      message: "An error occurred.",
    });
  }
}
