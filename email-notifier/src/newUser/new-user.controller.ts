import { Request, Response } from "express";
import { Message } from "@google-cloud/pubsub";

export async function emailNewUser(req: Request, res: Response): Promise<void> {
  res.sendStatus(102);
  const { data } = req.body as Message;
  const user = JSON.parse(data.toString());
  console.log(user);
}
