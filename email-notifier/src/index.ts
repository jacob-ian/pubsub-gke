import { EmailNotifier } from "./EmailNotifier";

const port = process.env.PORT ? parseInt(process.env.PORT) : 3002;
const emailNotifier = new EmailNotifier(port);

emailNotifier.listen();
