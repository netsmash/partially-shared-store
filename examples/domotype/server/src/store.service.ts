import { Store, createStore, State } from 'domotype-store';

export class StoreService extends Store {
  private static instance?: StoreService;

  private constructor(initialState: State) {
    super(initialState);
  }

  public static getInstance(): StoreService {
    if (!StoreService.instance) {
      StoreService.instance = createStore();
    }
    return StoreService.instance;
  }
}
