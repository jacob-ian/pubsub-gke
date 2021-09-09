import { Request, Response } from "express";
import { AbstractSubscriber } from "./AbstractSubscriber";

export class NullSubscriber extends AbstractSubscriber {
  constructor() {
    super({
      topicName: "",
      subscriptionName: "",
      endpoint: "",
    });
  }

  public async init(): Promise<void> {
    return;
  }

  public async controller(req: Request, res: Response): Promise<void> {
    return;
  }
}
