import { Topic } from "@google-cloud/pubsub";
import { UserDocument } from "../api/users/users.model";
import { AbstractEventPublisher } from "./AbstractEventPublisher";

export class NewUserPublisher extends AbstractEventPublisher {
  constructor(topic: Topic) {
    super(topic);
  }

  public async publishNewUser(user: UserDocument): Promise<void> {
    const jsonString = JSON.stringify(user);
    const buffer = Buffer.from(jsonString);
    return await this.publish(buffer);
  }
}
