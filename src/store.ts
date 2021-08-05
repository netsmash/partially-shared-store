import { Action, Request, DeepReadonly, Planner, Reducer, Validator } from './definitions';
import { deepFreeze } from './utils';

export class PartiallySharedStore<CustomState, RequestTypes = any, ActionTypes = any> {
  protected validatorMapping = new Map<RequestTypes, Validator<CustomState, any>>();
  protected plannerMapping = new Map<RequestTypes, Planner<CustomState, any>>();
  protected reducerMapping = new Map<ActionTypes, Reducer<CustomState, any>>();
  // protected static serializerMapping = new Map<string, Validator>();
  // protected static deserializerMapping = new Map<string, Validator>();

  public statePromise: Promise<IteratorResult<DeepReadonly<CustomState>>> = new Promise(() => {});
  protected stateResolve: (iteration: IteratorResult<DeepReadonly<CustomState>>) => void = (_) => {};
  protected stateReject: () => void = () => {};

  constructor(protected _state: DeepReadonly<CustomState>) {
    this.setStatePromise();
  }

  protected setStatePromise() {
    this.statePromise = new Promise<IteratorResult<DeepReadonly<CustomState>>>((resolve, reject) => {
      this.stateResolve = resolve;
      this.stateReject = reject;
    }).then((result) => {
      if (result.done) {
        return result;
      }
      this._state = result.value;
      this.setStatePromise();
      return result;
    });
  }

  protected async stateNext(state: DeepReadonly<CustomState>): Promise<void> {
    return Promise.all([this.statePromise, this.stateResolve({ done: false, value: state })]).then((_) => {});
  }

  protected async stateDone(): Promise<void> {
    return Promise.all([this.statePromise, this.stateResolve({ done: true, value: this._state })]).then((_) => {});
  }

  get state(): AsyncIterable<DeepReadonly<CustomState>> {
    const self = this;
    return {
      [Symbol.asyncIterator]: () => ({
        next: async () => await self.statePromise,
      }),
    };
  }

  get currentState(): DeepReadonly<CustomState> {
    return this._state;
  }

  public clone(state: DeepReadonly<CustomState>): void {
    this.stateNext(state);
  }

  public async validate<CustomRequest extends Request<RequestTypes>>(
    request: CustomRequest,
    state?: DeepReadonly<CustomState>,
  ): Promise<void> {
    const validator = this.validatorMapping.get(request.type);
    if (!validator) {
      return;
    }
    state = state || this._state;
    await validator.call(this, state, request);
  }

  public async plan<CustomAction extends Action<ActionTypes>, CustomRequest extends Request<RequestTypes>>(
    request: CustomRequest,
    state?: DeepReadonly<CustomState>,
  ): Promise<CustomAction[]> {
    const planner = this.plannerMapping.get(request.type);
    if (!planner) {
      return [];
    }
    state = state || this._state;
    return planner.call(this, state, request);
  }

  public async dispatch<CustomAction extends Action<ActionTypes>>(
    action: CustomAction,
    state?: DeepReadonly<CustomState>,
  ): Promise<DeepReadonly<CustomState>> {
    const reducer = this.reducerMapping.get(action.type);
    if (!reducer) {
      return this.currentState;
    }
    state = state || this._state;
    const newState: DeepReadonly<CustomState> = await reducer.call(this, state, action);
    this.stateNext(newState);
    return this.currentState;
  }

  public createValidator<CustomRequest extends Request<RequestTypes>>(
    requestType: RequestTypes,
    validator: Validator<CustomState, CustomRequest>,
  ): void {
    this.validatorMapping.set(requestType, validator);
  }

  public createPlanner<CustomRequest extends Request<RequestTypes>>(
    requestType: RequestTypes | RequestTypes[],
    planner: Planner<CustomState, CustomRequest>,
  ): void {
    if (!Array.isArray(requestType)) {
      this.plannerMapping.set(requestType, planner);
    } else {
      requestType.map((requestType) => this.plannerMapping.set(requestType, planner));
    }
  }

  public createReducer<CustomAction extends Action<ActionTypes>>(
    actionType: ActionTypes | ActionTypes[],
    reducer: Reducer<CustomState, CustomAction>,
  ): void {
    if (!Array.isArray(actionType)) {
      this.reducerMapping.set(actionType, reducer);
    } else {
      actionType.map((actionType) => this.reducerMapping.set(actionType, reducer));
    }
  }
}

export const createStore = function <CustomState, RequestTypes = any, ActionTypes = any>(
  state: DeepReadonly<CustomState>,
): PartiallySharedStore<CustomState, RequestTypes, ActionTypes> {
  return new PartiallySharedStore<CustomState, RequestTypes, ActionTypes>(deepFreeze(state));
};
