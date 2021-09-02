import { UserDocument } from "../api/users/users.model";
import { EventPublisher } from "./EventPublisher";

const NEW_USER_TOPIC = "NEW_USER";

export class NewUserPublisher extends EventPublisher {
  constructor() {
    super(NEW_USER_TOPIC);
  }

  public async publishNewUser(user: UserDocument): Promise<void> {
    const jsonString = JSON.stringify(user);
    const buffer = Buffer.from(jsonString);
    return await this.publish(buffer);
  }
}
