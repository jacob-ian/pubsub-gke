export interface Email {
  to: string;
  message: string;
  subject: string;
}

export class EmailService {
  public async send(email: Email): Promise<void> {
    console.log(`Sending email to ${email.to}.`);
  }
}
