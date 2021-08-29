import express, { Application } from "express";

export class Api {
  private app: Application;

  constructor(private port: number) {
    this.app = express();
    this.setHeaders();
    this.connectMiddleware();
    this.connectRoutes();
  }

  private setHeaders(): void {
    this.app.disable("x-powered-by");
  }

  private connectMiddleware(): void {
    this.app.use(express.json());
  }

  private connectRoutes(): void {}

  public listen(): void {
    this.app.listen(this.port, () => {
      this.logStarted();
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
}
