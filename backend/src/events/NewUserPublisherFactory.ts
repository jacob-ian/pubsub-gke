import { AbstractEventPublisherFactory } from "./AbstractEventPublisherFactory";
import { NewUserPublisher } from "./NewUserPublisher";

export class NewUserPublisherFactory extends AbstractEventPublisherFactory {
  constructor() {
    super("NEW_USER");
  }

  public async create(): Promise<NewUserPublisher> {
    const topic = await this.getTopic();
    return new NewUserPublisher(topic);
  }
}
