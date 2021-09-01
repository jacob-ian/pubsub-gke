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

  private host: string;
  private user: string;
  private password: string;
  private url: string;

  constructor() {
    this.host = process.env.MONGODB_HOST || "db:27017";
    this.user = process.env.MONGODB_USER || "root";
    this.password = process.env.MONGODB_PASSWORD || "admin";
    this.url = this.createMongoUrl();
  }

  private createMongoUrl(): string {
    return `mongodb://${this.user}:${this.password}@${this.host}/`;
  }

  public async connect(): Promise<void> {
    mongoose
      .connect(this.url, {})
      .then(() => console.log(`🗃 Connected to MongoDB`))
      .catch((err) => console.error(err));
    return;
  }

  public getConnection(): mongoose.Connection {
    return mongoose.connection;
  }
}
