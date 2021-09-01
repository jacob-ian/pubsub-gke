import express, { Application } from "express";
import { Server } from "http";
import { Database } from "../db/Database";
import { Router } from "../routes/Router";

export class Api {
  private app: Application;
  private server: Server | null = null;

  constructor(private port: number) {
    this.app = express();
    this.connectDatabase();
    this.setHeaders();
    this.connectMiddleware();
    this.connectRoutes();
  }

  private connectDatabase(): void {
    const db = new Database();
    db.connect();
  }

  private setHeaders(): void {
    this.app.disable("x-powered-by");
  }

  private connectMiddleware(): void {
    this.app.use(express.json());
  }

  private connectRoutes(): void {
    const router = new Router();
    this.app.use(router.getRoutes());
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
    console.log(`✅ Backend started at: ${date}`);
    console.log(`🖥  Listening on port: ${this.port}!`);
  }

  public stop(): void {
    if (this.server) {
      this.server.close();
    }
  }
}
