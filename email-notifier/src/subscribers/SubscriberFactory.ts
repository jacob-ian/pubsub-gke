import { AbstractSubscriber } from "./AbstractSubscriber";
import { NewUserSubscriber } from "./new-user/NewUserSubscriber";
import { NullSubscriber } from "./NullSubscriber";

enum Subscribers {
  NEW_USER = "new_user",
}

export class SubscriberFactory {
  constructor() {}

  public async getSubscriber(type: Subscribers): Promise<AbstractSubscriber> {
    let subscriber: AbstractSubscriber;
    if (type === Subscribers.NEW_USER) {
      subscriber = new NewUserSubscriber();
    } else {
      subscriber = new NullSubscriber();
    }
    await subscriber.init();
    return subscriber;
  }
}
