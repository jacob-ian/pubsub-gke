import { NextFunction, Request, Response } from "express";
import { UserDocument } from "./users.model";

export class UserController {
  constructor() {}

  public async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.find({}).exec();
      return res.status(200).json({
        data: users,
      });
    } catch (error) {
      return res.status(400).json({
        error_message: "bad_request",
        error,
      });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      const user = await User.findById(id).exec();
      return res.status(200).json({
        data: {
          user,
        },
      });
    } catch (error) {
      return res.status(400).json({
        error_message: "bad_request",
        error: error,
      });
    }
  }

  public async updateUserById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const update = req.body;
    try {
      const user = await service.updateUser(id, update);
      return res.status(201).json({
        data: {
          user,
        },
      });
    } catch (err) {
      return res.status(400).json({
        error_message: "bad_request",
        error: err,
      });
    }
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const body = req.body as UserDocument;
    try {
      const newUser = await service.createUser(body);
      return res.status(201).json({
        data: {
          newUser,
        },
      });
    } catch (err) {
      if (err instanceof ApiError) {
        return res.status(err.getHttpStatus()).json(err.getResponse(true));
      }
      return res.status(500);
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {}
}
