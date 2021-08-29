import express, { Application } from "express";

export class Api {
  private app: Application;

  constructor(private port: number) {
    this.app = express();
  }

  private connectMiddleware(): void {}

  public listen(): void {
    this.app.listen(this.port, () => {
      const date = new Date().toLocaleString("au", {
        dateStyle: "full",
        timeStyle: "long",
        timeZone: "Australia/Sydney",
      });
      console.log(`Backend started at: ${date}`);
      console.log(`Listening on port: ${this.port}!`);
    });
  }
}
