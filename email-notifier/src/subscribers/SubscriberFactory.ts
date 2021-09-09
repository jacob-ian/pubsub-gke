import { AbstractSubscriber } from "./AbstractSubscriber";
import { NewUserSubscriber } from "./new-user/NewUserSubscriber";

const subscriberMap = {
  newUser: NewUserSubscriber,
};

type Subscriber = keyof typeof subscriberMap;
export class SubscriberFactory {
  constructor() {}

  public async getSubscriber(type: Subscriber): Promise<AbstractSubscriber> {
    const subscriber = new subscriberMap[type]();
    await subscriber.init();
    return subscriber;
  }

  public async getSubscribers(): Promise<AbstractSubscriber[]> {
    return Promise.all(
      Object.keys(subscriberMap).map((subscriber) =>
        this.getSubscriber(subscriber as Subscriber)
      )
    );
  }
}
