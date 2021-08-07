import { Action as BaseAction, Request as BaseRequest, DeepReadonly, Planner, Reducer, Validator } from './definitions';

export class PartiallySharedStore<
  State,
  Request extends BaseRequest = BaseRequest,
  Action extends BaseAction = BaseAction
> {
  protected validatorMapping = new Map<Request['type'], Validator<State, any>>();
  protected plannerMapping = new Map<Request['type'], Planner<State, any, Action>>();
  protected reducerMapping = new Map<Action['type'], Reducer<State, any>>();

  public statePromise: Promise<IteratorResult<DeepReadonly<State>>> = new Promise(() => {});
  protected stateResolve: (iteration: IteratorResult<DeepReadonly<State>>) => void = (_) => {};
  protected stateReject: () => void = () => {};

  constructor(protected _state: DeepReadonly<State>) {
    this.setStatePromise();
  }

  protected setStatePromise() {
    this.statePromise = new Promise<IteratorResult<DeepReadonly<State>>>((resolve, reject) => {
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

  protected async stateNext(state: DeepReadonly<State>): Promise<void> {
    return Promise.all([this.statePromise, this.stateResolve({ done: false, value: state })]).then((_) => {});
  }

  protected async stateDone(): Promise<void> {
    return Promise.all([this.statePromise, this.stateResolve({ done: true, value: this._state })]).then((_) => {});
  }

  get state(): AsyncIterable<DeepReadonly<State>> {
    const self = this;
    return {
      [Symbol.asyncIterator]: () => ({
        next: async () => await self.statePromise,
      }),
    };
  }

  get currentState(): DeepReadonly<State> {
    return this._state;
  }

  public async validate(request: Request, state?: DeepReadonly<State>): Promise<void> {
    const validator = this.validatorMapping.get(request.type);
    if (!validator) {
      return;
    }
    state = state || this._state;
    await validator.call(this, state, request);
  }

  public async plan(request: Request, state?: DeepReadonly<State>): Promise<Action[]> {
    const planner = this.plannerMapping.get(request.type);
    if (!planner) {
      return [];
    }
    state = state || this._state;
    return planner.call(this, state, request);
  }

  public async dispatch(action: Action, state?: DeepReadonly<State>): Promise<DeepReadonly<State>> {
    const reducer = this.reducerMapping.get(action.type);
    if (!reducer) {
      return this.currentState;
    }
    state = state || this._state;
    const newState: DeepReadonly<State> = await reducer.call(this, state, action);
    await this.stateNext(newState);
    return this.currentState;
  }

  public createValidator(requestType: Request['type'], validator: Validator<State, any>): void {
    this.validatorMapping.set(requestType, validator);
  }

  public createPlanner(requestType: Request['type'], planner: Planner<State, any, Action>): void {
    this.plannerMapping.set(requestType, planner);
  }

  public createReducer(actionType: Action['type'], reducer: Reducer<State, any>): void {
    this.reducerMapping.set(actionType, reducer);
  }
}

export const createStore = function <
  State,
  Request extends BaseRequest = BaseRequest,
  Action extends BaseAction = BaseAction
>(state: DeepReadonly<State>): PartiallySharedStore<State, Request, Action> {
  return new PartiallySharedStore<State, Request, Action>(state);
};
