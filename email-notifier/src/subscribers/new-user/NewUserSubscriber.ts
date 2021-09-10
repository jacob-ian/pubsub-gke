import { Request, Response } from "express";
import { AbstractSubscriber } from "../AbstractSubscriber";
import { Message as PubsubMessage } from "@google-cloud/pubsub";

interface Message extends PubsubMessage {
  messageId: string;
}
export class NewUserSubscriber extends AbstractSubscriber {
  constructor() {
    super({
      route: "/newUser",
      topicName: "NEW_USER",
      subscriptionName: "NEW_USER_EMAIL",
    });
  }

  public async handleRequest(req: Request, res: Response): Promise<void> {
    const { message } = req.body;
    if (!this.verifyMessage(message)) {
      res
        .send(400)
        .json({ error: "bad_request", message: "A bad request was made." });
      return;
    }
    res.sendStatus(102);
    this.log(`Message ${message.messageId} acknowledged.`);
    const buffer = Buffer.from(message.data.toString(), "base64");
    const user = JSON.parse(buffer.toString("utf-8"));
  }

  private verifyMessage(message: any): message is Message {
    return !!message.data && !!message.messageId;
  }
}
