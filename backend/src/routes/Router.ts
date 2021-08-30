import express from "express";
import { userRoutes } from "./users/user.route";

export class Router {
  private routes: express.Router;

  constructor() {
    this.routes = this.createRouter();
  }

  private createRouter(): express.Router {
    const router = express.Router();
    router.use(userRoutes);

    return router;
  }

  public getRoutes(): express.Router {
    return this.routes;
  }
}
