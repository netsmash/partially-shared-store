import { Document, model, Schema, Types } from 'mongoose';
import {
  Serialized,
  deserializeState,
  serializeState,
} from 'domotype-store/serializers';
import { State } from 'domotype-store';
import { UserModel, UserDocument } from './user';
import {
  SerializedUnknownDevice,
  SerializedUnknownUser,
} from 'domotype-store/serializers/models';
import { SerializedTypes } from 'domotype-store/serializers/types';
import { DeepReadonly } from 'partially-shared-store';

export interface HomeDocument extends Document {
  name: string;
  serializedDevices: SerializedUnknownDevice[];
  users: Types.ObjectId[];

  serialize: () => Promise<Serialized<State>>;
  deserialize: () => Promise<State>;

  fromState: (state: DeepReadonly<State>) => HomeDocument;
  hasUser: (user: Types.ObjectId) => boolean;
}

const HomeSchema = new Schema<HomeDocument>({
  name: {
    type: String,
  },
  serializedDevices: {
    type: Schema.Types.Mixed,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

HomeSchema.methods.serialize = async function (): Promise<Serialized<State>> {
  const userDocs: UserDocument[] = await UserModel.find({
    _id: { $in: this.users },
  }).exec();
  const users: SerializedUnknownUser[] = userDocs.map((doc) => doc.serialize());
  return [
    SerializedTypes.State,
    this._id.toString(),
    this.name,
    this.serializedDevices || [],
    users,
  ];
};

HomeSchema.methods.deserialize = async function (): Promise<State> {
  return deserializeState(await this.serialize());
};

HomeSchema.methods.fromState = function (
  state: DeepReadonly<State>,
): HomeDocument {
  const [_, _id, name, serializedDevices, _2] = serializeState(state);
  this._id = _id;
  this.name = name;
  this.serializedDevices = serializedDevices;
  this.users = Object.keys(state.users).map((userId) =>
    Types.ObjectId.createFromHexString(userId),
  );
  return this;
};

HomeSchema.methods.hasUser = function (userId: Types.ObjectId): boolean {
  return this.users.findIndex((homeUserId) => homeUserId.equals(userId)) >= 0;
};

export const HomeModel = model<HomeDocument>('Home', HomeSchema);
