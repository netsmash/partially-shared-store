type Primitive = string | number | boolean | bigint | symbol | undefined | null;
type Builtin = Primitive | Function | Date | Error | RegExp;
export type DeepReadonly<T> = T extends Builtin
  ? T
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepReadonly<U>>
  : T extends Promise<infer U>
  ? Promise<DeepReadonly<U>>
  : T extends {}
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : Readonly<T>;

export type Request<Identificable = any, RequestTypes = any> = Identificable & {
  type: RequestTypes;
};

export type Action<Identificable = any, ActionTypes = any> = Identificable & {
  type: ActionTypes;
};

type MaybePromise<T> = Promise<T> | T;

export type Validator<CustomState, CustomRequest extends Request> = (
  state: DeepReadonly<CustomState>,
  request: CustomRequest,
) => MaybePromise<void>;

export type Planner<CustomState, CustomRequest extends Request> = (
  state: DeepReadonly<CustomState>,
  request: CustomRequest,
) => MaybePromise<Action[]>;

export type Reducer<CustomState, CustomAction extends Action> = (
  state: DeepReadonly<CustomState>,
  action: CustomAction,
) => MaybePromise<DeepReadonly<CustomState>>;
