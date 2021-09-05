import { Router } from "express";
import { emailNewUser } from "./newUser/new-user.controller";

export class PushRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.connectEndpoints();
  }

  private connectEndpoints(): void {
    this.router.post("/newUser", (req, res) => emailNewUser(req, res));
  }

  public getRoutes(): Router {
    return this.router;
  }
}
