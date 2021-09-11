import {
  PubSub,
  Subscription,
  Topic,
  Message as PubsubMessage,
} from "@google-cloud/pubsub";
import { Request, Response } from "express";
import { Email, EmailService } from "../services/EmailService";
export interface Message extends PubsubMessage {
  messageId: string;
}
interface SubscriberDetails {
  route: string;
  topicName: string;
  subscriptionName: string;
}

export abstract class AbstractSubscriber {
  protected emailService: EmailService;
  protected pubsub: PubSub;
  protected topic: Topic | null = null;
  protected subscription: Subscription | null = null;
  protected endpoint: string;
  protected route: string;
  protected topicName: string;
  protected subscriptionName: string;

  constructor(details: SubscriberDetails) {
    const { route, topicName, subscriptionName } = details;
    this.topicName = topicName;
    this.subscriptionName = subscriptionName;
    this.route = route;
    this.endpoint = this.createPushEndpoint(route);
    this.pubsub = new PubSub();
    this.emailService = new EmailService();
  }

  private createPushEndpoint(route: string): string {
    return `http://email-notifier:3002${route}`;
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
        { pushEndpoint: this.getPushEndpoint() }
      );
      this.log(`Created subscription ${this.subscription?.name}.`);
      return created[0];
    } catch (error) {
      this.logError(error);
      throw error;
    }
  }

  protected logError(error: any): void {
    console.error(
      `${this.topic?.name.toUpperCase()}: ${JSON.stringify(error)}.`
    );
  }

  protected log(message: any): void {
    console.log(`${this.topic?.name.toUpperCase()}: ${message}`);
  }

  public getPushEndpoint(): string {
    return this.endpoint;
  }

  public getRoute(): string {
    return this.route;
  }

  public abstract handleRequest(req: Request, res: Response): Promise<void>;

  protected verifyMessage(message: any): message is Message {
    return !!message.data && !!message.messageId;
  }

  protected getJsonDataFromMessage<T>(message: Message): T {
    try {
      const buffer = Buffer.from(message.data.toString(), "base64");
      return JSON.parse(buffer.toString("utf-8"));
    } catch (error) {
      this.logError(
        `Could not get data from message: ${JSON.stringify(error, null, 2)}`
      );
      throw error;
    }
  }

  protected async sendEmail(email: Email): Promise<void> {
    try {
      return await this.emailService.send(email);
    } catch (error) {
      this.logError(
        `Could not send email. Error: ${JSON.stringify(error, null, 2)}`
      );
    }
  }
}
