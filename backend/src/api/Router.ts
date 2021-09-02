import express from "express";
import { users } from "./users/users.route";

export class Router {
  private routes: express.Router;

  constructor() {
    this.routes = this.buildRouter();
  }

  private buildRouter(): express.Router {
    const router = express.Router();
    router.use("/", this.baseRoute());
    router.use("/users", users);
    return router;
  }

  private baseRoute(): express.Router {
    const router = express.Router();
    router.get("/", (req, res) => {
      return res.sendStatus(200);
    });
    return router;
  }

  public getRoutes(): express.Router {
    return this.routes;
  }
}
