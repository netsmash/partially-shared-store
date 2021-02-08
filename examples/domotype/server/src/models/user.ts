import { Document, model, Schema } from 'mongoose';
import { SerializedUnknownUser } from 'domotype-store/serializers/models';

export interface UserDocument extends Document {
  sub: string;
  displayName: string;
  imageUrl?: string;
  serialize: () => SerializedUnknownUser;
}

const UserSchema = new Schema<UserDocument>(
  {
    sub: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  { collection: 'users' },
);

UserSchema.methods.serialize = function (): SerializedUnknownUser {
  const serializedUser: SerializedUnknownUser = [
    this._id.toString(),
    this.displayName,
  ];

  if (this.imageUrl) {
    serializedUser.push(this.imageUrl);
  }

  return serializedUser;
};

export const UserModel = model<UserDocument>('User', UserSchema);
