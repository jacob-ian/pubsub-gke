import mongoose from "mongoose";

export class Database {
  private static instance: Database;

  public static async getInstance(): Promise<Database> {
    if (!Database.instance) {
      Database.instance = new Database();
      await Database.instance.connect();
    }
    return Database.instance;
  }

  private url: string;
  private user: string;
  private password: string;

  private constructor() {
    this.url = process.env.MONGODB_URL || "mongodb://db:27017";
    this.user = process.env.MONGODB_USER || "root";
    this.password = process.env.MONGODB_PASSWORD || "admin";
  }

  public async connect(): Promise<void> {
    await mongoose.connect(this.url, { user: this.user, pass: this.password });
  }

  public getConnection(): mongoose.Connection {
    return mongoose.connection;
  }
}
