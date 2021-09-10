import express, { Application } from "express";
import { Server } from "http";
import { AbstractSubscriber } from "./subscribers/AbstractSubscriber";
import { SubscriberFactory } from "./subscribers/SubscriberFactory";

export class EmailNotifier {
  private app: Application;
  private server: Server | null = null;
  private port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.connectMiddleware();
    this.connectSubscribers();
  }

  private connectMiddleware(): void {
    this.app.use(express.json());
  }

  private async connectSubscribers(): Promise<void> {
    const factory = new SubscriberFactory();
    const subscribers = await factory.getSubscribers();
    subscribers.forEach((subscriber) => this.connectPushEndpoint(subscriber));
  }

  private connectPushEndpoint(subscriber: AbstractSubscriber): void {
    const route = subscriber.getRoute();
    this.app.post(route, (req, res) => subscriber.handleRequest(req, res));
  }

  public listen(callback?: () => void): void {
    this.server = this.app.listen(this.port, () => {
      this.logStarted();
      if (callback) {
        callback();
      }
    });
  }

  private logStarted(): void {
    const date = new Date().toLocaleString("au", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "Australia/Sydney",
    });
    console.log(`📤 Email Notifier started at: ${date}`);
    console.log(`✅  Listening on port: ${this.port}!`);
  }

  public stop(): void {
    if (this.server) {
      this.server.close();
    }
  }
}
