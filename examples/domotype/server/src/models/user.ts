import { Document, model, Schema } from 'mongoose';
import { ModelScopes } from './base';

export interface UserDocument extends Document {
  sub: string;
  displayName: string;
  imageUrl?: string;
  serialize: (scope?: ModelScopes) => Partial<UserDocument>;
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

UserSchema.methods.serialize = function (
  scope: ModelScopes = ModelScopes.Public,
) {
  const obj = this.toObject() as Partial<UserDocument>;
  obj.id = obj._id;
  delete obj._id;

  if (scope === ModelScopes.Public) {
    delete obj.sub;
  }

  delete obj.__v;

  return obj;
};

export const UserModel = model<UserDocument>('User', UserSchema);
