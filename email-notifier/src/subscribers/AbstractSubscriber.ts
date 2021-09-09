import { PubSub, Subscription, Topic } from "@google-cloud/pubsub";
import { Request, Response } from "express";

interface SubscriberDetails {
  endpoint: string;
  topicName: string;
  subscriptionName: string;
}

export abstract class AbstractSubscriber {
  protected pubsub: PubSub;
  protected topic: Topic | null = null;
  protected subscription: Subscription | null = null;
  protected endpoint: string;
  protected topicName: string;
  protected subscriptionName: string;

  constructor(details: SubscriberDetails) {
    const { endpoint, topicName, subscriptionName } = details;
    this.topicName = topicName;
    this.endpoint = endpoint;
    this.subscriptionName = subscriptionName;
    this.pubsub = new PubSub();
  }

  public async init(): Promise<void> {
    this.topic = await this.getTopic();
    this.subscription = await this.getSubscription();
  }

  private async getTopic(): Promise<Topic> {
    try {
      const response = await this.pubsub
        .topic(this.topicName)
        .get({ autoCreate: true });
      return response[0];
    } catch (error) {
      this.logError(error);
      throw error;
    }
  }

  private async getSubscription(): Promise<Subscription> {
    if (await this.subscriptionExists()) {
      return this.pubsub.subscription(this.subscriptionName);
    }
    return this.createSubscription();
  }

  private async subscriptionExists(): Promise<boolean> {
    try {
      const existsResponse = await this.pubsub
        .subscription(this.subscriptionName)
        .exists();
      return existsResponse[0];
    } catch (error) {
      this.logError(error);
      throw error;
    }
  }

  private async createSubscription(): Promise<Subscription> {
    try {
      const created = await this.pubsub.createSubscription(
        this.topic || this.topicName,
        this.subscriptionName,
        { pushEndpoint: this.endpoint }
      );
      return created[0];
    } catch (error) {
      this.logError(error);
      throw error;
    }
  }

  protected logError(error: any): void {
    console.error(`${this.topic?.name}: ${JSON.stringify(error)}.`);
  }

  public getEndpoint(): string {
    return this.endpoint;
  }

  public abstract controller(req: Request, res: Response): Promise<void>;
}