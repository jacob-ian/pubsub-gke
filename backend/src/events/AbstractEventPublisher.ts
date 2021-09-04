import { Topic } from "@google-cloud/pubsub";
import { EventPublisherException } from "./EventPublisherException";

/**
 * A publisher to Google Cloud Pub/Sub
 */
export abstract class AbstractEventPublisher {
  private topic: Topic;

  constructor(topic: Topic) {
    this.topic = topic;
  }

  public async publish(data: Buffer): Promise<void> {
    try {
      const messageId = await this.topic.publish(data);
      this.logSuccess(messageId);
    } catch (error) {
      this.logError(error);
      throw new EventPublisherException(error);
    }
  }

  private logSuccess(messageId: string): void {
    this.log(`Message ${messageId} published.`);
  }

  private log(message: string): void {
    console.log(`${this.getTopicName()}: ${message}`);
  }

  private getTopicName(): string {
    return this.topic.name.toUpperCase();
  }

  private logError(error: any): void {
    console.error(
      `${this.getTopicName()}: ERROR: ${JSON.stringify(error, null, 2)}`
    );
  }
}
