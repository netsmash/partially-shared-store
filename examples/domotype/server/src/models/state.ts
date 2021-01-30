import { DeepReadonly } from 'partially-shared-store';
import { State } from 'domotype-store';
import { Document, model, Schema, Types } from 'mongoose';
import { ModelScopes } from './base';

export interface StateDocument extends Document {
  value: DeepReadonly<State>;
  homeId: Types.ObjectId;
  serialize: (scope?: ModelScopes) => Partial<StateDocument>;
}

export const StateSchema = new Schema<StateDocument>({
  value: {
    type: Schema.Types.Mixed,
  },
  homeId: {
    type: Schema.Types.ObjectId,
    ref: 'Home',
  },
});

StateSchema.methods.serialize = function (
  scope: ModelScopes = ModelScopes.Public,
) {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

export const StateModel = model<StateDocument>('State', StateSchema);
