import { PubSub, Topic } from "@google-cloud/pubsub";
import { AbstractEventPublisher } from "./AbstractEventPublisher";

export abstract class AbstractEventPublisherFactory {
  private topicName: string;
  constructor(topic: string) {
    this.topicName = topic;
  }

  public abstract create(): Promise<AbstractEventPublisher>;

  protected async getTopic(): Promise<Topic> {
    const client = new PubSub();
    const topic = await client.topic(this.topicName).get({ autoCreate: true });
    return topic[0];
  }
}
