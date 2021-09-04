import { Model } from "mongoose";
import { ModelService } from "../../db/ModelService";
import { NewUserPublisherFactory } from "../../events/NewUserPublisherFactory";
import { ApiError } from "../../utils/ApiError";
import { UserDocument } from "./users.model";

export class UserService extends ModelService<UserDocument> {
  private newUserPublisherFactory: NewUserPublisherFactory =
    new NewUserPublisherFactory();

  constructor(model: Model<UserDocument, {}, {}>) {
    super(model);
  }

  public async createUser(user: UserDocument): Promise<UserDocument> {
    const newUser = await this.create(user);
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
