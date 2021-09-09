import { Request, Response } from "express";
import { AbstractSubscriber } from "../AbstractSubscriber";

export class NewUserSubscriber extends AbstractSubscriber {
  constructor() {
    super({
      route: "/newUser",
      topicName: "NEW_USER",
      subscriptionName: "NEW_USER_SUB",
    });
  }

  public async controller(req: Request, res: Response): Promise<void> {}
}
