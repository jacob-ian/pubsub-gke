import { PubSub, Topic } from "@google-cloud/pubsub";
import { EventPublisherException } from "./EventPublisherException";

/**
 * A publisher to Google Cloud Pub/Sub
 */
export class EventPublisher {
  private client: PubSub;
  private topic: Topic;

  constructor(topic: string) {
    this.client = new PubSub();
    this.topic = this.client.topic(topic);
    this.checkTopicExists();
  }

  private async checkTopicExists(): Promise<void> {
    const exists = await this.topic.exists();
    if (!exists) {
      this.createTopic();
    }
  }

  private createTopic(): void {
    const topicName = this.getTopicName();
    this.client.createTopic(topicName);
  }

  public async publish(data: Buffer): Promise<void> {
    try {
      const messageId = await this.topic.publish(data);
      this.logSuccess(messageId);
    } catch (error) {
      this.logError(error);
      throw new EventPublisherException(error.message);
    }
  }

  private logSuccess(messageId: string): void {
    console.log(`${this.getTopicName()}: Message ${messageId} published.`);
  }

  private getTopicName(): string {
    const topicName = this.topic.name.toUpperCase();
    return topicName;
  }

  private logError(error: any): void {
    console.error(
      `${this.getTopicName()}: Couldn't publish message: ${error.message}`
    );
  }
}
