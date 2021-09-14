import { model, Schema } from "mongoose";

export interface UserDocument {
  _id: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
}

const schema = new Schema<UserDocument>({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  email: { type: String, required: true, validate: /.+\@.+\..+/ },
});

export const User = model<UserDocument>("User", schema);
