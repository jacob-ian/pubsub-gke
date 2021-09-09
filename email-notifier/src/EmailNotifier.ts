import express, { Application } from "express";
import { Server } from "http";

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

  private async connectSubscribers(): Promise<void> {}

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
