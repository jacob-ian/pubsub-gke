import { Request, Response } from "express";
import { AbstractSubscriber } from "../AbstractSubscriber";
import { Email } from "../../services/EmailService";
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
    const newUser = this.getJsonDataFromMessage<any>(message);
    const email = this.createNewUserEmail(newUser);
    return this.sendEmail(email);
  }

  private createNewUserEmail(user: any): Email {
    const { email: to, name } = user;
    const message = `Hi ${name.first},
    
      Thanks for joining this test!

      From, 

      The team at pubsub-gke.
    `;
    return {
      to,
      message,
      subject: `Welcome, ${name.first}!`,
    };
  }
}
