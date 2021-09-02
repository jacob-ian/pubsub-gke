import { EventPublisher } from "./EventPublisher";

const NEW_USER_TOPIC = "NEW_USER";

export class NewUserPublisher extends EventPublisher {
  constructor() {
    super(NEW_USER_TOPIC);
  }
}
