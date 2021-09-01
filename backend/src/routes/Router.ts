import express from "express";
import { users } from "./users/user.route";

export class Router {
  private routes: express.Router;

  constructor() {
    this.routes = this.createRouter();
  }

  private createRouter(): express.Router {
    const router = express.Router();
    router.get("/", (req, res) => {
      return res.sendStatus(200);
    });
    router.use("/users", users);

    return router;
  }

  public getRoutes(): express.Router {
    return this.routes;
  }
}
