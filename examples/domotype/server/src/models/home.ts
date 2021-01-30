import { Document, model, Schema, Types } from 'mongoose';
import { ModelScopes } from './base';
import { StateDocument, StateModel } from './state';

export interface HomeDocument extends Document {
  stateId: Types.ObjectId;
  name: string;
  serialize: (scope?: ModelScopes) => any;
  getState: () => Promise<StateDocument>;
  setState: (state: StateDocument) => Promise<void>;
}

const HomeSchema = new Schema<HomeDocument>({
  stateId: {
    type: Schema.Types.ObjectId,
    ref: 'State',
  },
  name: {
    type: String,
  },
});

HomeSchema.methods.serialize = function (
  scope: ModelScopes = ModelScopes.Public,
) {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

HomeSchema.methods.getState = async function (): Promise<StateDocument> {
  const state = await StateModel.findById(this.stateId);
  if (!state) {
    throw Error(
      `Home with id '${this._id}' has associated invalid stateId '${this.stateId}'`,
    );
  }
  return state;
};

HomeSchema.methods.setState = async function (state: StateDocument) {
  this.stateId = state._id;
  await this.save();
};
export const HomeModel = model<HomeDocument>('Home', HomeSchema);
