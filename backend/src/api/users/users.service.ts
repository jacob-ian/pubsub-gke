import { ModelService } from "../../db/ModelService";
import { NewUserPublisherFactory } from "../../events/NewUserPublisherFactory";
import { ApiError } from "../ApiError";
import { User, UserDocument } from "./users.model";

export class UserService extends ModelService<UserDocument> {
  private newUserPublisherFactory: NewUserPublisherFactory =
    new NewUserPublisherFactory();

  constructor() {
    super(User);
  }

  public async create(user: UserDocument): Promise<UserDocument> {
    const newUser = await super.create(user);
    await this.publishNewUser(newUser);
    return newUser;
  }

  private async publishNewUser(user: UserDocument): Promise<void> {
    try {
      const publisher = await this.newUserPublisherFactory.create();
      return await publisher.publishNewUser(user);
    } catch (error) {
      throw new ApiError("internal", "Couldn't publish new user.", error);
    }
  }
}
