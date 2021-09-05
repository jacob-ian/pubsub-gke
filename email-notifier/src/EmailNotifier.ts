import express, { Application } from "express";
import { Server } from "http";
import { PushRouter } from "./PushRouter";

export class EmailNotifier {
  private app: Application;
  private server: Server | null = null;
  private port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.connectMiddleware();
    this.connectPushRoutes();
    this.connectSubscribers();
  }

  private connectMiddleware(): void {
    this.app.use(express.json());
  }

  private connectPushRoutes(): void {
    const router = new PushRouter();
    this.app.use(router.getRoutes());
  }

  private connectSubscribers()

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
